import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Input } from '../components/ui';
import { User, Mail, Phone, Calendar, Search, Loader2 } from 'lucide-react';

export default function AdminPatientList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            // Placeholder logic
            const res = await client.get('/bookings');
            // Mock data for display
            setPatients([
                { id: 3, name: 'Budi Pasien', email: 'pasien@neyla.id', phone: '08333333333', joined: '2026-06-08' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const filtered = patients.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.phone.includes(searchTerm)
    );

    if (loading) return <div className="flex justify-center py-12"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>;

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Manajemen Pasien</h1>
                    <p className="text-slate-500">Daftar pengguna terdaftar di platform.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                        className="pl-10" 
                        placeholder="Cari pasien..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-slate-100">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pasien</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Kontak</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tgl Bergabung</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filtered.map(patient => (
                            <tr key={patient.id} className="hover:bg-slate-50/50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-slate-900">{patient.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-600 space-y-1">
                                        <div className="flex items-center">
                                            <Mail className="h-3 w-3 mr-2 text-slate-400" />
                                            {patient.email}
                                        </div>
                                        <div className="flex items-center">
                                            <Phone className="h-3 w-3 mr-2 text-slate-400" />
                                            {patient.phone}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-slate-600 flex items-center">
                                        <Calendar className="h-3 w-3 mr-2 text-slate-400" />
                                        {new Date(patient.joined).toLocaleDateString('id-ID', { dateStyle: 'medium' })}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <button className="text-primary hover:text-surface-tint font-medium">Detail</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
