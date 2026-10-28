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
    Eye,
    Award,
    Sparkles,
    Building2,
    ShieldCheck,
    CreditCard
} from 'lucide-react';

export default function AdminDashboard() {
    const [allBookings, setAllBookings] = useState([]);
    const [pendingPayments, setPendingPayments] = useState([]);
    const [verifiedBookings, setVerifiedBookings] = useState([]);
    const [proPayments, setProPayments] = useState([]);
    const [proFilter, setProFilter] = useState('all'); // 'all', 'pending', 'verified', 'rejected'
    const [stats, setStats] = useState({
        total_psychologists: 0,
        total_patients: 0,
        total_pro_users: 0,
        pending_payments: 0,
        pending_pro_payments: 0,
        pending_payouts: 0,
        total_bookings: 0
    });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [actionProLoading, setActionProLoading] = useState(null);

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
            await Promise.all([fetchStats(), fetchProPayments(), fetchBookingsData()]);
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

    const fetchProPayments = async () => {
        try {
            const res = await client.get('/admin/pro-payments');
            setProPayments(res.data || []);
        } catch (err) {
            console.error('Failed to load pro payments:', err);
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

    // Verify PRO Subscription Payment Proof
    const handleVerifyPro = async (paymentId, status) => {
        try {
            setActionProLoading(paymentId);
            const res = await client.post(`/admin/pro-payments/${paymentId}/verify`, { status });
            showToast(status === 'verified' 
                ? 'Struk transfer PRO berhasil disetujui! Pengguna kini berstatus PRO Lifetime.' 
                : 'Struk transfer PRO ditolak. Pengguna dapat mengunggah ulang bukti transfer.');
            await Promise.all([fetchStats(), fetchProPayments()]);
        } catch (err) {
            alert('Gagal memproses verifikasi PRO: ' + (err.response?.data?.message || err.message));
        } finally {
            setActionProLoading(null);
        }
    };

    // 1. Approve or Reject Patient Payment (Legacy Counselor Bookings)
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

    const pendingProCount = proPayments.filter(p => p.status === 'pending').length;
    const verifiedProCount = proPayments.filter(p => p.status === 'verified').length;
    const rejectedProCount = proPayments.filter(p => p.status === 'rejected').length;

    const filteredProPayments = proPayments.filter(p => {
        if (proFilter === 'all') return true;
        return p.status === proFilter;
    });

    return (
        <div className="space-y-8 font-quicksand pb-12">
            <header>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-semibold mb-2">
                    <ShieldCheck size={14} />
                    Pusat Kontrol Administrasi &amp; Verifikasi
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2542]">Panel Administrasi &amp; Keuangan</h1>
                <p className="text-[#5d5577] text-sm mt-1">Verifikasi struk transfer manual langganan PRO (Rp 35.000) dan pantau seluruh transaksi pengguna.</p>
            </header>

            {/* Toast Notification */}
            {toastMessage && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fadeIn shadow-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Antrean Struk PRO (Rp 35.000) - PRIMARY */}
                <div className="bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/50 rounded-bl-full pointer-events-none" />
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">Struk PRO (Rp 35k)</span>
                            <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                                <Clock className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-amber-950 mt-3">
                            {stats.pending_pro_payments ?? pendingProCount}
                        </p>
                        <p className="text-xs text-amber-700 mt-1 font-semibold">Menunggu Verifikasi &amp; Aktivasi</p>
                    </div>
                    <a 
                        href="#antrean-verifikasi-pro" 
                        className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-900 hover:text-amber-700 transition-colors"
                    >
                        <span>Tinjau Struk Transfer</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                </div>

                {/* 2. Total Pengguna PRO Aktif */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#4b3b86]">Member PRO</span>
                            <div className="h-9 w-9 rounded-xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center">
                                <Award className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-[#2b2542] mt-3">
                            {stats.total_pro_users ?? verifiedProCount}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">Akses All-in-One Lifetime</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#8f78d8]">
                        <span>Akses Penuh Aktif</span>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                </div>

                {/* 3. Total Mahasiswa / Job Seeker */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5d5577]">Pengguna Terdaftar</span>
                            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-[#2b2542] mt-3">
                            {stats.total_patients}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">Mahasiswa &amp; Job Seeker</p>
                    </div>
                    <Link 
                        to="/admin/patients" 
                        className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#8f78d8] hover:text-[#4b3b86] transition-colors"
                    >
                        <span>Kelola Pengguna</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {/* 4. Total Psikolog & Mitra */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5d5577]">Mitra Konselor</span>
                            <div className="h-9 w-9 rounded-xl bg-[#efeafb] text-[#4b3b86] flex items-center justify-center">
                                <UserCheck className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-[#2b2542] mt-3">
                            {stats.total_psychologists}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">Tenaga Ahli Terdaftar</p>
                    </div>
                    <Link 
                        to="/admin/psychologists" 
                        className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#8f78d8] hover:text-[#4b3b86] transition-colors"
                    >
                        <span>Kelola Tenaga Ahli</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>

            {/* SECTION 1: Antrean Verifikasi Struk Transfer PRO (Rp 35.000) - UTAMA */}
            <section id="antrean-verifikasi-pro" className="bg-white rounded-3xl border-2 border-[#8f78d8]/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-[#8f78d8] text-white flex items-center justify-center">
                                <Sparkles size={16} />
                            </div>
                            <h2 className="font-bold text-lg text-[#2b2542]">1. Antrean Verifikasi Struk Transfer PRO (Rp 35.000)</h2>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                {pendingProCount} Menunggu
                            </span>
                        </div>
                        <p className="text-xs text-[#5d5577] mt-1 max-w-2xl">
                            Pengguna mentransfer <strong>Rp 35.000</strong> ke rekening resmi BCA / Mandiri untuk mengaktifkan seluruh fitur Inner Whisper PRO seumur hidup. Setujui untuk membuka hak akses seketika.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#efeafb]/70 border border-[#d9cff5] shrink-0 self-start sm:self-auto">
                        <button
                            type="button"
                            onClick={() => setProFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                proFilter === 'all' 
                                    ? 'bg-[#8f78d8] text-white shadow-sm' 
                                    : 'text-[#4b3b86] hover:bg-white/60'
                            }`}
                        >
                            Semua ({proPayments.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setProFilter('pending')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                proFilter === 'pending' 
                                    ? 'bg-amber-600 text-white shadow-sm' 
                                    : 'text-amber-800 hover:bg-white/60'
                            }`}
                        >
                            Pending ({pendingProCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setProFilter('verified')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                proFilter === 'verified' 
                                    ? 'bg-emerald-600 text-white shadow-sm' 
                                    : 'text-emerald-800 hover:bg-white/60'
                            }`}
                        >
                            Disetujui ({verifiedProCount})
                        </button>
                        <button
                            type="button"
                            onClick={() => setProFilter('rejected')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                proFilter === 'rejected' 
                                    ? 'bg-rose-600 text-white shadow-sm' 
                                    : 'text-rose-800 hover:bg-white/60'
                            }`}
                        >
                            Ditolak ({rejectedProCount})
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-[#efeafb]/40">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Pengguna</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Rekening Tujuan &amp; Pengirim</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Nominal &amp; Waktu</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Foto Struk</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-right text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Aksi Verifikasi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredProPayments.map((p) => {
                                const isPending = p.status === 'pending';
                                const isVerified = p.status === 'verified';
                                const isRejected = p.status === 'rejected';

                                return (
                                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                                        {/* User */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 rounded-full bg-[#efeafb] text-[#4b3b86] flex items-center justify-center mr-3 font-bold text-xs border border-[#d9cff5]">
                                                    {p.user?.name?.charAt(0) || 'U'}
                                                </div>
                                                <div className="text-sm">
                                                    <div className="flex items-center gap-1.5">
                                                        <p className="font-semibold text-[#2b2542]">{p.user?.name || 'User'}</p>
                                                        {p.user?.is_pro && (
                                                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#8f78d8] text-white">PRO</span>
                                                        )}
                                                    </div>
                                                    <p className="text-[#5d5577] text-xs">{p.user?.email || '-'}</p>
                                                    <p className="text-[11px] text-[#8a82a2]">{p.user?.phone || '-'}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Destination & Sender */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="space-y-1">
                                                <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wider ${
                                                    p.bank_destination === 'BCA' 
                                                        ? 'bg-blue-100 text-blue-800' 
                                                        : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                    Bank {p.bank_destination || 'BCA'}
                                                </span>
                                                <p className="text-xs text-[#2b2542] font-medium">
                                                    a/n: <strong className="text-[#4b3b86]">{p.sender_name || '-'}</strong>
                                                </p>
                                            </div>
                                        </td>

                                        {/* Nominal & Date */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-[#4b3b86]">
                                                Rp {Number(p.amount || 35000).toLocaleString('id-ID')}
                                            </div>
                                            <div className="text-[11px] text-[#5d5577] flex items-center gap-1 mt-0.5">
                                                <Clock size={11} />
                                                <span>{p.created_at ? new Date(p.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) : '-'}</span>
                                            </div>
                                        </td>

                                        {/* Struk Foto */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {p.proof_image_path ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setViewingImage({
                                                        title: `Struk Transfer PRO - ${p.user?.name || 'User'}`,
                                                        url: getStorageUrl(p.proof_image_path),
                                                        amount: p.amount,
                                                        subtitle: `Bank Tujuan: ${p.bank_destination} | Pengirim: ${p.sender_name} | Tanggal: ${new Date(p.created_at).toLocaleString('id-ID')}`
                                                    })}
                                                    className="inline-flex items-center text-[#8f78d8] hover:text-[#4b3b86] text-xs font-semibold bg-[#efeafb] hover:bg-[#e4dbf7] px-3 py-1.5 rounded-xl border border-[#d9cff5] transition-colors"
                                                >
                                                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                                                    Lihat Foto Struk
                                                </button>
                                            ) : (
                                                <span className="text-xs text-[#8a82a2] italic">Tidak ada foto</span>
                                            )}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {isVerified && (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#d1e7dd] text-[#198754]">
                                                    <Check size={12} className="mr-1" />
                                                    Disetujui (PRO Aktif)
                                                </span>
                                            )}
                                            {isPending && (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#fff3cd] text-[#664d03] border border-[#ffe69c]">
                                                    <Clock size={12} className="mr-1 animate-pulse" />
                                                    Menunggu Verifikasi
                                                </span>
                                            )}
                                            {isRejected && (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#fce8e9] text-[#9b1c28]">
                                                    <X size={12} className="mr-1" />
                                                    Ditolak
                                                </span>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                                            {isPending ? (
                                                <>
                                                    <Button 
                                                        variant="danger" 
                                                        size="sm" 
                                                        disabled={actionProLoading === p.id}
                                                        onClick={() => handleVerifyPro(p.id, 'rejected')}
                                                        className="text-xs"
                                                    >
                                                        <XCircle className="h-3.5 w-3.5 mr-1" /> Tolak
                                                    </Button>
                                                    <Button 
                                                        variant="primary" 
                                                        size="sm"
                                                        disabled={actionProLoading === p.id}
                                                        onClick={() => handleVerifyPro(p.id, 'verified')}
                                                        className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                                                    >
                                                        {actionProLoading === p.id ? (
                                                            <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                                                        ) : (
                                                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                                        )}
                                                        Setujui &amp; Aktifkan PRO
                                                    </Button>
                                                </>
                                            ) : isVerified ? (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={actionProLoading === p.id}
                                                    onClick={() => handleVerifyPro(p.id, 'rejected')}
                                                    className="text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
                                                >
                                                    Cabut Akses PRO
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    disabled={actionProLoading === p.id}
                                                    onClick={() => handleVerifyPro(p.id, 'verified')}
                                                    className="text-xs text-emerald-600 hover:bg-emerald-50 border-emerald-200"
                                                >
                                                    Setujui Ulang
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}

                            {filteredProPayments.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-[#5d5577]">
                                        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                                            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                                                <CheckCircle className="h-6 w-6" />
                                            </div>
                                            <p className="font-bold text-[#2b2542] text-sm">Tidak ada antrean struk transfer PRO</p>
                                            <p className="text-xs text-[#5d5577] mt-1 leading-relaxed">
                                                {proFilter === 'pending'
                                                    ? 'Seluruh transfer manual Rp 35.000 dari pengguna telah diverifikasi.'
                                                    : 'Belum ada transaksi pembayaran PRO pada filter ini.'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* SECTION 2: Antrean Verifikasi Pembayaran Invoice User (Konseling Sesi) */}
            <section id="antrean-verifikasi-user" className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-lg text-[#2b2542]">2. Antrean Invoice Sesi Konseling (Data Riwayat)</h2>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                {pendingPayments.length} Menunggu
                            </span>
                        </div>
                        <p className="text-xs text-[#5d5577] mt-1">
                            Verifikasi invoice sesi chat 1-on-1 dengan konselor yang dipesan user.
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
                                                {booking.patient?.name?.charAt(0) || 'U'}
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
                                            Setujui &amp; Buka Chat
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {pendingPayments.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-[#5d5577]">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="h-10 w-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-2">
                                                <CheckCircle className="h-5 w-5" />
                                            </div>
                                            <p className="font-semibold text-[#2b2542] text-sm">Tidak ada antrean invoice sesi konseling</p>
                                            <p className="text-xs text-[#5d5577] mt-0.5">Semua invoice sesi konseling telah diselesaikan.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* SECTION 3: Pembayaran Honor ke Konselor (Admin -> Counselor) */}
            <section id="antrean-honor-konselor" className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-lg text-[#2b2542]">3. Pembayaran Honor ke Konselor</h2>
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
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">User &amp; Tanggal</th>
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
                                                    Bayar &amp; Kirim Invoice
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

            {/* MODAL: View Full Image / Invoice / Struk Transfer */}
            {viewingImage && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b2542]/60 backdrop-blur-sm animate-fade-in"
                    onClick={() => setViewingImage(null)}
                >
                    <div 
                        className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-[#d9cff5] text-left"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-base font-bold text-[#2b2542]">{viewingImage.title}</h3>
                                {viewingImage.subtitle && (
                                    <p className="text-xs text-[#5d5577] mt-0.5">{viewingImage.subtitle}</p>
                                )}
                                {viewingImage.amount && (
                                    <p className="text-xs font-extrabold text-[#4b3b86] mt-0.5">
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

                        <div className="rounded-2xl overflow-hidden border border-[#d9cff5] max-h-96 flex items-center justify-center bg-slate-50 p-2">
                            <img 
                                src={viewingImage.url} 
                                alt={viewingImage.title} 
                                onError={(e) => {
                                    e.currentTarget.src = FALLBACK_INVOICE_PLACEHOLDER;
                                }}
                                className="max-h-80 max-w-full object-contain rounded-xl"
                            />
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <a 
                                href={viewingImage.url} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-xs font-semibold text-[#8f78d8] hover:text-[#4b3b86] flex items-center gap-1 underline"
                            >
                                <ExternalLink size={13} />
                                Buka Ukuran Penuh di Tab Baru
                            </a>
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
