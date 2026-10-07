import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Button, Input } from '../components/ui';
import { 
    User, 
    ShieldCheck, 
    Mail, 
    Phone, 
    Search, 
    Loader2, 
    UserPlus, 
    Edit3, 
    Trash2, 
    AlertCircle, 
    CheckCircle2, 
    X, 
    Award,
    DollarSign,
    FileText
} from 'lucide-react';

export default function AdminPsychologistList() {
    const [psychologists, setPsychologists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modals
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingPsychologist, setEditingPsychologist] = useState(null);
    const [deletingPsychologist, setDeletingPsychologist] = useState(null);

    // Form state
    const initialForm = {
        name: '',
        email: '',
        phone: '',
        password: '',
        specialization: '',
        price: '150000',
        license_no: '',
        bio: '',
        is_verified: true,
    };
    const [formData, setFormData] = useState(initialForm);
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchPsychologists();
    }, []);

    const fetchPsychologists = async () => {
        try {
            setLoading(true);
            const res = await client.get('/admin/psychologists');
            setPsychologists(res.data);
        } catch (err) {
            console.error('Failed to fetch psychologists:', err);
        } finally {
            setLoading(false);
        }
    };

    const showSuccess = (msg) => {
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    const handleOpenAdd = () => {
        setFormData(initialForm);
        setFormError('');
        setIsAddOpen(true);
    };

    const handleOpenEdit = (psy) => {
        setFormData({
            name: psy.name || '',
            email: psy.email || '',
            phone: psy.phone === '-' ? '' : psy.phone,
            password: '', // Blank unless changing
            specialization: psy.specialization || '',
            price: psy.price || 150000,
            license_no: psy.license_no === '-' ? '' : psy.license_no,
            bio: psy.bio || '',
            is_verified: Boolean(psy.is_verified),
        });
        setFormError('');
        setEditingPsychologist(psy);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormLoading(true);

        try {
            if (editingPsychologist) {
                // Update
                const payload = {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    specialization: formData.specialization,
                    price: formData.price,
                    license_no: formData.license_no,
                    bio: formData.bio,
                    is_verified: formData.is_verified,
                };
                if (formData.password) {
                    payload.password = formData.password;
                }
                await client.put(`/admin/psychologists/${editingPsychologist.id}`, payload);
                showSuccess(`Data psikolog ${formData.name} berhasil diperbarui.`);
                setEditingPsychologist(null);
            } else {
                // Create
                await client.post('/admin/psychologists', formData);
                showSuccess(`Psikolog baru ${formData.name} berhasil ditambahkan.`);
                setIsAddOpen(false);
            }
            await fetchPsychologists();
        } catch (err) {
            const msg = err.response?.data?.message || 'Terjadi kesalahan saat menyimpan data.';
            setFormError(msg);
        } finally {
            setFormLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingPsychologist) return;
        setFormLoading(true);
        try {
            await client.delete(`/admin/psychologists/${deletingPsychologist.id}`);
            showSuccess(`Psikolog ${deletingPsychologist.name} berhasil dihapus.`);
            setDeletingPsychologist(null);
            await fetchPsychologists();
        } catch (err) {
            alert(err.response?.data?.message || 'Gagal menghapus psikolog');
        } finally {
            setFormLoading(false);
        }
    };

    const filtered = psychologists.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone?.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-[#2b2542]">Manajemen Psikolog</h1>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#efeafb] text-[#4b3b86] border border-[#d9cff5]">
                            {psychologists.length} Terdaftar
                        </span>
                    </div>
                    <p className="text-[#5d5577] text-sm mt-1">Kelola data tenaga ahli, spesialisasi, dan tarif konseling platform.</p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8a82a2]" />
                        <Input 
                            className="pl-10" 
                            placeholder="Cari nama, spesialisasi..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button 
                        onClick={handleOpenAdd}
                        className="flex items-center gap-2 whitespace-nowrap"
                    >
                        <UserPlus className="h-4 w-4" />
                        Tambah Psikolog
                    </Button>
                </div>
            </header>

            {/* Success Toast / Alert */}
            {successMessage && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium animate-fadeIn">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span>{successMessage}</span>
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="animate-spin h-9 w-9 text-primary mb-3" />
                    <p className="text-sm text-[#5d5577]">Memuat data psikolog...</p>
                </div>
            ) : filtered.length === 0 ? (
                /* Empty state */
                <div className="bg-white rounded-2xl border border-[#d9cff5] p-12 text-center max-w-md mx-auto my-8">
                    <div className="h-16 w-16 rounded-2xl bg-[#efeafb] text-[#4b3b86] flex items-center justify-center mx-auto mb-4">
                        <User className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-[#2b2542] mb-1">
                        {searchTerm ? 'Tidak ada hasil pencarian' : 'Belum Ada Psikolog'}
                    </h3>
                    <p className="text-sm text-[#5d5577] mb-6">
                        {searchTerm 
                            ? `Tidak ditemukan psikolog dengan kata kunci "${searchTerm}".`
                            : 'Mulai dengan menambahkan psikolog pertama ke dalam sistem.'}
                    </p>
                    {!searchTerm && (
                        <Button onClick={handleOpenAdd} className="inline-flex items-center gap-2">
                            <UserPlus className="h-4 w-4" />
                            Tambah Psikolog Sekarang
                        </Button>
                    )}
                </div>
            ) : (
                /* Psychologist Cards Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map(psy => (
                        <div key={psy.id} className="bg-white p-6 rounded-2xl border border-[#d9cff5]/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-start justify-between">
                                    <div className="h-12 w-12 rounded-2xl bg-[#efeafb] flex items-center justify-center text-[#4b3b86] font-bold text-lg">
                                        {psy.name?.charAt(0) || 'P'}
                                    </div>
                                    {psy.is_verified ? (
                                        <div className="flex items-center text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg text-xs font-bold">
                                            <ShieldCheck className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                                            TERVERIFIKASI
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-amber-700 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg text-xs font-bold">
                                            MENUNGGU
                                        </div>
                                    )}
                                </div>
                                
                                <div className="mt-4">
                                    <h3 className="font-bold text-base text-[#2b2542] leading-snug">{psy.name}</h3>
                                    <p className="text-[#8f78d8] text-xs font-semibold mt-0.5">{psy.specialization}</p>
                                </div>

                                {psy.bio && (
                                    <p className="text-xs text-[#5d5577] mt-3 line-clamp-2 leading-relaxed bg-[#efeafb]/30 p-2.5 rounded-xl">
                                        {psy.bio}
                                    </p>
                                )}

                                <div className="mt-4 space-y-2 text-xs text-[#5d5577]">
                                    <div className="flex items-center">
                                        <Mail className="h-3.5 w-3.5 mr-2.5 text-[#8a82a2]" />
                                        <span className="truncate">{psy.email}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="h-3.5 w-3.5 mr-2.5 text-[#8a82a2]" />
                                        <span>{psy.phone || '-'}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Award className="h-3.5 w-3.5 mr-2.5 text-[#8a82a2]" />
                                        <span>SIP: {psy.license_no || '-'}</span>
                                    </div>
                                    <div className="flex items-center font-bold text-[#4b3b86]">
                                        <DollarSign className="h-3.5 w-3.5 mr-2.5 text-[#8f78d8]" />
                                        <span>Rp {Number(psy.price || 0).toLocaleString('id-ID')} / sesi</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                                <Button 
                                    variant="secondary" 
                                    size="sm"
                                    onClick={() => handleOpenEdit(psy)}
                                    className="flex-1 text-xs flex items-center justify-center gap-1.5"
                                >
                                    <Edit3 className="h-3.5 w-3.5" />
                                    Edit Profil
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setDeletingPsychologist(psy)}
                                    aria-label={`Hapus ${psy.name}`}
                                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ADD / EDIT MODAL */}
            {(isAddOpen || editingPsychologist) && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b2542]/50 backdrop-blur-sm overflow-y-auto"
                >
                    <div 
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#d9cff5] p-6 sm:p-7 my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-[#efeafb] text-[#4b3b86] flex items-center justify-center">
                                    {editingPsychologist ? <Edit3 className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-[#2b2542]">
                                        {editingPsychologist ? 'Edit Data Psikolog' : 'Tambah Psikolog Baru'}
                                    </h3>
                                    <p className="text-xs text-[#5d5577]">
                                        {editingPsychologist ? 'Perbarui informasi profil dan tarif psikolog' : 'Masukkan informasi akun dan lisensi psikolog'}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsAddOpen(false);
                                    setEditingPsychologist(null);
                                }}
                                disabled={formLoading}
                                className="p-1.5 text-[#5d5577] hover:text-[#2b2542] hover:bg-[#efeafb] rounded-xl transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {formError && (
                            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                <span>{formError}</span>
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                    Nama Lengkap & Gelar *
                                </label>
                                <Input 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Contoh: Dr. Dian Sastro, M.Psi., Psikolog"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                        Email Akun *
                                    </label>
                                    <Input 
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="nama@neyla.id"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                        No. WhatsApp / HP
                                    </label>
                                    <Input 
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="08123456789"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                    {editingPsychologist ? 'Password Baru (Kosongkan jika tidak diubah)' : 'Password Akun *'}
                                </label>
                                <Input 
                                    type="password"
                                    required={!editingPsychologist}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder={editingPsychologist ? 'Biarkan kosong untuk mempertahankan password' : 'Min. 6 karakter'}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                        Spesialisasi Konseling *
                                    </label>
                                    <Input 
                                        required
                                        value={formData.specialization}
                                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                        placeholder="Contoh: Depresi & Kecemasan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                        Tarif per Sesi (Rp) *
                                    </label>
                                    <Input 
                                        type="number"
                                        min="0"
                                        step="5000"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="150000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                    No. Surat Izin Praktik (SIP)
                                </label>
                                <Input 
                                    value={formData.license_no}
                                    onChange={(e) => setFormData({ ...formData, license_no: e.target.value })}
                                    placeholder="Contoh: SIP-12345-2026"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#2b2542] mb-1.5">
                                    Bio & Pengalaman Singkat
                                </label>
                                <textarea
                                    rows="2"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Tuliskan pengalaman klinis, pendekatan terapi, atau latar belakang keahlian..."
                                    className="w-full rounded-xl border border-[#d9cff5] p-3 text-xs sm:text-sm text-[#2b2542] focus:outline-none focus:border-[#8f78d8] focus:ring-2 focus:ring-[#8f78d8]/20 transition-all resize-none shadow-sm"
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <input 
                                    type="checkbox"
                                    id="is_verified"
                                    checked={formData.is_verified}
                                    onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="is_verified" className="text-xs font-semibold text-[#2b2542] cursor-pointer">
                                    Tandai Sebagai Psikolog Terverifikasi (Dapat Melayani Pasien)
                                </label>
                            </div>

                            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsAddOpen(false);
                                        setEditingPsychologist(null);
                                    }}
                                    disabled={formLoading}
                                    className="flex-1 text-xs"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={formLoading}
                                    className="flex-1 text-xs flex items-center justify-center gap-2"
                                >
                                    {formLoading && <Loader2 className="animate-spin h-4 w-4" />}
                                    {editingPsychologist ? 'Simpan Perubahan' : 'Tambah Psikolog'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {deletingPsychologist && (
                <div 
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2b2542]/50 backdrop-blur-sm"
                    onClick={() => !formLoading && setDeletingPsychologist(null)}
                >
                    <div 
                        className="relative w-full max-w-sm p-6 sm:p-7 bg-white rounded-2xl shadow-2xl border border-[#d9cff5] text-center flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={() => setDeletingPsychologist(null)}
                            disabled={formLoading}
                            className="absolute top-4 right-4 p-1.5 text-[#5d5577] hover:text-[#2b2542] hover:bg-[#efeafb] rounded-xl transition-colors"
                        >
                            <X size={18} />
                        </button>

                        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 ring-8 ring-rose-50/60 shadow-sm">
                            <Trash2 size={26} />
                        </div>

                        <h3 className="text-lg font-bold text-[#2b2542] mb-1.5">
                            Hapus Psikolog?
                        </h3>
                        <p className="text-xs sm:text-sm text-[#5d5577] mb-6 leading-relaxed">
                            Apakah Anda yakin ingin menghapus <span className="font-semibold text-[#2b2542]">{deletingPsychologist.name}</span> dari daftar tenaga ahli? Tindakan ini tidak dapat dibatalkan.
                        </p>

                        <div className="flex items-center gap-3 w-full">
                            <button
                                type="button"
                                onClick={() => setDeletingPsychologist(null)}
                                disabled={formLoading}
                                className="flex-1 py-2.5 px-4 rounded-xl border border-[#d9cff5] text-xs sm:text-sm font-semibold text-[#5d5577] hover:bg-[#efeafb] hover:text-[#4b3b86] transition-all disabled:opacity-50"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={formLoading}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-70"
                            >
                                {formLoading ? (
                                    <>
                                        <Loader2 size={15} className="animate-spin" />
                                        <span>Menghapus...</span>
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={15} />
                                        <span>Ya, Hapus</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
