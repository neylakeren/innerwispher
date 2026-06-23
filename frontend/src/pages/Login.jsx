import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/ui';
import { Heart, ArrowLeft } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
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
                    Selamat datang di MentalCare
                </h2>
                <p className="mt-2 text-center text-body-md text-on-surface-variant">
                    Masuk untuk melanjutkan sesi konseling Anda
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
                <div className="bg-surface-container-lowest py-8 px-6 shadow-sm sm:rounded-2xl sm:px-10 border border-outline-variant/30 ambient-shadow">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Alamat Email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@contoh.com"
                        />

                        <Input
                            label="Kata Sandi"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />

                        {error && (
                            <div className="text-caption text-error bg-error-container/20 p-3 rounded-lg border border-error-container/50 text-center">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full py-2.5 mt-2"
                            disabled={loading}
                        >
                            {loading ? 'Memproses...' : 'Masuk ke Akun'}
                        </Button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-outline-variant/50" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 bg-surface-container-lowest text-on-surface-variant text-label-md">
                                    Belum punya akun?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                to="/register"
                                className="font-semibold text-primary hover:text-surface-tint transition-colors text-label-md"
                            >
                                Daftar sekarang secara gratis
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
