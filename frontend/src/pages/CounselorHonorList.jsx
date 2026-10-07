import React, { useEffect, useState } from 'react';
import client, { getStorageUrl, FALLBACK_INVOICE_PLACEHOLDER } from '../api/client';
import { Button } from '../components/ui';
import { 
    Wallet, 
    DollarSign, 
    Check, 
    CheckCircle2, 
    Clock, 
    Eye, 
    Calendar, 
    User, 
    Loader2, 
    AlertCircle, 
    FileText, 
    X, 
    ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CounselorHonorList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmingId, setConfirmingId] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [viewingInvoice, setViewingInvoice] = useState(null);

    useEffect(() => {
        fetchHonorData();
    }, []);

    const fetchHonorData = async () => {
        try {
            setLoading(true);
            const res = await client.get('/bookings');
            setBookings(res.data || []);
        } catch (err) {
            console.error('Failed to fetch honor data:', err);
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
            await fetchHonorData();
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mengonfirmasi penerimaan honor.');
        } finally {
            setConfirmingId(null);
        }
    };

    // Calculations
    const pendingList = bookings.filter(b => b.payment && b.payment.counselor_payout_status === 'pending');
    const receivedList = bookings.filter(b => b.payment && b.payment.counselor_payout_status === 'received');
    const unpaidList = bookings.filter(b => b.status === 'paid' && (!b.payment?.counselor_payout_status || b.payment?.counselor_payout_status === 'unpaid'));

    const totalReceivedAmount = receivedList.reduce((acc, curr) => {
        const val = curr.payment?.counselor_payout_amount || curr.payment?.amount || 0;
        return acc + Number(val);
    }, 0);

    const totalPendingAmount = pendingList.reduce((acc, curr) => {
        const val = curr.payment?.counselor_payout_amount || curr.payment?.amount || 0;
        return acc + Number(val);
    }, 0);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin h-9 w-9 text-primary mb-3" />
                <p className="text-sm text-[#5d5577]">Memuat riwayat honor konselor...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#2b2542]">Honor & Payout Konselor</h1>
                    <p className="text-sm text-[#5d5577] mt-1">
                        Pantau transfer honor dari admin, periksa foto invoice bukti bayar, dan konfirmasi penerimaan.
                    </p>
                </div>
            </header>

            {/* Toast Alert */}
            {toastMessage && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* 1. Total Diterima */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5d5577]">Total Honor Diterima</span>
                            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <Wallet className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-[#2b2542] mt-3">
                            Rp {totalReceivedAmount.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">{receivedList.length} sesi telah selesai dibayarkan</p>
                    </div>
                </div>

                {/* 2. Menunggu Diterima */}
                <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-blue-700">Menunggu Konfirmasi</span>
                            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Clock className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-blue-900 mt-3">
                            Rp {totalPendingAmount.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-blue-700 mt-1 font-medium">{pendingList.length} transfer perlu dikonfirmasi</p>
                    </div>
                </div>

                {/* 3. Menunggu Pembayaran Admin */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5d5577]">Antrean Transfer Admin</span>
                            <div className="h-9 w-9 rounded-xl bg-[#efeafb] text-[#4b3b86] flex items-center justify-center">
                                <Calendar className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-[#2b2542] mt-3">
                            {unpaidList.length} Sesi
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">Pasien lunas, menunggu transfer admin</p>
                    </div>
                </div>
            </div>

            {/* SECTION 1: Transfer Honor Menunggu Konfirmasi Konselor ("Diterima") */}
            {pendingList.length > 0 && (
                <section className="bg-gradient-to-r from-[#efeafb] to-[#f8f5fe] rounded-2xl border border-[#d9cff5] p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-[#8f78d8]" />
                        <h2 className="font-bold text-lg text-[#2b2542]">
                            Konfirmasi Penerimaan Honor ({pendingList.length})
                        </h2>
                    </div>
                    <p className="text-xs text-[#5d5577]">
                        Admin telah mengunggah invoice bukti transfer. Silakan periksa invoice dan tekan tombol <strong>"Diterima"</strong>.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {pendingList.map(booking => {
                            const payoutAmount = booking.payment?.counselor_payout_amount || booking.payment?.amount || 150000;

                            return (
                                <div key={booking.id} className="bg-white p-5 rounded-xl border border-[#d9cff5] shadow-sm flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-bold text-[#2b2542] text-sm">{booking.patient?.name}</p>
                                                <p className="text-xs text-[#5d5577] mt-0.5">Sesi: {booking.date}</p>
                                            </div>
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5]">
                                                Ditransfer Admin
                                            </span>
                                        </div>
                                        <p className="text-lg font-extrabold text-[#4b3b86] mt-3">
                                            Rp {Number(payoutAmount).toLocaleString('id-ID')}
                                        </p>
                                    </div>

                                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                                        {booking.payment?.counselor_payout_proof && (
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                className="text-xs flex-1 flex items-center justify-center gap-1.5"
                                                onClick={() => setViewingInvoice({
                                                    title: `Bukti Invoice Honor Sesi ${booking.patient?.name}`,
                                                    url: getStorageUrl(booking.payment.counselor_payout_proof),
                                                    amount: payoutAmount,
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
                            );
                        })}
                    </div>
                </section>
            )}

            {/* SECTION 2: Riwayat Keseluruhan Honor Konselor */}
            <section className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-lg text-[#2b2542]">Riwayat Honor Konseling</h2>
                        <p className="text-xs text-[#5d5577] mt-0.5">Daftar seluruh sesi konsultasi dan status pencairan honor.</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-[#efeafb]/40">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Pasien</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Jadwal Sesi</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Nominal Honor</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Bukti Invoice</th>
                                <th className="px-6 py-3.5 text-right text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Status Honor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bookings.map((booking) => {
                                const payoutStatus = booking.payment?.counselor_payout_status || 'unpaid';
                                const payoutAmount = booking.payment?.counselor_payout_amount || booking.payment?.amount || 150000;

                                return (
                                    <tr key={booking.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-[#efeafb] text-[#4b3b86] flex items-center justify-center mr-3 font-bold text-xs">
                                                    {booking.patient?.name?.charAt(0) || 'P'}
                                                </div>
                                                <span className="font-semibold text-sm text-[#2b2542]">{booking.patient?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-[#5d5577]">
                                            {booking.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-bold text-[#4b3b86]">
                                                Rp {Number(payoutAmount).toLocaleString('id-ID')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {booking.payment?.counselor_payout_proof ? (
                                                <button
                                                    type="button"
                                                    onClick={() => setViewingInvoice({
                                                        title: `Bukti Invoice Honor Sesi ${booking.patient?.name}`,
                                                        url: getStorageUrl(booking.payment.counselor_payout_proof),
                                                        amount: payoutAmount,
                                                        date: booking.date
                                                    })}
                                                    className="inline-flex items-center text-xs font-semibold text-[#8f78d8] hover:text-[#4b3b86] bg-[#efeafb] px-3 py-1 rounded-xl border border-[#d9cff5] transition-colors"
                                                >
                                                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                                                    Lihat Foto
                                                </button>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Belum ada invoice</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            {payoutStatus === 'received' ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                    <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                                                    Diterima
                                                </span>
                                            ) : payoutStatus === 'pending' ? (
                                                <Button
                                                    size="sm"
                                                    variant="primary"
                                                    disabled={confirmingId === booking.payment?.id}
                                                    onClick={() => handleConfirmReceived(booking.payment?.id)}
                                                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white"
                                                >
                                                    {confirmingId === booking.payment?.id ? (
                                                        <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" />
                                                    ) : (
                                                        <Check className="w-3.5 h-3.5 mr-1" />
                                                    )}
                                                    Diterima
                                                </Button>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                    Belum Ditransfer Admin
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-[#5d5577]">
                                        Belum ada riwayat honor konsultasi.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

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
