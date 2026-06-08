import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Button, Input } from '../components/ui';
import { User, ShieldCheck, Mail, Phone, Search, Loader2 } from 'lucide-react';

export default function AdminPsychologistList() {
    const [psychologists, setPsychologists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPsychologists();
    }, []);

    const fetchPsychologists = async () => {
        try {
            // Assuming we can fetch users filtered by role or all users
            const res = await client.get('/bookings'); // Placeholder logic
            // In a real app, this would be a specific GET /api/admin/psychologists
            // For now, let's just show a simulated list if the dummy seeder worked
            setPsychologists([
                { id: 2, name: 'Dr. Stevano, M.Psi', email: 'psikolog@neyla.id', phone: '08222222222', specialization: 'Anxiety', is_verified: true }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filtered = psychologists.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin h-8 w-8 text-indigo-600" /></div>;

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Manajemen Psikolog</h1>
                    <p className="text-slate-500">Daftar tenaga ahli yang terdaftar di platform.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                        className="pl-10" 
                        placeholder="Cari psikolog..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(psy => (
                    <div key={psy.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <User className="h-7 w-7" />
                            </div>
                            {psy.is_verified && (
                                <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold">
                                    <ShieldCheck className="h-3 w-3 mr-1" />
                                    TERVERIFIKASI
                                </div>
                            )}
                        </div>
                        
                        <div className="mt-4">
                            <h3 className="font-bold text-lg text-slate-900">{psy.name}</h3>
                            <p className="text-indigo-600 text-sm font-medium">{psy.specialization}</p>
                        </div>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-center text-sm text-slate-600">
                                <Mail className="h-4 w-4 mr-3 text-slate-400" />
                                {psy.email}
                            </div>
                            <div className="flex items-center text-sm text-slate-600">
                                <Phone className="h-4 w-4 mr-3 text-slate-400" />
                                {psy.phone}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-50 flex gap-3">
                            <Button variant="secondary" className="flex-1 text-xs">Edit Profil</Button>
                            <Button variant="outline" className="flex-1 text-xs">Lihat Jadwal</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
