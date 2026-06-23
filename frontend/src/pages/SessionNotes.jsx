import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui';
import { ClipboardList, Calendar, User, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SessionNotes() {
    const { user } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            // Simplified logic: fetching all bookings to find completed/closed sessions
            // In a real app, you'd fetch /api/psychologist/sessions
            const res = await client.get('/bookings');
            const pastSessions = res.data.filter(b => b.status === 'completed' || (b.counseling_session && b.counseling_session.status === 'closed'));
            setSessions(pastSessions);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin h-8 w-8 text-[#ff9999]" /></div>;

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-slate-900">Catatan Sesi</h1>
                <p className="text-slate-500">Kelola dan review catatan dari sesi konseling yang telah selesai.</p>
            </header>

            <div className="grid grid-cols-1 gap-4">
                {sessions.map((booking) => (
                    <div key={booking.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-start space-x-4">
                            <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{booking.patient.name}</h3>
                                <div className="flex items-center text-sm text-slate-500 mt-1">
                                    <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                                    {new Date(booking.date).toLocaleDateString('id-ID', { dateStyle: 'long' })}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="text-sm px-3 py-1 bg-slate-100 text-slate-600 rounded-lg font-medium">
                                Selesai
                            </div>
                            <Button variant="outline" size="sm">
                                <ClipboardList className="h-4 w-4 mr-2" />
                                Tulis Catatan
                            </Button>
                        </div>
                    </div>
                ))}

                {sessions.length === 0 && (
                    <div className="bg-white p-12 rounded-2xl border border-slate-100 text-center">
                        <ClipboardList className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">Belum ada sesi yang selesai</h3>
                        <p className="text-slate-500 mt-1">Catatan sesi hanya dapat diisi setelah konsultasi berakhir.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
