import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui';
import { 
    Calendar, 
    Clock, 
    Users, 
    MessageSquare,
    ClipboardList,
    Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PsychologistDashboard() {
    const { user } = useAuth();
    const [schedules, setSchedules] = useState([]);
    const [activeBookings, setActiveBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPsychologistData();
    }, []);

    const fetchPsychologistData = async () => {
        try {
            const bookingsRes = await client.get('/bookings');
            setActiveBookings(bookingsRes.data.filter(b => b.status === 'paid' || b.status === 'confirmed'));
            
            // Assuming endpoint for schedules exists or fetch via user
            const schedulesRes = await client.get('/user'); // Or specific endpoint
            setSchedules(user?.schedules || []);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Psikolog</h1>
                <p className="text-slate-500">Kelola jadwal praktik dan sesi konseling Anda.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Active Sessions */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="font-bold text-slate-900 flex items-center">
                                <Users className="h-5 w-5 mr-3 text-indigo-600" />
                                Sesi Aktif / Mendatang
                            </h2>
                            <Link to="/bookings" className="text-sm text-indigo-600 font-medium hover:underline">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {activeBookings.map((booking) => (
                                <div key={booking.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                            <User className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{booking.patient.name}</p>
                                            <div className="flex items-center text-xs text-slate-500 mt-1">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {new Date(booking.date).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        {booking.counseling_session && (
                                            <Link to={`/sessions/${booking.counseling_session.id}`}>
                                                <Button size="sm" variant="outline">
                                                    <MessageSquare className="h-4 w-4 mr-2" />
                                                    Masuk Chat
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {activeBookings.length === 0 && (
                                <div className="p-12 text-center text-slate-500">
                                    <ClipboardList className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                                    <p>Tidak ada sesi aktif saat ini.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right: Schedule management summary */}
                <div className="space-y-6">
                    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="font-bold text-slate-900 flex items-center">
                                <Clock className="h-5 w-5 mr-3 text-indigo-600" />
                                Jadwal Praktik
                            </h2>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-6 space-y-4">
                            {user?.schedules?.map((s) => (
                                <div key={s.id} className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-slate-700">
                                        {['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][s.day_of_week]}
                                    </span>
                                    <span className="text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                        {s.start_time.slice(0, 5)} - {s.end_time.slice(0, 5)}
                                    </span>
                                </div>
                            ))}
                            {!user?.schedules?.length && (
                                <p className="text-xs text-slate-400 text-center py-4 italic">
                                    Belum mengatur jadwal rutin.
                                </p>
                            )}
                            <Button variant="secondary" className="w-full text-xs" size="sm">
                                Kelola Jadwal
                            </Button>
                        </div>
                    </section>

                    <section className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-100">
                        <h3 className="font-bold flex items-center">
                            <ClipboardList className="h-5 w-5 mr-2" />
                            Tips Hari Ini
                        </h3>
                        <p className="text-indigo-100 text-xs mt-3 leading-relaxed">
                            Jangan lupa untuk mengisi catatan sesi segera setelah konsultasi berakhir untuk menjaga akurasi diagnosa pasien.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
