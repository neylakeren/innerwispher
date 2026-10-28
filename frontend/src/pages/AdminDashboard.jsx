import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client, { getStorageUrl, FALLBACK_INVOICE_PLACEHOLDER } from '../api/client';
import { Button } from '../components/ui';
import { 
    CheckCircle, 
    XCircle, 
    ExternalLink, 
    Loader2,
    Users,
    Clock,
    ArrowUpRight,
    User,
    Check,
    DollarSign,
    FileText,
    Eye,
    Award,
    Sparkles,
    Building2,
    ShieldCheck,
    CreditCard,
    Calendar,
    X
} from 'lucide-react';

export default function AdminDashboard() {
    const [proPayments, setProPayments] = useState([]);
    const [proFilter, setProFilter] = useState('all'); // 'all', 'pending', 'verified', 'rejected'
    const [stats, setStats] = useState({
        total_patients: 0,
        total_pro_users: 0,
        pending_pro_payments: 0,
    });
    const [loading, setLoading] = useState(true);
    const [actionProLoading, setActionProLoading] = useState(null);

    // Modal: Universal Image / Receipt Viewer
    const [viewingImage, setViewingImage] = useState(null);
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
            await Promise.all([fetchStats(), fetchProPayments()]);
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

    // Verify PRO Subscription Payment Proof
    const handleVerifyPro = async (paymentId, status) => {
        try {
            setActionProLoading(paymentId);
            await client.post(`/admin/pro-payments/${paymentId}/verify`, { status });
            showToast(status === 'verified' 
                ? 'Struk transfer PRO berhasil disetujui! Masa aktif pengguna bertambah 30 hari.' 
                : 'Struk transfer PRO ditolak. Pengguna dapat mengunggah ulang bukti transfer.');
            await Promise.all([fetchStats(), fetchProPayments()]);
        } catch (err) {
            alert('Gagal memproses verifikasi PRO: ' + (err.response?.data?.message || err.message));
        } finally {
            setActionProLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-72">
                <Loader2 className="animate-spin h-9 w-9 text-primary mb-3" />
                <p className="text-sm text-[#5d5577]">Memuat data administrasi langganan PRO...</p>
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

    const totalRevenue = verifiedProCount * 35000;

    return (
        <div className="space-y-8 font-quicksand pb-12">
            <header>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-semibold mb-2">
                    <ShieldCheck size={14} />
                    Pusat Kontrol Administrasi &amp; Verifikasi Langganan
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2542]">Panel Verifikasi Langganan PRO</h1>
                <p className="text-[#5d5577] text-sm mt-1">
                    Verifikasi struk transfer manual langganan bulanan <strong>Rp 35.000 / bulan (30 hari)</strong> ke rekening BCA &amp; SeaBank resmi.
                </p>
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
                {/* 1. Antrean Struk PRO - PENDING */}
                <div className="bg-white p-6 rounded-2xl border-2 border-amber-300 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100/50 rounded-bl-full pointer-events-none" />
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800">Struk Menunggu</span>
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
                            <span className="text-xs font-bold uppercase tracking-wider text-[#4b3b86]">Member PRO Aktif</span>
                            <div className="h-9 w-9 rounded-xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center">
                                <Award className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-[#2b2542] mt-3">
                            {stats.total_pro_users ?? verifiedProCount}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">Langganan 30 Hari Aktif</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#8f78d8]">
                        <span>Akses Lengkap Terbuka</span>
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

                {/* 4. Total Estimasi Pendapatan Langganan */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5d5577]">Pendapatan PRO</span>
                            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                <DollarSign className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-2xl sm:text-3xl font-extrabold text-[#2b2542] mt-3">
                            Rp {totalRevenue.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">{verifiedProCount} Transaksi Disetujui</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                        <span>Rp 35.000 / Langganan</span>
                        <CreditCard className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                </div>
            </div>

            {/* TABEL VERIFIKASI STRUK TRANSFER PRO */}
            <section id="antrean-verifikasi-pro" className="bg-white rounded-3xl border-2 border-[#8f78d8]/40 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-[#8f78d8] text-white flex items-center justify-center">
                                <Sparkles size={16} />
                            </div>
                            <h2 className="font-bold text-lg text-[#2b2542]">Antrean Verifikasi Struk Transfer PRO (Rp 35.000 / Bulan)</h2>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                {pendingProCount} Menunggu
                            </span>
                        </div>
                        <p className="text-xs text-[#5d5577] mt-1 max-w-2xl">
                            Pengguna mentransfer <strong>Rp 35.000</strong> ke channel resmi <strong>QRIS, BCA 1530581281, SeaBank 901928200829, GoPay / ShopeePay 081238536128</strong> a/n Neyla Vala Kiara Andi. Setujui untuk mengaktifkan akses PRO selama 30 hari.
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
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Masa Aktif PRO</th>
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
                                                    p.bank_destination?.toUpperCase() === 'BCA'
                                                        ? 'bg-blue-100 text-blue-800' 
                                                        : p.bank_destination?.toUpperCase() === 'SEABANK'
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : p.bank_destination?.toUpperCase() === 'QRIS'
                                                        ? 'bg-purple-100 text-[#4b3b86] border border-purple-200'
                                                        : p.bank_destination?.toUpperCase() === 'GOPAY'
                                                        ? 'bg-cyan-100 text-cyan-800'
                                                        : p.bank_destination?.toUpperCase() === 'SHOPEEPAY'
                                                        ? 'bg-orange-100 text-orange-800'
                                                        : 'bg-[#efeafb] text-[#4b3b86]'
                                                }`}>
                                                    {p.bank_destination || 'BCA'}
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

                                        {/* Subscription Expiry / Duration */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {p.user?.pro_expires_at ? (
                                                <div className="text-xs space-y-0.5">
                                                    <span className="font-semibold text-emerald-800 flex items-center gap-1">
                                                        <Calendar size={12} className="text-emerald-600" />
                                                        Sampai {new Date(p.user.pro_expires_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                    </span>
                                                    <p className="text-[10px] text-[#5d5577]">Durasi 30 Hari</p>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-[#5d5577] italic">30 Hari setelah acc</span>
                                            )}
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
                                                        subtitle: `Bank Tujuan: ${p.bank_destination} | Pengirim: ${p.sender_name} | Waktu: ${new Date(p.created_at).toLocaleString('id-ID')}`
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
                                                        className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                                                    >
                                                        {actionProLoading === p.id ? (
                                                            <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                                                        ) : (
                                                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                                        )}
                                                        Setujui (30 Hari)
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
                                    <td colSpan="7" className="px-6 py-12 text-center text-[#5d5577]">
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

            {/* MODAL: View Full Image / Struk Transfer */}
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
