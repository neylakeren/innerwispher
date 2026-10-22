import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client, { getStorageUrl, FALLBACK_INVOICE_PLACEHOLDER } from '../api/client';
import { Button, Input } from '../components/ui';
import { 
    CheckCircle, 
    XCircle, 
    ExternalLink, 
    Loader2,
    Users,
    UserCheck,
    Clock,
    CalendarCheck,
    ArrowUpRight,
    User,
    AlertCircle,
    Check,
    DollarSign,
    Upload,
    FileText,
    Send,
    X,
    Eye
} from 'lucide-react';

export default function AdminDashboard() {
    const [allBookings, setAllBookings] = useState([]);
    const [pendingPayments, setPendingPayments] = useState([]);
    const [verifiedBookings, setVerifiedBookings] = useState([]);
    const [stats, setStats] = useState({
        total_psychologists: 0,
        total_patients: 0,
        pending_payments: 0,
        pending_payouts: 0,
        total_bookings: 0
    });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    // Modal: Admin Payout to Counselor
    const [payoutBooking, setPayoutBooking] = useState(null);
    const [payoutAmount, setPayoutAmount] = useState('');
    const [payoutFile, setPayoutFile] = useState(null);
    const [payoutFilePreview, setPayoutFilePreview] = useState(null);
    const [payoutLoading, setPayoutLoading] = useState(false);
    const [payoutError, setPayoutError] = useState('');

    // Modal: Universal Image / Invoice Viewer
    const [viewingImage, setViewingImage] = useState(null); // { title, url, amount, subtitle }
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 4000);
    };

    const loadData = async () => {
        try {
            setLoading(true);
            await Promise.all([fetchStats(), fetchBookingsData()]);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await client.get('/admin/stats');
            setStats(res.data);
        } catch (err) {
            console.error('Failed to load stats:', err);
        }
    };

    const fetchBookingsData = async () => {
        try {
            const res = await client.get('/bookings'); 
            const bookings = res.data || [];
            setAllBookings(bookings);
            
            // 1. Pending patient invoice verifications
            const pending = bookings.filter(b => b.payment && b.payment.status === 'pending');
            setPendingPayments(pending);

            // 2. Verified bookings where patient has paid -> Ready for counselor payout tracking
            const verified = bookings.filter(b => b.payment && b.payment.status === 'verified');
            setVerifiedBookings(verified);
        } catch (err) {
            console.error('Failed to load bookings:', err);
        }
    };

    // 1. Approve or Reject Patient Payment
    const handleVerify = async (paymentId, status) => {
        try {
            setActionLoading(paymentId);
            const res = await client.post(`/admin/payments/${paymentId}/verify`, { status });
            showToast(status === 'verified' 
                ? 'Pembayaran user berhasil disetujui! Sesi chat konsultasi telah dibuka.' 
                : 'Pembayaran user ditolak.');
            await Promise.all([fetchStats(), fetchBookingsData()]);
        } catch (err) {
            alert('Gagal memproses verifikasi: ' + (err.response?.data?.message || err.message));
        } finally {
            setActionLoading(null);
        }
    };

    // 2. Open Modal for Admin Paying Counselor
    const openPayoutModal = (booking) => {
        setPayoutBooking(booking);
        // Pre-fill payout amount with counselor price or payment amount
        const defaultRate = booking.payment?.counselor_payout_amount || 
                            booking.psychologist?.psychologist_profile?.price_per_session || 
                            booking.payment?.amount || 
                            150000;
        setPayoutAmount(String(defaultRate));
        setPayoutFile(null);
        setPayoutFilePreview(null);
        setPayoutError('');
    };

    const handlePayoutFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPayoutFile(file);
            setPayoutFilePreview(URL.createObjectURL(file));
        }
    };

    // Submit Payout to Counselor
    const handleSendPayout = async (e) => {
        e.preventDefault();
        if (!payoutFile) {
            setPayoutError('Silakan pilih foto invoice atau bukti transfer honor ke konselor.');
            return;
        }

        setPayoutLoading(true);
        setPayoutError('');

        const formData = new FormData();
        formData.append('proof_image', payoutFile);
        formData.append('amount', payoutAmount);

        try {
            await client.post(`/admin/payments/${payoutBooking.payment.id}/payout`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            showToast(`Invoice honor berhasil dikirim ke konselor ${payoutBooking.psychologist?.name}. Menunggu konfirmasi diterima.`);
            setPayoutBooking(null);
            setPayoutFile(null);
            setPayoutFilePreview(null);
            await Promise.all([fetchStats(), fetchBookingsData()]);
        } catch (err) {
            setPayoutError(err.response?.data?.message || 'Gagal mengirim bukti pembayaran honor.');
        } finally {
            setPayoutLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-72">
                <Loader2 className="animate-spin h-9 w-9 text-primary mb-3" />
                <p className="text-sm text-[#5d5577]">Memuat data administrasi & keuangan...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-[#2b2542]">Panel Administrasi & Keuangan</h1>
                <p className="text-[#5d5577] text-sm mt-1">Verifikasi invoice pembayaran user, buka sesi chat, dan kelola pembayaran honor ke konselor.</p>
            </header>

            {/* Toast Notification */}
            {toastMessage && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Pending Verifikasi User */}
                <div className="bg-white p-6 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-amber-700">Invoice User</span>
                            <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <Clock className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-amber-900 mt-3">
                            {pendingPayments.length}
                        </p>
                        <p className="text-xs text-amber-700 mt-1 font-medium">Menunggu Verifikasi & Buka Chat</p>
                    </div>
                    <a 
                        href="#antrean-verifikasi-user" 
                        className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
                    >
                        <span>Tinjau Invoice</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                </div>

                {/* 2. Pending Payouts Konselor */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5d5577]">Honor Konselor</span>
                            <div className="h-9 w-9 rounded-xl bg-[#efeafb] text-[#4b3b86] flex items-center justify-center">
                                <DollarSign className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-[#2b2542] mt-3">
                            {stats.pending_payouts ?? verifiedBookings.filter(b => b.payment?.counselor_payout_status === 'unpaid').length}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">Perlu Ditransfer ke Konselor</p>
                    </div>
                    <a 
                        href="#antrean-honor-konselor" 
                        className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#8f78d8] hover:text-[#4b3b86] transition-colors"
                    >
                        <span>Kelola Honor</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                </div>

                {/* 3. Total Psikolog */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5d5577]">Tenaga Ahli</span>
                            <div className="h-9 w-9 rounded-xl bg-[#efeafb] text-[#4b3b86] flex items-center justify-center">
                                <UserCheck className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-[#2b2542] mt-3">
                            {stats.total_psychologists}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">Psikolog & Konselor Terdaftar</p>
                    </div>
                    <Link 
                        to="/admin/psychologists" 
                        className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#8f78d8] hover:text-[#4b3b86] transition-colors"
                    >
                        <span>Kelola Psikolog</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {/* 4. Total User */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5d5577]">Pengguna</span>
                            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-[#2b2542] mt-3">
                            {stats.total_patients}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">User Terdaftar</p>
                    </div>
                    <Link 
                        to="/admin/patients" 
                        className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#8f78d8] hover:text-[#4b3b86] transition-colors"
                    >
                        <span>Lihat User</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>

            {/* SECTION 1: Antrean Verifikasi Pembayaran Invoice User */}
            <section id="antrean-verifikasi-user" className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-lg text-[#2b2542]">1. Antrean Verifikasi Invoice User</h2>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                {pendingPayments.length} Menunggu
                            </span>
                        </div>
                        <p className="text-xs text-[#5d5577] mt-1">
                            Setujui invoice user agar sesi konsultasi & chat langsung terbuka untuk user dan konselor.
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-[#efeafb]/40">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">User</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Konselor Dituju</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Jumlah Tagihan</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Foto Invoice User</th>
                                <th className="px-6 py-3.5 text-right text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Aksi Verifikasi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {pendingPayments.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-9 w-9 rounded-full bg-[#efeafb] text-[#4b3b86] flex items-center justify-center mr-3 font-bold text-xs">
                                                {booking.patient?.name?.charAt(0) || 'P'}
                                            </div>
                                            <div className="text-sm">
                                                <p className="font-semibold text-[#2b2542]">{booking.patient?.name || 'User'}</p>
                                                <p className="text-[#5d5577] text-xs">{booking.patient?.phone || booking.patient?.email || '-'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-xs font-semibold text-[#2b2542]">
                                            {booking.psychologist?.name || 'Konselor'}
                                        </div>
                                        <div className="text-[11px] text-[#5d5577]">
                                            Jadwal Sesi: {booking.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-[#4b3b86]">
                                            Rp {Number(booking.payment?.amount || 0).toLocaleString('id-ID')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {booking.payment?.proof_image_path ? (
                                            <button
                                                type="button"
                                                onClick={() => setViewingImage({
                                                    title: `Invoice Pembayaran - ${booking.patient?.name}`,
                                                    url: getStorageUrl(booking.payment.proof_image_path),
                                                    amount: booking.payment.amount,
                                                    subtitle: `Konselor: ${booking.psychologist?.name} | Jadwal: ${booking.date}`
                                                })}
                                                className="inline-flex items-center text-[#8f78d8] hover:text-[#4b3b86] text-xs font-semibold bg-[#efeafb] px-3 py-1.5 rounded-xl border border-[#d9cff5] transition-colors"
                                            >
                                                <Eye className="h-3.5 w-3.5 mr-1.5" />
                                                Lihat Invoice User
                                            </button>
                                        ) : (
                                            <span className="text-xs text-[#8a82a2] italic">Tidak ada file</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            disabled={actionLoading === booking.payment?.id}
                                            onClick={() => handleVerify(booking.payment.id, 'rejected')}
                                            className="text-xs"
                                        >
                                            <XCircle className="h-3.5 w-3.5 mr-1" /> Tolak
                                        </Button>
                                        <Button 
                                            variant="primary" 
                                            size="sm"
                                            disabled={actionLoading === booking.payment?.id}
                                            onClick={() => handleVerify(booking.payment.id, 'verified')}
                                            className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                                        >
                                            {actionLoading === booking.payment?.id ? (
                                                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                                            ) : (
                                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                            )}
                                            Setujui & Buka Chat
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {pendingPayments.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-[#5d5577]">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                                                <CheckCircle className="h-5 w-5" />
                                            </div>
                                            <p className="font-semibold text-[#2b2542] text-sm">Tidak ada antrean invoice user</p>
                                            <p className="text-xs text-[#5d5577] mt-0.5">Semua invoice user telah disetujui dan chat terbuka.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* SECTION 2: Pembayaran Honor ke Konselor (Admin -> Counselor) */}
            <section id="antrean-honor-konselor" className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-lg text-[#2b2542]">2. Pembayaran Honor ke Konselor</h2>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5]">
                                {verifiedBookings.length} Sesi Terverifikasi
                            </span>
                        </div>
                        <p className="text-xs text-[#5d5577] mt-1">
                            Transfer honor ke konselor untuk sesi yang telah disetujui, kirim bukti invoice, lalu konselor akan mengonfirmasi penerimaan ("Diterima").
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-[#efeafb]/40">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Konselor</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">User & Tanggal</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Nominal Honor</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Status Honor</th>
                                <th className="px-6 py-3.5 text-right text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Aksi Transfer Honor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {verifiedBookings.map((booking) => {
                                const payoutStatus = booking.payment?.counselor_payout_status || 'unpaid';
                                const payoutAmountDisplay = booking.payment?.counselor_payout_amount || 
                                                            booking.psychologist?.psychologist_profile?.price_per_session || 
                                                            booking.payment?.amount || 
                                                            150000;

                                return (
                                    <tr key={booking.id} className="hover:bg-slate-50/60 transition-colors">
                                        {/* Counselor */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 rounded-full bg-[#efeafb] text-[#4b3b86] flex items-center justify-center mr-3 font-bold text-xs">
                                                    {booking.psychologist?.name?.charAt(0) || 'K'}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-[#2b2542]">{booking.psychologist?.name || 'Konselor'}</p>
                                                    <p className="text-xs text-[#8f78d8]">{booking.psychologist?.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Patient & Date */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-xs font-semibold text-[#2b2542]">{booking.patient?.name}</p>
                                            <p className="text-[11px] text-[#5d5577]">Sesi: {booking.date}</p>
                                        </td>

                                        {/* Honor Amount */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm font-bold text-[#4b3b86]">
                                                Rp {Number(payoutAmountDisplay).toLocaleString('id-ID')}
                                            </p>
                                        </td>

                                        {/* Payout Status */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {payoutStatus === 'received' ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                                                    Diterima Konselor
                                                </span>
                                            ) : payoutStatus === 'pending' ? (
                                                <div className="space-y-1">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                                        <Clock className="w-3 h-3 mr-1 text-blue-600 animate-pulse" />
                                                        Menunggu Konfirmasi
                                                    </span>
                                                    {booking.payment?.counselor_payout_proof && (
                                                        <div>
                                                            <button
                                                                type="button"
                                                                onClick={() => setViewingImage({
                                                                    title: `Bukti Transfer Honor ke ${booking.psychologist?.name}`,
                                                                    url: getStorageUrl(booking.payment.counselor_payout_proof),
                                                                    amount: payoutAmountDisplay,
                                                                    subtitle: `Sesi User: ${booking.patient?.name} | Jadwal: ${booking.date}`
                                                                })}
                                                                className="text-xs font-semibold text-[#8f78d8] hover:text-[#4b3b86] underline flex items-center"
                                                            >
                                                                <FileText className="w-3 h-3 mr-1" />
                                                                Lihat Bukti Terkirim
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                                                    Belum Ditransfer
                                                </span>
                                            )}
                                        </td>

                                        {/* Action: Pay Counselor */}
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            {payoutStatus === 'unpaid' ? (
                                                <Button
                                                    size="sm"
                                                    variant="primary"
                                                    onClick={() => openPayoutModal(booking)}
                                                    className="text-xs inline-flex items-center gap-1.5"
                                                >
                                                    <Send className="w-3.5 h-3.5" />
                                                    Bayar & Kirim Invoice
                                                </Button>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => openPayoutModal(booking)}
                                                    className="text-xs inline-flex items-center gap-1.5"
                                                >
                                                    <Upload className="w-3.5 h-3.5" />
                                                    Kirim Ulang
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                            {verifiedBookings.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-[#5d5577]">
                                        <p className="font-semibold text-[#2b2542] text-sm">Belum ada sesi konsultasi yang telah disetujui pembayarannya.</p>
                                        <p className="text-xs text-[#5d5577] mt-0.5">Sesi akan otomatis muncul di sini setelah invoice user diverifikasi.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* MODAL: Admin Transfer Honor & Kirim Invoice ke Konselor */}
            {payoutBooking && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b2542]/50 backdrop-blur-sm overflow-y-auto"
                >
                    <div 
                        className="relative w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-[#d9cff5] my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-lg font-bold text-[#2b2542]">Kirim Invoice Honor ke Konselor</h3>
                                <p className="text-xs text-[#5d5577]">Unggah bukti transfer pembayaran honor sesi konsultasi.</p>
                            </div>
                            <button 
                                onClick={() => setPayoutBooking(null)} 
                                disabled={payoutLoading}
                                className="p-1.5 text-[#5d5577] hover:text-[#2b2542] hover:bg-[#efeafb] rounded-xl transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {payoutError && (
                            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{payoutError}</span>
                            </div>
                        )}

                        <div className="mb-4 p-4 rounded-xl bg-[#efeafb]/60 border border-[#d9cff5] text-xs space-y-1.5">
                            <p className="font-bold text-[#4b3b86]">Detail Konselor Penerima:</p>
                            <p className="text-[#2b2542] font-semibold">{payoutBooking.psychologist?.name}</p>
                            <p className="text-[#5d5577]">No. Kontak: {payoutBooking.psychologist?.phone || payoutBooking.psychologist?.email}</p>
                            <p className="text-[#5d5577]">Sesi User: {payoutBooking.patient?.name} ({payoutBooking.date})</p>
                        </div>

                        <form onSubmit={handleSendPayout} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                    Nominal Honor Konselor (Rp) *
                                </label>
                                <Input
                                    type="number"
                                    min="0"
                                    required
                                    value={payoutAmount}
                                    onChange={(e) => setPayoutAmount(e.target.value)}
                                    placeholder="150000"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                    Foto Bukti Transfer / Invoice Honor *
                                </label>
                                <input
                                    type="file"
                                    required
                                    accept="image/*"
                                    onChange={handlePayoutFileChange}
                                    className="w-full text-xs text-[#5d5577] file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border file:border-[#d9cff5] file:text-xs file:font-semibold file:bg-[#efeafb] file:text-[#4b3b86] hover:file:bg-[#e4dbf7] cursor-pointer"
                                />
                            </div>

                            {/* Preview */}
                            {payoutFilePreview && (
                                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                                    <p className="text-[11px] font-semibold text-[#5d5577] mb-1">Pratinjau Bukti Transfer:</p>
                                    <img 
                                        src={payoutFilePreview} 
                                        alt="Preview Transfer" 
                                        className="max-h-40 rounded-lg mx-auto object-contain"
                                    />
                                </div>
                            )}

                            <div className="flex space-x-3 pt-3">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="flex-1 text-xs"
                                    disabled={payoutLoading}
                                    onClick={() => setPayoutBooking(null)}
                                >
                                    Batal
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="flex-1 text-xs flex items-center justify-center gap-1.5"
                                    disabled={payoutLoading}
                                >
                                    {payoutLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Mengirim...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Kirim ke Konselor
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL: View Full Image / Invoice */}
            {viewingImage && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b2542]/60 backdrop-blur-sm"
                    onClick={() => setViewingImage(null)}
                >
                    <div 
                        className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-[#d9cff5] text-left"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-base font-bold text-[#2b2542]">{viewingImage.title}</h3>
                                {viewingImage.subtitle && (
                                    <p className="text-xs text-[#5d5577] mt-0.5">{viewingImage.subtitle}</p>
                                )}
                                {viewingImage.amount && (
                                    <p className="text-xs font-semibold text-[#8f78d8] mt-0.5">
                                        Nominal: Rp {Number(viewingImage.amount).toLocaleString('id-ID')}
                                    </p>
                                )}
                            </div>
                            <button 
                                onClick={() => setViewingImage(null)} 
                                className="p-1.5 text-[#5d5577] hover:text-[#2b2542] hover:bg-[#efeafb] rounded-xl transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-[#d9cff5] max-h-96 flex items-center justify-center bg-slate-50 p-2">
                            <img 
                                src={viewingImage.url} 
                                alt={viewingImage.title} 
                                onError={(e) => {
                                    e.currentTarget.src = FALLBACK_INVOICE_PLACEHOLDER;
                                }}
                                className="max-h-80 max-w-full object-contain rounded-lg"
                            />
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => setViewingImage(null)}
                                className="text-xs"
                            >
                                Tutup
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
