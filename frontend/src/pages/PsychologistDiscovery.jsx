import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Button, Input } from '../components/ui';
import { User, ShieldCheck, Search, Loader2, Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PsychologistDiscovery() {
    const [psychologists, setPsychologists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPsychologists();
    }, []);

    const fetchPsychologists = async () => {
        try {
            // Mock data for discovery
            setPsychologists([
                { 
                    id: 2, 
                    name: 'Dr. Stevano, M.Psi', 
                    specialization: 'Anxiety & Self-Growth', 
                    bio: 'Spesialis kecemasan dan pengembangan diri dengan pengalaman lebih dari 10 tahun.',
                    price: 150000,
                    rating: 4.9,
                    reviews: 124,
                    is_verified: true 
                }
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
                    <h1 className="text-2xl font-bold text-slate-900">Cari Psikolog</h1>
                    <p className="text-slate-500">Temukan tenaga ahli yang tepat untuk kesehatan mental Anda.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                        className="pl-10" 
                        placeholder="Nama atau spesialisasi..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(psy => (
                    <div key={psy.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-16 w-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <User className="h-10 w-10" />
                                </div>
                                <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-1 rounded-lg text-xs font-bold">
                                    <Star className="h-3 w-3 mr-1 fill-amber-500" />
                                    {psy.rating}
                                </div>
                            </div>
                            
                            <div>
                                <div className="flex items-center">
                                    <h3 className="font-bold text-lg text-slate-900">{psy.name}</h3>
                                    {psy.is_verified && <ShieldCheck className="h-4 w-4 ml-2 text-indigo-600 fill-indigo-50" />}
                                </div>
                                <p className="text-indigo-600 text-sm font-semibold">{psy.specialization}</p>
                            </div>

                            <p className="mt-4 text-slate-600 text-sm line-clamp-2 leading-relaxed">
                                {psy.bio}
                            </p>

                            <div className="mt-6 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Biaya Sesi</p>
                                    <p className="text-lg font-bold text-slate-900">Rp {psy.price.toLocaleString('id-ID')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Review</p>
                                    <p className="text-sm font-bold text-slate-700">{psy.reviews} Pasien</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 border-t border-slate-100">
                            <Button className="w-full">
                                <Calendar className="h-4 w-4 mr-2" />
                                Jadwalkan Konseling
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
