import React, { useEffect, useState } from 'react';
import client, { getStorageUrl, FALLBACK_INVOICE_PLACEHOLDER } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui';
import { 
    Calendar, 
    Clock, 
    Users, 
    User,
    MessageSquare,
    ClipboardList,
    DollarSign,
    Check,
    CheckCircle2,
    Eye,
    Loader2,
    AlertCircle,
    X,
    FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PsychologistDashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmingId, setConfirmingId] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [viewingInvoice, setViewingInvoice] = useState(null);

    useEffect(() => {
        fetchPsychologistData();
    }, []);

    const fetchPsychologistData = async () => {
        try {
            setLoading(true);
            const bookingsRes = await client.get('/bookings');
            setBookings(bookingsRes.data || []);
        } catch (err) {
            console.error('Failed to load counselor data:', err);
        } finally {
            setLoading(false);
        }
    };

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 4000);
    };

    const handleConfirmReceived = async (paymentId) => {
        try {
            setConfirmingId(paymentId);
            await client.post(`/psychologist/payouts/${paymentId}/confirm`);
            showToast('Honor konsultasi berhasil dikonfirmasi diterima!');
            await fetchPsychologistData();
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mengonfirmasi penerimaan honor.');
        } finally {
            setConfirmingId(null);
        }
    };

    const activeBookings = bookings.filter(b => b.status === 'paid' || b.status === 'confirmed');
    const pendingPayouts = bookings.filter(b => b.payment && b.payment.counselor_payout_status === 'pending');
    const receivedPayouts = bookings.filter(b => b.payment && b.payment.counselor_payout_status === 'received');

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin h-9 w-9 text-primary mb-3" />
                <p className="text-sm text-[#5d5577]">Memuat dashboard konselor...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-[#2b2542]">Dashboard Konselor</h1>
                <p className="text-sm text-[#5d5577] mt-1">Pantau sesi konsultasi klien, pesan aktif, dan konfirmasi penerimaan honor dari admin.</p>
            </header>

            {/* Toast alert */}
            {toastMessage && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Notification Banner: Pending Payout to Confirm */}
            {pendingPayouts.length > 0 && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#efeafb] to-[#f7f4fd] border border-[#d9cff5] shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="w-5 h-5 text-[#8f78d8]" />
                        <h2 className="font-bold text-[#2b2542] text-base">
                            Ada {pendingPayouts.length} Transfer Honor Baru dari Admin!
                        </h2>
                    </div>
                    <p className="text-xs text-[#5d5577] mb-4">
                        Admin telah mentransfer honor sesi dan mengunggah foto invoice. Silakan periksa bukti transfer dan klik tombol <strong>"Diterima"</strong> di bawah ini.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pendingPayouts.map(booking => (
                            <div key={booking.id} className="bg-white p-4 rounded-xl border border-[#d9cff5] flex flex-col justify-between shadow-sm">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-bold text-sm text-[#2b2542]">{booking.patient?.name}</p>
                                            <p className="text-xs text-[#5d5577]">Sesi: {booking.date}</p>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5]">
                                            Menunggu Konfirmasi
                                        </span>
                                    </div>
                                    <p className="text-base font-extrabold text-[#4b3b86] mt-2">
                                        Rp {Number(booking.payment?.counselor_payout_amount || booking.payment?.amount || 150000).toLocaleString('id-ID')}
                                    </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                                    {booking.payment?.counselor_payout_proof && (
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="text-xs flex-1 flex items-center justify-center gap-1.5"
                                            onClick={() => setViewingInvoice({
                                                title: `Bukti Invoice Honor Sesi Pasien ${booking.patient?.name}`,
                                                url: getStorageUrl(booking.payment.counselor_payout_proof),
                                                amount: booking.payment.counselor_payout_amount,
                                                date: booking.date
                                            })}
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            Lihat Invoice
                                        </Button>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        disabled={confirmingId === booking.payment?.id}
                                        onClick={() => handleConfirmReceived(booking.payment?.id)}
                                        className="text-xs flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                                    >
                                        {confirmingId === booking.payment?.id ? (
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        ) : (
                                            <Check className="w-3.5 h-3.5" />
                                        )}
                                        Diterima
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Active Sessions */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="font-bold text-[#2b2542] flex items-center">
                                <Users className="h-5 w-5 mr-3 text-[#8f78d8]" />
                                Sesi Aktif & Terjadwal
                            </h2>
                            <Link to="/bookings" className="text-xs text-[#8f78d8] font-bold hover:text-[#4b3b86] transition-colors">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {activeBookings.map((booking) => {
                                const hasSession = Boolean(booking.counseling_session);
                                const isPaid = booking.status === 'paid' || booking.payment?.status === 'verified';

                                return (
                                    <div key={booking.id} className="p-6 flex items-center justify-between hover:bg-slate-50/60 transition-colors flex-wrap gap-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-11 w-11 rounded-2xl bg-[#efeafb] text-[#4b3b86] flex items-center justify-center font-bold text-sm">
                                                {booking.patient?.name?.charAt(0) || 'P'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#2b2542]">{booking.patient?.name}</p>
                                                <div className="flex items-center text-xs text-[#5d5577] mt-1 gap-2">
                                                    <span className="flex items-center">
                                                        <Calendar className="h-3 w-3 mr-1 text-[#8f78d8]" />
                                                        {new Date(booking.date).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                                                    </span>
                                                    {isPaid ? (
                                                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
                                                            Lunas
                                                        </span>
                                                    ) : (
                                                        <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-bold">
                                                            Menunggu Bayar
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {isPaid && hasSession ? (
                                                <Link to={`/sessions/${booking.counseling_session.id}`}>
                                                    <Button size="sm" className="text-xs flex items-center gap-1.5 bg-[#4b3b86] hover:bg-[#3d2f70] text-white">
                                                        <MessageSquare className="h-3.5 w-3.5" />
                                                        Masuk Chat
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">
                                                    Menunggu Verifikasi Admin
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            {activeBookings.length === 0 && (
                                <div className="p-12 text-center text-[#5d5577]">
                                    <ClipboardList className="h-10 w-10 mx-auto mb-3 text-[#8a82a2]" />
                                    <p className="font-bold text-[#2b2542]">Tidak ada sesi aktif saat ini.</p>
                                    <p className="text-xs text-[#5d5577] mt-1">Sesi baru akan muncul setelah pasien melakukan booking.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Riwayat Penerimaan Honor */}
                    <section className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="font-bold text-[#2b2542] flex items-center">
                                <DollarSign className="h-5 w-5 mr-3 text-[#8f78d8]" />
                                Riwayat Penerimaan Honor Konseling
                            </h2>
                            <span className="text-xs font-bold text-[#4b3b86] bg-[#efeafb] px-2.5 py-0.5 rounded-full border border-[#d9cff5]">
                                {receivedPayouts.length} Diterima
                            </span>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {receivedPayouts.map(booking => (
                                <div key={booking.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50/50 text-xs">
                                    <div>
                                        <p className="font-bold text-[#2b2542] text-sm">{booking.patient?.name}</p>
                                        <p className="text-[#5d5577] mt-0.5">Sesi: {booking.date}</p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <p className="font-extrabold text-[#4b3b86] text-sm">
                                            Rp {Number(booking.payment?.counselor_payout_amount || booking.payment?.amount || 150000).toLocaleString('id-ID')}
                                        </p>
                                        <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold border border-emerald-200">
                                            <Check className="w-3 h-3 mr-1 text-emerald-600" />
                                            Diterima
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {receivedPayouts.length === 0 && (
                                <div className="p-8 text-center text-xs text-[#5d5577]">
                                    Belum ada honor yang dikonfirmasi diterima.
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right: Quick tips & Honor Summary */}
                <div className="space-y-6">
                    <section className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm p-6 space-y-4">
                        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                            <div className="h-10 w-10 rounded-xl bg-[#efeafb] text-[#4b3b86] flex items-center justify-center">
                                <DollarSign className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-[#2b2542]">Informasi Honor</h3>
                                <p className="text-[11px] text-[#5d5577]">Alur pencairan honor konseling</p>
                            </div>
                        </div>

                        <div className="text-xs text-[#5d5577] space-y-2.5 leading-relaxed">
                            <p className="font-medium text-[#2b2542]">
                                1. Pasien mentransfer biaya sesi ke rekening admin.
                            </p>
                            <p className="font-medium text-[#2b2542]">
                                2. Admin memverifikasi pembayaran pasien dan membuka ruang chat konsultasi.
                            </p>
                            <p className="font-medium text-[#2b2542]">
                                3. Admin mentransfer honor ke rekening Anda dan mengunggah foto invoice.
                            </p>
                            <p className="font-medium text-[#2b2542]">
                                4. Anda menekan tombol <strong>"Diterima"</strong> setelah memeriksa foto invoice.
                            </p>
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-[#8f78d8] to-[#4b3b86] rounded-2xl p-6 text-white shadow-lg space-y-2">
                        <h3 className="font-bold flex items-center text-sm">
                            <ClipboardList className="h-4 w-4 mr-2" />
                            Catatan Sesi Konseling
                        </h3>
                        <p className="text-xs leading-relaxed opacity-95">
                            Isi catatan sesi segera setelah konsultasi berakhir untuk merekam kemajuan dan rekomendasi tindak lanjut bagi klien Anda.
                        </p>
                    </section>
                </div>
            </div>

            {/* MODAL: View Invoice Photo */}
            {viewingInvoice && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b2542]/60 backdrop-blur-sm"
                    onClick={() => setViewingInvoice(null)}
                >
                    <div 
                        className="relative w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl border border-[#d9cff5] text-left"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
                            <div>
                                <h3 className="text-base font-bold text-[#2b2542]">{viewingInvoice.title}</h3>
                                {viewingInvoice.amount && (
                                    <p className="text-xs font-semibold text-[#8f78d8] mt-0.5">
                                        Nominal Transfer: Rp {Number(viewingInvoice.amount).toLocaleString('id-ID')}
                                    </p>
                                )}
                            </div>
                            <button 
                                onClick={() => setViewingInvoice(null)} 
                                className="p-1.5 text-[#5d5577] hover:text-[#2b2542] hover:bg-[#efeafb] rounded-xl transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="rounded-xl overflow-hidden border border-[#d9cff5] max-h-96 flex items-center justify-center bg-slate-50 p-2">
                            <img 
                                src={viewingInvoice.url} 
                                alt={viewingInvoice.title} 
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
                                onClick={() => setViewingInvoice(null)}
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
