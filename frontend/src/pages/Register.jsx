import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/ui';
import { ArrowLeft } from 'lucide-react';
import { ZODIACS } from '../data/careerData';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        zodiac: 'Aries',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await register(formData);
            // Save zodiac to user career state
            try {
                localStorage.setItem('iw_last_zodiac', formData.zodiac);
            } catch {}
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registrasi gagal. Pastikan data terisi dengan benar.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f4fd] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden font-quicksand">
            {/* Ambient Floating Blobs */}
            <div className="blobs">
                <i />
                <i />
                <i />
            </div>

            {/* Back to Home Link */}
            <div className="absolute top-6 left-6 z-20">
                <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#5d5577] hover:text-[#4b3b86] transition-colors">
                    <ArrowLeft size={16} />
                    Beranda
                </Link>
            </div>

            {/* Header Brand & Logo */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center px-4">
                <img 
                    src="/logo.png" 
                    alt="Logo Inner Whisper" 
                    className="w-28 h-auto mx-auto mb-2 drop-shadow-[0_8px_18px_rgba(143,120,216,0.35)] object-contain transition-transform hover:scale-105" 
                />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4b3b86] to-[#9a82e6] bg-clip-text text-transparent tracking-tight">
                    Inner Whisper
                </h2>
                <p className="mt-1 text-sm font-medium text-[#5d5577]">
                    Buat akunmu untuk memulai pemetaan karier & konseling
                </p>
            </div>

            {/* Glassmorphism Form Card */}
            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
                <div className="card-s p-6 sm:p-8">
                    <form className="space-y-3.5" onSubmit={handleSubmit}>
                        <Input
                            label="Nama Lengkap"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nama panggilan atau lengkap"
                            autoComplete="name"
                        />

                        <Input
                            label="Alamat Email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="nama@contoh.com"
                            autoComplete="email"
                        />

                        <Input
                            label="Nomor WhatsApp"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="081234567890"
                            autoComplete="tel"
                        />

                        <div className="space-y-1.5 w-full">
                            <label className="text-sm font-semibold text-[#2b2542] block">
                                Zodiak
                            </label>
                            <select
                                name="zodiac"
                                value={formData.zodiac}
                                onChange={handleChange}
                                className="flex h-11 w-full rounded-xl border border-[#d9cff5] bg-white/90 px-3.5 py-2 text-sm text-[#2b2542] focus:outline-none focus:border-[#8f78d8] focus:ring-2 focus:ring-[#8f78d8]/25 transition-all shadow-sm"
                            >
                                {ZODIACS.map((z) => (
                                    <option key={z.name} value={z.name}>
                                        {z.name} ({z.date})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label="Kata Sandi (min. 8 karakter)"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            autoComplete="new-password"
                        />

                        <Input
                            label="Konfirmasi Kata Sandi"
                            name="password_confirmation"
                            type="password"
                            required
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            placeholder="••••••••"
                            autoComplete="new-password"
                        />

                        {error && (
                            <div className="text-xs text-error bg-error-container/40 p-3 rounded-xl border border-error/30 text-center font-medium">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full py-3 mt-3 text-sm font-semibold"
                            disabled={loading}
                        >
                            {loading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang'}
                        </Button>
                    </form>

                    <div className="mt-5 pt-4 border-t border-[#d9cff5]/60 text-center text-xs text-[#5d5577]">
                        <p>
                            Sudah memiliki akun?{' '}
                            <Link to="/login" className="font-bold text-[#8f78d8] hover:text-[#4b3b86] transition-colors">
                                Masuk ke akun
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
