import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Input } from '../components/ui';
import { User, Mail, Phone, Calendar, Search, Loader2, Users } from 'lucide-react';

export default function AdminPatientList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const res = await client.get('/admin/patients');
            setPatients(res.data);
        } catch (err) {
            console.error('Failed to fetch patients:', err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = patients.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone?.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[#2b2542]">Manajemen User</h1>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5]">
                            {patients.length} User
                        </span>
                    </div>
                    <p className="text-[#5d5577] text-sm mt-1">Daftar user yang terdaftar di platform Inner Whisper.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a82a2]" />
                    <Input 
                        className="pl-10" 
                        placeholder="Cari user / telepon..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="animate-spin h-9 w-9 text-primary mb-3" />
                    <p className="text-sm text-[#5d5577]">Memuat data user...</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-[#d9cff5]/80 shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-[#efeafb]/40">
                            <tr>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">User</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Kontak</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Tgl Bergabung</th>
                                <th className="px-6 py-3.5 text-right text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map(patient => (
                                <tr key={patient.id} className="hover:bg-slate-50/60 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-9 w-9 rounded-full bg-[#efeafb] text-[#4b3b86] flex items-center justify-center font-bold text-xs">
                                                {patient.name?.charAt(0) || 'P'}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-semibold text-[#2b2542]">{patient.name}</p>
                                                <p className="text-xs text-[#5d5577]">ID #{patient.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-xs text-[#5d5577] space-y-1">
                                            <div className="flex items-center">
                                                <Mail className="h-3.5 w-3.5 mr-2 text-[#8a82a2]" />
                                                <span className="text-[#2b2542]">{patient.email}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="h-3.5 w-3.5 mr-2 text-[#8a82a2]" />
                                                <span>{patient.phone || '-'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-xs text-[#5d5577] flex items-center">
                                            <Calendar className="h-3.5 w-3.5 mr-2 text-[#8a82a2]" />
                                            {patient.joined || '-'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                            Aktif
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-[#5d5577]">
                                        <div className="flex flex-col items-center justify-center">
                                            <Users className="h-8 w-8 text-[#8a82a2] mb-2" />
                                            <p className="font-semibold text-[#2b2542] text-sm">Tidak ada data user</p>
                                            <p className="text-xs text-[#5d5577] mt-0.5">
                                                {searchTerm ? `Tidak ada hasil pencarian untuk "${searchTerm}"` : 'Belum ada user terdaftar di platform.'}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
