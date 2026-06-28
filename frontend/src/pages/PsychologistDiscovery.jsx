import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Button, Input } from '../components/ui';
import { User, ShieldCheck, Search, Loader2, Star, Calendar, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PsychologistDiscovery() {
    const navigate = useNavigate();
    const [psychologists, setPsychologists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Booking states
    const [bookingPsychologist, setBookingPsychologist] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        fetchPsychologists();
    }, []);

    const fetchPsychologists = async () => {
        try {
            const res = await client.get('/psychologists');
            setPsychologists(res.data);
        } catch (err) {
            console.error('Gagal mengambil data psikolog:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBooking = async (e) => {
        e.preventDefault();
        if (!bookingPsychologist || !bookingDate) return;

        setIsBooking(true);
        try {
            await client.post('/bookings', {
                psychologist_id: bookingPsychologist.id,
                date: bookingDate
            });
            setBookingPsychologist(null);
            setBookingDate('');
            navigate('/bookings');
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal membuat booking');
        } finally {
            setIsBooking(false);
        }
    };

    const filtered = psychologists.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get today's date formatted as YYYY-MM-DD for date picker input minimum
    const todayStr = new Date().toISOString().split('T')[0];

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

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
                                <div className="h-16 w-16 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary">
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
                                    {psy.is_verified && <ShieldCheck className="h-4 w-4 ml-2 text-primary fill-primary-container/30" />}
                                </div>
                                <p className="text-primary text-sm font-semibold">{psy.specialization}</p>
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
                            <Button 
                                className="w-full"
                                onClick={() => {
                                    setBookingPsychologist(psy);
                                    setBookingDate(todayStr);
                                }}
                            >
                                <Calendar className="h-4 w-4 mr-2" />
                                Jadwalkan Konseling
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Booking Modal */}
            {bookingPsychologist && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900">Jadwalkan Sesi Konseling</h3>
                            <button 
                                onClick={() => setBookingPsychologist(null)} 
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <XCircle className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
                                <User className="h-8 w-8" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{bookingPsychologist.name}</h4>
                                <p className="text-primary text-xs font-semibold">{bookingPsychologist.specialization}</p>
                                <p className="text-slate-800 text-sm font-bold mt-1">Rp {bookingPsychologist.price.toLocaleString('id-ID')}</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreateBooking} className="space-y-4">
                            <Input
                                label="Pilih Tanggal Sesi"
                                type="date"
                                required
                                min={todayStr}
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                            />
                            
                            <div className="flex space-x-3 mt-6">
                                <Button 
                                    type="button" 
                                    variant="ghost" 
                                    className="flex-1"
                                    onClick={() => setBookingPsychologist(null)}
                                >
                                    Batal
                                </Button>
                                <Button 
                                    type="submit" 
                                    className="flex-1"
                                    disabled={isBooking}
                                >
                                    {isBooking ? (
                                        <>
                                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                            Membuat...
                                        </>
                                    ) : 'Konfirmasi Booking'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
