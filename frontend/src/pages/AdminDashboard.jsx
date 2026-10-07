import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';
import { Button } from '../components/ui';
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
    AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
    const [payments, setPayments] = useState([]);
    const [stats, setStats] = useState({
        total_psychologists: 0,
        total_patients: 0,
        pending_payments: 0,
        total_bookings: 0
    });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            await Promise.all([fetchStats(), fetchPendingPayments()]);
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

    const fetchPendingPayments = async () => {
        try {
            const res = await client.get('/bookings'); 
            const pending = res.data.filter(b => b.payment && b.payment.status === 'pending');
            setPayments(pending);
        } catch (err) {
            console.error('Failed to load bookings:', err);
        }
    };

    const handleVerify = async (paymentId, status) => {
        try {
            setActionLoading(paymentId);
            await client.post(`/admin/payments/${paymentId}/verify`, { status });
            await Promise.all([fetchStats(), fetchPendingPayments()]);
        } catch (err) {
            alert('Gagal memproses verifikasi: ' + (err.response?.data?.message || err.message));
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-72">
                <Loader2 className="animate-spin h-9 w-9 text-primary mb-3" />
                <p className="text-sm text-[#5d5577]">Memuat data administrasi...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-[#2b2542]">Panel Administrasi</h1>
                <p className="text-[#5d5577] text-sm mt-1">Pantau statistik operasional, verifikasi pembayaran, dan manajemen tenaga ahli.</p>
            </header>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* 1. Total Psikolog */}
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

                {/* 2. Total Pasien */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5d5577]">Pasien & Klien</span>
                            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-[#2b2542] mt-3">
                            {stats.total_patients}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">Akun Pengguna Terdaftar</p>
                    </div>
                    <Link 
                        to="/admin/patients" 
                        className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#8f78d8] hover:text-[#4b3b86] transition-colors"
                    >
                        <span>Lihat Pasien</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {/* 3. Pending Verifikasi */}
                <div className="bg-white p-6 rounded-2xl border border-amber-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-amber-700">Verifikasi Pembayaran</span>
                            <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <Clock className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-amber-900 mt-3">
                            {stats.pending_payments}
                        </p>
                        <p className="text-xs text-amber-700 mt-1 font-medium">Menunggu Verifikasi Admin</p>
                    </div>
                    <a 
                        href="#antrean-verifikasi" 
                        className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
                    >
                        <span>Lihat Antrean</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                </div>

                {/* 4. Total Sesi / Booking */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5d5577]">Sesi Konseling</span>
                            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <CalendarCheck className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-extrabold text-[#2b2542] mt-3">
                            {stats.total_bookings}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">Total Booking Dibuat</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-[#5d5577]">
                        <span>Riwayat Keseluruhan</span>
                    </div>
                </div>
            </div>

            {/* Antrean Verifikasi Pembayaran */}
            <section id="antrean-verifikasi" className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-lg text-[#2b2542]">Antrean Verifikasi Pembayaran</h2>
                        <p className="text-xs text-[#5d5577] mt-0.5">Tinjau dan verifikasi bukti transfer pembayaran dari pasien.</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {payments.length} Pending
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-[#efeafb]/40">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Pasien</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Psikolog Terkait</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Nominal</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Bukti Transfer</th>
                                <th className="px-6 py-3.5 text-right text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {payments.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-9 w-9 rounded-full bg-[#efeafb] text-[#4b3b86] flex items-center justify-center mr-3 font-bold text-xs">
                                                {booking.patient?.name?.charAt(0) || 'P'}
                                            </div>
                                            <div className="text-sm">
                                                <p className="font-semibold text-[#2b2542]">{booking.patient?.name || 'Pasien'}</p>
                                                <p className="text-[#5d5577] text-xs">{booking.patient?.phone || booking.patient?.email || '-'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-xs font-semibold text-[#2b2542]">
                                            {booking.psychologist?.name || 'Konselor'}
                                        </div>
                                        <div className="text-[11px] text-[#5d5577]">
                                            Tgl: {booking.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-[#4b3b86]">
                                            Rp {Number(booking.payment?.amount || 0).toLocaleString('id-ID')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {booking.payment?.proof_image_path ? (
                                            <a 
                                                href={`http://localhost:8000/storage/${booking.payment.proof_image_path}`} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="inline-flex items-center text-[#8f78d8] hover:text-[#4b3b86] text-xs font-semibold bg-[#efeafb] px-3 py-1.5 rounded-lg border border-[#d9cff5] transition-colors"
                                            >
                                                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                                                Lihat Gambar Bukti
                                            </a>
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
                                            className="text-xs"
                                        >
                                            {actionLoading === booking.payment?.id ? (
                                                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1" />
                                            ) : (
                                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                            )}
                                            Verifikasi
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-[#5d5577]">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                                                <CheckCircle className="h-6 w-6" />
                                            </div>
                                            <p className="font-semibold text-[#2b2542] text-sm">Tidak ada antrean pembayaran</p>
                                            <p className="text-xs text-[#5d5577] mt-0.5">Semua pembayaran yang diajukan telah diverifikasi.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
