import React, { useEffect, useState } from 'react';
import client, { getStorageUrl, FALLBACK_INVOICE_PLACEHOLDER } from '../api/client';
import { Button, Input } from '../components/ui';
import { 
    Wallet, 
    DollarSign, 
    Check, 
    CheckCircle, 
    Clock, 
    Eye, 
    Calendar, 
    User, 
    Loader2, 
    AlertCircle, 
    FileText, 
    X, 
    Send,
    Upload,
    Search
} from 'lucide-react';

export default function AdminHonorList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal: Admin Payout to Counselor
    const [payoutBooking, setPayoutBooking] = useState(null);
    const [payoutAmount, setPayoutAmount] = useState('');
    const [payoutFile, setPayoutFile] = useState(null);
    const [payoutFilePreview, setPayoutFilePreview] = useState(null);
    const [payoutLoading, setPayoutLoading] = useState(false);
    const [payoutError, setPayoutError] = useState('');

    // Modal: Universal Image / Invoice Viewer
    const [viewingImage, setViewingImage] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await client.get('/bookings');
            // Only verified bookings (patient has paid) are eligible for counselor honor
            const verified = (res.data || []).filter(b => b.payment && b.payment.status === 'verified');
            setBookings(verified);
        } catch (err) {
            console.error('Failed to load honor data:', err);
        } finally {
            setLoading(false);
        }
    };

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 4000);
    };

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
            await fetchData();
        } catch (err) {
            setPayoutError(err.response?.data?.message || 'Gagal mengirim bukti pembayaran honor.');
        } finally {
            setPayoutLoading(false);
        }
    };

    const unpaidCount = bookings.filter(b => !b.payment?.counselor_payout_status || b.payment?.counselor_payout_status === 'unpaid').length;
    const pendingCount = bookings.filter(b => b.payment?.counselor_payout_status === 'pending').length;
    const receivedCount = bookings.filter(b => b.payment?.counselor_payout_status === 'received').length;

    const totalPaidAmount = bookings
        .filter(b => b.payment?.counselor_payout_status === 'received' || b.payment?.counselor_payout_status === 'pending')
        .reduce((acc, curr) => acc + Number(curr.payment?.counselor_payout_amount || curr.payment?.amount || 0), 0);

    const filtered = bookings.filter(b => 
        b.psychologist?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin h-9 w-9 text-primary mb-3" />
                <p className="text-sm text-[#5d5577]">Memuat data honor konselor...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#2b2542]">Manajemen Honor Konselor</h1>
                    <p className="text-sm text-[#5d5577] mt-1">
                        Transfer honor sesi konsultasi ke konselor, unggah invoice bukti transfer, dan pantau status konfirmasi.
                    </p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a82a2]" />
                    <Input 
                        className="pl-10" 
                        placeholder="Cari konselor / pasien..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {/* Toast alert */}
            {toastMessage && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* 1. Total Honor Ditransfer */}
                <div className="bg-white p-6 rounded-2xl border border-[#d9cff5]/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#5d5577]">Total Honor Ditransfer</span>
                            <div className="h-9 w-9 rounded-xl bg-[#efeafb] text-[#4b3b86] flex items-center justify-center">
                                <Wallet className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-[#2b2542] mt-3">
                            Rp {totalPaidAmount.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-[#5d5577] mt-1 font-medium">{receivedCount + pendingCount} sesi telah diproses</p>
                    </div>
                </div>

                {/* 2. Perlu Ditransfer (Unpaid) */}
                <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-amber-700">Perlu Ditransfer Admin</span>
                            <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                <Clock className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-amber-900 mt-3">
                            {unpaidCount} Sesi
                        </p>
                        <p className="text-xs text-amber-700 mt-1 font-medium">Pembayaran pasien sudah diverifikasi</p>
                    </div>
                </div>

                {/* 3. Menunggu Diterima Konselor */}
                <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-blue-700">Menunggu Diterima Konselor</span>
                            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                <Send className="h-5 w-5" />
                            </div>
                        </div>
                        <p className="text-2xl font-extrabold text-blue-900 mt-3">
                            {pendingCount} Sesi
                        </p>
                        <p className="text-xs text-blue-700 mt-1 font-medium">Invoice terkirim, menunggu tombol diterima</p>
                    </div>
                </div>
            </div>

            {/* Table of all verified counselor payouts */}
            <div className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-lg text-[#2b2542]">Daftar Pembayaran Honor Sesi</h2>
                        <p className="text-xs text-[#5d5577] mt-0.5">Sesi konsultasi yang pembayarannya telah terverifikasi oleh pasien.</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5]">
                        {filtered.length} Sesi Terverifikasi
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-[#efeafb]/40">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Konselor</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Pasien & Tanggal</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Nominal Honor</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Status Honor</th>
                                <th className="px-6 py-3.5 text-right text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Aksi Transfer</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map((booking) => {
                                const payoutStatus = booking.payment?.counselor_payout_status || 'unpaid';
                                const payoutAmountDisplay = booking.payment?.counselor_payout_amount || 
                                                            booking.psychologist?.psychologist_profile?.price_per_session || 
                                                            booking.payment?.amount || 
                                                            150000;

                                return (
                                    <tr key={booking.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-9 w-9 rounded-full bg-[#efeafb] text-[#4b3b86] flex items-center justify-center mr-3 font-bold text-xs">
                                                    {booking.psychologist?.name?.charAt(0) || 'K'}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-[#2b2542]">{booking.psychologist?.name || 'Konselor'}</p>
                                                    <p className="text-xs text-[#8f78d8]">{booking.psychologist?.phone || booking.psychologist?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-xs font-semibold text-[#2b2542]">{booking.patient?.name}</p>
                                            <p className="text-[11px] text-[#5d5577]">Sesi: {booking.date}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <p className="text-sm font-bold text-[#4b3b86]">
                                                Rp {Number(payoutAmountDisplay).toLocaleString('id-ID')}
                                            </p>
                                        </td>
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
                                                        Menunggu Diterima
                                                    </span>
                                                    {booking.payment?.counselor_payout_proof && (
                                                        <div>
                                                            <button
                                                                type="button"
                                                                onClick={() => setViewingImage({
                                                                    title: `Bukti Transfer Honor ke ${booking.psychologist?.name}`,
                                                                    url: getStorageUrl(booking.payment.counselor_payout_proof),
                                                                    amount: payoutAmountDisplay,
                                                                    subtitle: `Sesi Pasien: ${booking.patient?.name} | Tanggal: ${booking.date}`
                                                                })}
                                                                className="text-xs font-semibold text-[#8f78d8] hover:text-[#4b3b86] underline flex items-center"
                                                            >
                                                                <FileText className="w-3 h-3 mr-1" />
                                                                Lihat Invoice Terkirim
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
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-[#5d5577]">
                                        Tidak ada data honor konselor yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL: Admin Pay Counselor & Upload Invoice */}
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
                            <p className="text-[#5d5577]">Sesi Pasien: {payoutBooking.patient?.name} ({payoutBooking.date})</p>
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

            {/* MODAL: View Invoice */}
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
