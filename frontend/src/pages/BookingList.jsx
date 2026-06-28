import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/ui';
import { 
    Calendar, 
    Upload, 
    Clock, 
    CheckCircle2, 
    XCircle, 
    MessageCircle,
    FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StatusBadge = ({ booking }) => {
    const { status, payment } = booking;
    
    if (payment && payment.status === 'pending') {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-amber-100 text-amber-700 border-amber-200">
                Menunggu Verifikasi
            </span>
        );
    }
    
    if (payment && payment.status === 'rejected') {
        return (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-rose-100 text-rose-700 border-rose-200">
                Pembayaran Ditolak
            </span>
        );
    }

    const statuses = {
        pending: { label: 'Menunggu', color: 'bg-amber-100 text-amber-700 border-amber-200' },
        confirmed: { label: 'Menunggu Pembayaran', color: 'bg-blue-50 text-blue-600 border-blue-100' },
        paid: { label: 'Sudah Bayar', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        cancelled: { label: 'Dibatalkan', color: 'bg-slate-100 text-slate-600 border-slate-200' },
        completed: { label: 'Selesai', color: 'bg-primary-container text-on-primary-container border-primary-container/30' },
    };
    
    const config = statuses[status] || statuses.pending;
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
            {config.label}
        </span>
    );
};


export default function BookingList() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploadingId, setUploadingId] = useState(null);
    const [file, setFile] = useState(null);
    const [amount, setAmount] = useState('');
    const [viewingPayment, setViewingPayment] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await client.get('/bookings');
            setBookings(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('booking_id', uploadingId);
        formData.append('proof_image', file);
        formData.append('amount', amount);

        try {
            await client.post('/payments/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUploadingId(null);
            setFile(null);
            setAmount('');
            fetchBookings();
        } catch (err) {
            alert('Gagal mengunggah bukti pembayaran');
        }
    };

    if (loading) return <div className="space-y-4">
        {[1,2,3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />)}
    </div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Daftar Booking</h1>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Jadwal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    {user.role === 'patient' ? 'Psikolog' : 'Pasien'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-slate-900">
                                            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                                            {new Date(booking.date).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-slate-900">
                                            {user.role === 'patient' ? booking.psychologist?.name : booking.patient?.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge booking={booking} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            {booking.status === 'confirmed' && user.role === 'patient' && (!booking.payment || booking.payment.status === 'rejected') && (
                                                <Button 
                                                    size="sm" 
                                                    variant="primary"
                                                    onClick={() => setUploadingId(booking.id)}
                                                >
                                                    <Upload className="h-4 w-4 mr-2" />
                                                    {booking.payment?.status === 'rejected' ? 'Bayar Ulang' : 'Bayar'}
                                                </Button>
                                            )}

                                            {booking.payment && (booking.payment.status === 'pending' || booking.payment.status === 'verified' || booking.payment.status === 'rejected') && (
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    onClick={() => setViewingPayment(booking.payment)}
                                                >
                                                    <FileText className="h-4 w-4 mr-2" />
                                                    Bukti Bayar
                                                </Button>
                                            )}
                                            
                                            {(booking.status === 'paid' || booking.status === 'completed') && booking.counseling_session && (
                                                <Link to={`/sessions/${booking.counseling_session.id}`}>
                                                    <Button size="sm" variant="outline">
                                                        <MessageCircle className="h-4 w-4 mr-2" />
                                                        Chat
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                        Belum ada data booking.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Upload Modal */}
            {uploadingId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900">Upload Bukti Pembayaran</h3>
                            <button onClick={() => setUploadingId(null)} className="text-slate-400 hover:text-slate-600">
                                <XCircle className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <Input
                                label="Jumlah Transfer"
                                type="number"
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Rp 150.000"
                            />
                            <Input
                                label="Foto Bukti (JPG/PNG)"
                                type="file"
                                required
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <div className="flex space-x-3 mt-6">
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    className="flex-1"
                                    onClick={() => setUploadingId(null)}
                                >
                                    Batal
                                </Button>
                                <Button type="submit" className="flex-1">
                                    Kirim Bukti
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Payment Modal */}
            {viewingPayment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-100 font-jakarta">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900">Detail Pembayaran</h3>
                            <button onClick={() => setViewingPayment(null)} className="text-slate-400 hover:text-slate-600">
                                <XCircle className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Jumlah Transfer</p>
                                <p className="text-2xl font-bold text-primary mt-1">
                                    Rp {Number(viewingPayment.amount).toLocaleString('id-ID')}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Status Verifikasi</p>
                                <div className="mt-1">
                                    {viewingPayment.status === 'pending' && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                                            Menunggu Verifikasi Admin
                                        </span>
                                    )}
                                    {viewingPayment.status === 'verified' && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                            Terverifikasi
                                        </span>
                                    )}
                                    {viewingPayment.status === 'rejected' && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
                                            Ditolak
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2">Foto Bukti Transfer</p>
                                <div className="rounded-xl overflow-hidden border border-slate-200/80 max-h-60 flex justify-center bg-slate-50">
                                    <img 
                                        src={`http://localhost:8000/storage/${viewingPayment.proof_image_path}`} 
                                        alt="Bukti Transfer" 
                                        className="object-contain max-h-60"
                                    />
                                </div>
                            </div>
                            <div className="pt-2">
                                <Button className="w-full" onClick={() => setViewingPayment(null)}>
                                    Tutup
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
