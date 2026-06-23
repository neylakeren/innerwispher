import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/ui';
import { Heart, ArrowLeft } from 'lucide-react';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
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
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-jakarta">
            {/* Background Aesthetic Blur Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* Back to Home Link */}
            <div className="absolute top-6 left-6 z-20">
                <Link to="/" className="inline-flex items-center gap-2 text-label-md text-on-surface-variant hover:text-primary transition-colors">
                    <ArrowLeft size={16} />
                    Kembali ke Beranda
                </Link>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center">
                    <div className="bg-primary-container text-on-primary-container p-3 rounded-xl shadow-md">
                        <Heart className="h-8 w-8 text-primary" fill="currentColor" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface">
                    Daftar Akun Baru
                </h2>
                <p className="mt-2 text-center text-body-md text-on-surface-variant">
                    Bergabunglah dengan InnerWhisper untuk mendapatkan layanan konseling terbaik
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
                <div className="bg-surface-container-lowest py-8 px-6 shadow-sm sm:rounded-2xl sm:px-10 border border-outline-variant/30 ambient-shadow">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <Input
                            label="Nama Lengkap"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />

                        <Input
                            label="Alamat Email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="nama@contoh.com"
                        />

                        <Input
                            label="Nomor WhatsApp"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="081234567890"
                        />

                        <Input
                            label="Kata Sandi"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                        />

                        <Input
                            label="Konfirmasi Kata Sandi"
                            name="password_confirmation"
                            type="password"
                            required
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            placeholder="••••••••"
                        />

                        {error && (
                            <div className="text-caption text-error bg-error-container/20 p-3 rounded-lg border border-error-container/50 text-center">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full py-2.5 mt-4"
                            disabled={loading}
                        >
                            {loading ? 'Memproses...' : 'Buat Akun'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-label-md text-on-surface-variant">
                            Sudah punya akun?{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-primary hover:text-surface-tint transition-colors"
                            >
                                Masuk di sini
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
