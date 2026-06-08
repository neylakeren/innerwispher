import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import { 
    Calendar, 
    Clock, 
    CheckCircle2, 
    AlertCircle,
    TrendingUp,
    Users
} from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            </div>
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="h-6 w-6" />
            </div>
        </div>
    </div>
);

export default function Dashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        total: 0,
        confirmed: 0,
        pending: 0,
        completed: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        client.get('/bookings')
            .then(res => {
                const bookings = res.data;
                setStats({
                    total: bookings.length,
                    confirmed: bookings.filter(b => b.status === 'confirmed').length,
                    pending: bookings.filter(b => b.status === 'pending').length,
                    completed: bookings.filter(b => b.status === 'completed').length
                });
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="animate-pulse space-y-8">
        <div className="h-32 bg-slate-200 rounded-2xl w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="h-24 bg-slate-200 rounded-2xl" />)}
        </div>
    </div>;

    return (
        <div className="space-y-8">
            <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold">Halo, {user?.name}!</h1>
                    <p className="text-indigo-100 mt-2 text-lg">
                        {user?.role === 'psychologist' 
                            ? 'Anda memiliki beberapa sesi konsultasi yang dijadwalkan hari ini.'
                            : 'Pantau status pendaftaran dan sesi konseling Anda di sini.'}
                    </p>
                </div>
                <div className="absolute right-0 top-0 -mr-16 -mt-16 bg-white/10 h-64 w-64 rounded-full blur-3xl" />
                <div className="absolute left-0 bottom-0 -ml-16 -mb-16 bg-indigo-400/20 h-48 w-48 rounded-full blur-2xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Booking" 
                    value={stats.total} 
                    icon={Calendar} 
                    color="bg-indigo-50 text-indigo-600"
                />
                <StatCard 
                    title="Menunggu" 
                    value={stats.pending} 
                    icon={Clock} 
                    color="bg-amber-50 text-amber-600"
                />
                <StatCard 
                    title="Terkonfirmasi" 
                    value={stats.confirmed} 
                    icon={CheckCircle2} 
                    color="bg-emerald-50 text-emerald-600"
                />
                <StatCard 
                    title="Selesai" 
                    value={stats.completed} 
                    icon={TrendingUp} 
                    color="bg-blue-50 text-blue-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
                        <Users className="h-5 w-5 mr-3 text-indigo-600" />
                        Info Akun
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-slate-50">
                            <span className="text-slate-500">Nama</span>
                            <span className="font-medium text-slate-900">{user?.name}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-slate-50">
                            <span className="text-slate-500">Email</span>
                            <span className="font-medium text-slate-900">{user?.email}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-slate-50">
                            <span className="text-slate-500">Peran</span>
                            <span className="font-medium text-slate-900 capitalize">{user?.role}</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-slate-500">Status</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                Aktif
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="bg-slate-50 p-4 rounded-full mb-4">
                        <AlertCircle className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Pemberitahuan</h3>
                    <p className="text-slate-500 max-w-xs">
                        Belum ada pemberitahuan baru untuk Anda saat ini.
                    </p>
                </div>
            </div>
        </div>
    );
}
