import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Button } from '../components/ui';
import { 
    CheckCircle, 
    XCircle, 
    ExternalLink, 
    Loader2,
    DollarSign,
    Clock,
    User
} from 'lucide-react';

export default function AdminDashboard() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPendingPayments();
    }, []);

    const fetchPendingPayments = async () => {
        try {
            // This endpoint will need to be refined in backend to return pending payments
            const res = await client.get('/bookings'); 
            const pending = res.data.filter(b => b.payment && b.payment.status === 'pending');
            setPayments(pending);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (paymentId, status) => {
        try {
            // Simplified: In real app, we'd have a specific verification endpoint
            await client.post(`/admin/payments/${paymentId}/verify`, { status });
            fetchPendingPayments();
        } catch (err) {
            alert('Gagal memproses verifikasi');
        }
    };

    if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin h-8 w-8 text-indigo-600" /></div>;

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-slate-900">Panel Administrasi</h1>
                <p className="text-slate-500">Verifikasi pembayaran dan manajemen platform.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-sm text-slate-500 font-medium">Pending Verifikasi</p>
                    <p className="text-3xl font-bold text-slate-900 mt-2">{payments.length}</p>
                </div>
            </div>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="font-bold text-slate-900">Antrean Verifikasi Pembayaran</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">User / Pasien</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Jumlah</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Bukti</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {payments.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                                                <User className="h-4 w-4 text-slate-500" />
                                            </div>
                                            <div className="text-sm">
                                                <p className="font-medium text-slate-900">{booking.patient.name}</p>
                                                <p className="text-slate-500 text-xs">{booking.patient.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-slate-900">
                                            Rp {Number(booking.payment.amount).toLocaleString('id-ID')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <a 
                                            href={`http://localhost:8000/storage/${booking.payment.proof_image_path}`} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="inline-flex items-center text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                                        >
                                            <ExternalLink className="h-4 w-4 mr-1" />
                                            Lihat Gambar
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => handleVerify(booking.payment.id, 'rejected')}
                                        >
                                            <XCircle className="h-4 w-4 mr-1" /> Tolak
                                        </Button>
                                        <Button 
                                            variant="primary" 
                                            size="sm"
                                            onClick={() => handleVerify(booking.payment.id, 'verified')}
                                        >
                                            <CheckCircle className="h-4 w-4 mr-1" /> Verifikasi
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {payments.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                        Tidak ada pembayaran yang perlu diverifikasi.
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
