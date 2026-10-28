import React, { useEffect, useState } from 'react';
import client, { getStorageUrl, FALLBACK_INVOICE_PLACEHOLDER } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/ui';
import { 
    Calendar, 
    Upload, 
    Clock, 
    CheckCircle2, 
    XCircle, 
    MessageCircle,
    FileText,
    Lock,
    ExternalLink,
    AlertCircle,
    Check,
    Loader2,
    DollarSign,
    CreditCard,
    ArrowRight,
    X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StatusBadge = ({ booking }) => {
    const { status, payment } = booking;
    
    if (payment && payment.status === 'pending') {
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                <Clock className="w-3 h-3 mr-1 text-amber-600 animate-pulse" />
                Menunggu Verifikasi Admin
            </span>
        );
    }
    
    if (payment && payment.status === 'rejected') {
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                <XCircle className="w-3 h-3 mr-1 text-rose-600" />
                Pembayaran Ditolak
            </span>
        );
    }

    if (status === 'paid' || (payment && payment.status === 'verified')) {
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                Pembayaran Disetujui
            </span>
        );
    }

    if (status === 'confirmed') {
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <CreditCard className="w-3 h-3 mr-1 text-blue-600" />
                Menunggu Pembayaran
            </span>
        );
    }

    if (status === 'completed') {
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5]">
                Selesai
            </span>
        );
    }

    return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {status}
        </span>
    );
};

export default function BookingList() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Upload Patient Invoice Modal
    const [uploadingBooking, setUploadingBooking] = useState(null);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [amount, setAmount] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    // View Image / Invoice Modal
    const [viewingImage, setViewingImage] = useState(null); // { title, url, amount, status }

    // Action Loading for Counselor Confirm Received
    const [confirmingPayoutId, setConfirmingPayoutId] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await client.get('/bookings');
            setBookings(res.data);
        } catch (err) {
            console.error('Failed to fetch bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 4000);
    };

    const openUploadModal = (booking) => {
        setUploadingBooking(booking);
        // Pre-fill amount with psychologist's rate if available
        const defaultAmount = booking.psychologist?.psychologist_profile?.price_per_session || 
                              booking.payment?.amount || 
                              150000;
        setAmount(String(defaultAmount));
        setFile(null);
        setFilePreview(null);
        setUploadError('');
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setFilePreview(URL.createObjectURL(selected));
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setUploadError('Silakan pilih foto invoice atau bukti transfer pembayaran.');
            return;
        }

        setIsUploading(true);
        setUploadError('');
        const formData = new FormData();
        formData.append('booking_id', uploadingBooking.id);
        formData.append('proof_image', file);
        formData.append('amount', amount);

        try {
            await client.post('/payments/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUploadingBooking(null);
            setFile(null);
            setFilePreview(null);
            showToast('Foto invoice pembayaran berhasil dikirim ke admin untuk diverifikasi.');
            await fetchBookings();
        } catch (err) {
            setUploadError(err.response?.data?.message || 'Gagal mengunggah bukti pembayaran.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleConfirmPayout = async (paymentId) => {
        try {
            setConfirmingPayoutId(paymentId);
            await client.post(`/psychologist/payouts/${paymentId}/confirm`);
            showToast('Honor konsultasi berhasil dikonfirmasi diterima!');
            await fetchBookings();
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal mengonfirmasi penerimaan honor.');
        } finally {
            setConfirmingPayoutId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="animate-spin h-9 w-9 text-primary mb-3" />
                <p className="text-sm text-[#5d5577]">Memuat riwayat konsultasi & booking...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#2b2542]">Daftar Konsultasi & Pembayaran</h1>
                    <p className="text-sm text-[#5d5577] mt-1">
                        {user.role === 'patient' 
                            ? 'Pantau status pembayaran invoice dan jadwal konsultasi Anda bersama konselor.'
                            : 'Kelola jadwal sesi konsultasi klien dan pantau konfirmasi transfer honor.'}
                    </p>
                </div>
                {user.role === 'patient' && (
                    <Link to="/psychologists">
                        <Button className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Booking Sesi Baru
                        </Button>
                    </Link>
                )}
            </header>

            {/* Toast alert */}
            {toastMessage && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>{toastMessage}</span>
                </div>
            )}

            {/* Patient Workflow Hint */}
            {user.role === 'patient' && (
                <div className="p-4 rounded-2xl bg-[#efeafb]/70 border border-[#d9cff5] text-[#4b3b86] text-xs sm:text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#8f78d8]" />
                    <div className="space-y-1">
                        <p className="font-bold">Alur Pembayaran & Akses Konsultasi:</p>
                        <p className="text-[#5d5577] text-xs leading-relaxed">
                            1. Buat jadwal konsultasi &bull; 2. Kirim foto invoice/bukti transfer pembayaran ke admin &bull; 3. Admin memverifikasi pembayaran &bull; 4. Sesi chat konsultasi langsung terbuka aktif.
                        </p>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-[#efeafb]/40">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Jadwal Sesi</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">
                                    {user.role === 'patient' ? 'Konselor' : 'User'}
                                </th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Status Pembayaran</th>
                                {user.role === 'psychologist' && (
                                    <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Honor Konselor</th>
                                )}
                                <th className="px-6 py-3.5 text-right text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Aksi & Chat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bookings.map((booking) => {
                                const hasPaid = booking.status === 'paid' || booking.payment?.status === 'verified';
                                const isPendingAdmin = booking.payment?.status === 'pending';
                                const isRejected = booking.payment?.status === 'rejected';
                                const needsPayment = !booking.payment || isRejected;

                                return (
                                    <tr key={booking.id} className="hover:bg-slate-50/60 transition-colors">
                                        {/* 1. Schedule */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-semibold text-[#2b2542]">
                                                <Calendar className="h-4 w-4 mr-2 text-[#8f78d8]" />
                                                {new Date(booking.date).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                                            </div>
                                            <div className="text-[11px] text-[#5d5577] mt-0.5">
                                                ID #{booking.id}
                                            </div>
                                        </td>

                                        {/* 2. Counterpart */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-bold text-[#2b2542]">
                                                {user.role === 'patient' ? booking.psychologist?.name : booking.patient?.name}
                                            </div>
                                            <div className="text-xs text-[#8f78d8] font-medium">
                                                {user.role === 'patient' 
                                                    ? (booking.psychologist?.psychologist_profile?.specialization || 'Konselor Berlisensi')
                                                    : (booking.patient?.phone || booking.patient?.email || 'User')}
                                            </div>
                                        </td>

                                        {/* 3. Status Badge */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge booking={booking} />
                                            {booking.payment && (
                                                <p className="text-xs font-bold text-[#4b3b86] mt-1">
                                                    Rp {Number(booking.payment.amount).toLocaleString('id-ID')}
                                                </p>
                                            )}
                                        </td>

                                        {/* 4. Counselor Honor Column (Only for Psychologist) */}
                                        {user.role === 'psychologist' && (
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {booking.payment?.counselor_payout_status === 'received' ? (
                                                    <div>
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                            <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                                                            Diterima
                                                        </span>
                                                        <p className="text-[11px] text-[#5d5577] mt-0.5 font-medium">
                                                            Rp {Number(booking.payment.counselor_payout_amount || booking.payment.amount).toLocaleString('id-ID')}
                                                        </p>
                                                    </div>
                                                ) : booking.payment?.counselor_payout_status === 'pending' ? (
                                                    <div className="space-y-1.5">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5]">
                                                            Ditransfer Admin
                                                        </span>
                                                        <div className="flex items-center gap-1.5">
                                                            {booking.payment.counselor_payout_proof && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setViewingImage({
                                                                        title: 'Invoice Honor Konselor dari Admin',
                                                                        url: getStorageUrl(booking.payment.counselor_payout_proof),
                                                                        amount: booking.payment.counselor_payout_amount,
                                                                        status: 'Ditransfer oleh Admin'
                                                                    })}
                                                                    className="text-xs font-semibold text-[#8f78d8] hover:text-[#4b3b86] underline"
                                                                >
                                                                    Lihat Invoice
                                                                </button>
                                                            )}
                                                            <Button
                                                                size="sm"
                                                                variant="primary"
                                                                className="text-xs py-1 px-2.5 h-auto bg-emerald-600 hover:bg-emerald-700 text-white"
                                                                disabled={confirmingPayoutId === booking.payment.id}
                                                                onClick={() => handleConfirmPayout(booking.payment.id)}
                                                            >
                                                                {confirmingPayoutId === booking.payment.id ? (
                                                                    <Loader2 className="w-3 h-3 animate-spin mr-1" />
                                                                ) : (
                                                                    <Check className="w-3 h-3 mr-1" />
                                                                )}
                                                                Diterima
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : hasPaid ? (
                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                        Menunggu Pembayaran Admin
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">
                                                        User belum bayar
                                                    </span>
                                                )}
                                            </td>
                                        )}

                                        {/* 5. Actions & Chat Consultation Button */}
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Patient action: Upload invoice */}
                                                {user.role === 'patient' && needsPayment && (
                                                    <Button 
                                                        size="sm" 
                                                        variant="primary"
                                                        onClick={() => openUploadModal(booking)}
                                                        className="text-xs flex items-center gap-1.5"
                                                    >
                                                        <Upload className="h-3.5 w-3.5" />
                                                        {isRejected ? 'Unggah Ulang Invoice' : 'Kirim Foto Invoice'}
                                                    </Button>
                                                )}

                                                {/* View Patient's Uploaded Invoice */}
                                                {booking.payment?.proof_image_path && (
                                                    <Button 
                                                        size="sm" 
                                                        variant="secondary"
                                                        onClick={() => setViewingImage({
                                                            title: 'Bukti Pembayaran Invoice User',
                                                            url: getStorageUrl(booking.payment.proof_image_path),
                                                            amount: booking.payment.amount,
                                                            status: booking.payment.status === 'verified' ? 'Terverifikasi' : booking.payment.status === 'pending' ? 'Menunggu Approval Admin' : 'Ditolak'
                                                        })}
                                                        className="text-xs flex items-center gap-1.5"
                                                    >
                                                        <FileText className="h-3.5 w-3.5" />
                                                        Invoice User
                                                    </Button>
                                                )}

                                                {/* Chat button for Patient & Counselor: ONLY UNLOCKED IF PAID / VERIFIED */}
                                                {hasPaid && booking.counseling_session ? (
                                                    <Link to={`/sessions/${booking.counseling_session.id}`}>
                                                        <Button 
                                                            size="sm" 
                                                            className="text-xs flex items-center gap-1.5 bg-gradient-to-r from-[#8f78d8] to-[#4b3b86] text-white shadow-sm hover:opacity-95"
                                                        >
                                                            <MessageCircle className="h-3.5 w-3.5" />
                                                            Masuk Chat
                                                        </Button>
                                                    </Link>
                                                ) : isPendingAdmin ? (
                                                    <div 
                                                        title="Chat konsultasi akan terbuka otomatis setelah invoice pembayaran disetujui admin." 
                                                        className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                                                    >
                                                        <Lock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                                                        Chat Terkunci
                                                    </div>
                                                ) : null}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan={user.role === 'psychologist' ? 5 : 4} className="px-6 py-16 text-center text-[#5d5577]">
                                        <Calendar className="h-10 w-10 mx-auto mb-3 text-[#8a82a2]" />
                                        <p className="font-bold text-[#2b2542]">Belum ada riwayat booking konsultasi.</p>
                                        <p className="text-xs text-[#5d5577] mt-1">
                                            {user.role === 'patient' 
                                                ? 'Pilih konselor dan jadwalkan sesi konsultasi pertama Anda.'
                                                : 'Belum ada klien yang menjadwalkan sesi konsultasi saat ini.'}
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL 1: Upload Foto Invoice Pembayaran (Patient -> Admin) */}
            {uploadingBooking && (
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
                                <h3 className="text-lg font-bold text-[#2b2542]">Kirim Invoice Pembayaran</h3>
                                <p className="text-xs text-[#5d5577]">Kirim bukti transfer ke admin untuk membuka sesi chat.</p>
                            </div>
                            <button 
                                onClick={() => setUploadingBooking(null)} 
                                disabled={isUploading}
                                className="p-1.5 text-[#5d5577] hover:text-[#2b2542] hover:bg-[#efeafb] rounded-xl transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {uploadError && (
                            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                <span>{uploadError}</span>
                            </div>
                        )}

                        {/* Rekening Pembayaran Resmi Inner Whisper */}
                        <div className="mb-5 p-4 rounded-xl bg-[#efeafb]/60 border border-[#d9cff5] space-y-2">
                            <p className="text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Rekening Resmi Pembayaran:</p>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-semibold text-[#2b2542]">Bank BCA:</span>
                                <span className="font-mono font-bold text-[#4b3b86] bg-white px-2 py-0.5 rounded border border-[#d9cff5]">
                                    1530581281
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-semibold text-[#2b2542]">SeaBank:</span>
                                <span className="font-mono font-bold text-[#4b3b86] bg-white px-2 py-0.5 rounded border border-[#d9cff5]">
                                    901928200829
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-semibold text-[#2b2542]">GoPay / ShopeePay:</span>
                                <span className="font-mono font-bold text-[#4b3b86] bg-white px-2 py-0.5 rounded border border-[#d9cff5]">
                                    081238536128
                                </span>
                            </div>
                            <div className="text-[11px] text-[#5d5577] pt-1 border-t border-[#d9cff5]/60">
                                Atas Nama: <strong className="text-[#2b2542]">Neyla Vala Kiara Andi</strong>
                            </div>
                        </div>

                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                    Jumlah Transfer (Rp) *
                                </label>
                                <Input
                                    type="number"
                                    min="0"
                                    required
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="150000"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                    Foto Invoice / Bukti Transfer (JPG/PNG/WEBP, Max 5MB) *
                                </label>
                                <input
                                    type="file"
                                    required
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-xs text-[#5d5577] file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border file:border-[#d9cff5] file:text-xs file:font-semibold file:bg-[#efeafb] file:text-[#4b3b86] hover:file:bg-[#e4dbf7] cursor-pointer"
                                />
                            </div>

                            {/* Image Preview */}
                            {filePreview && (
                                <div className="mt-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                                    <p className="text-[11px] font-semibold text-[#5d5577] mb-1">Pratinjau Foto Bukti:</p>
                                    <img 
                                        src={filePreview} 
                                        alt="Preview Bukti" 
                                        className="max-h-40 rounded-lg mx-auto object-contain"
                                    />
                                </div>
                            )}

                            <div className="flex space-x-3 pt-3">
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="flex-1 text-xs"
                                    disabled={isUploading}
                                    onClick={() => setUploadingBooking(null)}
                                >
                                    Batal
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="flex-1 text-xs flex items-center justify-center gap-1.5"
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Mengirim...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4" />
                                            Kirim Invoice ke Admin
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 2: View Full Image / Invoice Modal */}
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
                                onError={(e) => { e.currentTarget.src = FALLBACK_INVOICE_PLACEHOLDER; }}
                                className="max-h-80 max-w-full object-contain rounded-lg"
                            />
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-xs font-semibold text-[#5d5577]">
                                Status: <span className="text-[#4b3b86] font-bold">{viewingImage.status || '-'}</span>
                            </span>
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
