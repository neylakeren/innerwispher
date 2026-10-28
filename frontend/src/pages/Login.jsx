import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/ui';
import { ArrowLeft, Sparkles, KeyRound } from 'lucide-react';

export default function Login() {
    const [mode, setMode] = useState('login'); // 'login' or 'forgot'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');
        
        if (mode === 'forgot') {
            setTimeout(() => {
                setLoading(false);
                setSuccessMessage('Tautan pemulihan password telah dikirim ke email Anda.');
            }, 800);
            return;
        }

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Email atau password salah.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f4fd] flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden font-quicksand">
            {/* Ambient Floating Blobs from Inner Whisper */}
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
                    className="w-32 h-auto mx-auto mb-3 drop-shadow-[0_8px_18px_rgba(143,120,216,0.35)] object-contain transition-transform hover:scale-105" 
                />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#4b3b86] to-[#9a82e6] bg-clip-text text-transparent tracking-tight">
                    Inner Whisper
                </h2>
                <p className="mt-1 text-sm font-medium text-[#5d5577]">
                    {mode === 'login' ? 'Selamat datang kembali di ruang ketenanganmu' : 'Atur ulang kata sandi akunmu'}
                </p>
            </div>

            {/* Glassmorphism Form Card */}
            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
                <div className="card-s p-6 sm:p-8">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nama@contoh.com"
                            autoComplete="email"
                        />

                        {mode === 'login' ? (
                            <>
                                <Input
                                    label="Password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />

                                <div className="flex items-center justify-between text-xs">
                                    <label className="flex items-center gap-2 text-[#5d5577] cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={rememberMe} 
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="rounded border-[#d9cff5] text-[#8f78d8] focus:ring-[#8f78d8]" 
                                        />
                                        <span>Ingat saya</span>
                                    </label>
                                    <button 
                                        type="button" 
                                        onClick={() => { setMode('forgot'); setError(''); setSuccessMessage(''); }}
                                        className="text-[#8f78d8] hover:text-[#4b3b86] font-semibold"
                                    >
                                        Lupa password?
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-xs text-[#5d5577] bg-[#efeafb] p-3 rounded-xl border border-[#d9cff5]">
                                Masukkan alamat email yang terdaftar untuk menerima instruksi pemulihan.
                            </div>
                        )}

                        {error && (
                            <div className="text-xs text-error bg-error-container/40 p-3 rounded-xl border border-error/30 text-center font-medium">
                                {error}
                            </div>
                        )}

                        {successMessage && (
                            <div className="text-xs text-success bg-[#d1e7dd] p-3 rounded-xl border border-success/30 text-center font-medium">
                                {successMessage}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full py-3 mt-2 text-sm font-semibold"
                            disabled={loading}
                        >
                            {loading ? 'Memproses...' : mode === 'login' ? 'Masuk' : 'Kirim Tautan Pemulihan'}
                        </Button>
                    </form>

                    {/* Quick Fill Test Accounts */}
                    {mode === 'login' && (
                        <div className="mt-5 p-3.5 rounded-2xl bg-[#efeafb]/70 border border-[#d9cff5] space-y-2.5">
                            <div className="flex items-center justify-between">
                                <p className="text-[11px] font-extrabold text-[#4b3b86] uppercase tracking-wider">
                                    Pilih Akun Demo Cepat:
                                </p>
                                <span className="text-[10px] text-[#5d5577] font-semibold">Password: password</span>
                            </div>

                            <div className="space-y-2">
                                {/* 1. Belum Berlangganan (Free Tier) */}
                                <div>
                                    <span className="text-[10px] font-bold text-[#5d5577] block mb-1">
                                        1. Belum Berlangganan (Fitur Terkunci):
                                    </span>
                                    <div className="grid grid-cols-2 gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEmail('user@neyla.id');
                                                setPassword('password');
                                            }}
                                            className="px-2.5 py-1.5 rounded-lg bg-white border border-[#d9cff5] text-[11px] font-semibold text-[#2b2542] hover:bg-[#8f78d8] hover:text-white transition-all text-left shadow-sm truncate"
                                        >
                                            Budi (user@neyla.id)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEmail('rara@neyla.id');
                                                setPassword('password');
                                            }}
                                            className="px-2.5 py-1.5 rounded-lg bg-white border border-[#d9cff5] text-[11px] font-semibold text-[#2b2542] hover:bg-[#8f78d8] hover:text-white transition-all text-left shadow-sm truncate"
                                        >
                                            Rara (rara@neyla.id)
                                        </button>
                                    </div>
                                </div>

                                {/* 2. Menunggu Verifikasi Struk Admin (Pending) */}
                                <div>
                                    <span className="text-[10px] font-bold text-amber-800 block mb-1">
                                        2. Menunggu Verifikasi Struk Admin (Pending):
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEmail('dimas@neyla.id');
                                            setPassword('password');
                                        }}
                                        className="w-full px-2.5 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-900 hover:bg-amber-600 hover:text-white transition-all text-left shadow-sm flex items-center justify-between"
                                    >
                                        <span>Dimas (dimas@neyla.id)</span>
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">BCA Pending</span>
                                    </button>
                                </div>

                                {/* 3. Sudah Berlangganan (PRO Member Aktif) */}
                                <div>
                                    <span className="text-[10px] font-bold text-emerald-800 block mb-1">
                                        3. Sudah Berlangganan (Semua Fitur Terbuka):
                                    </span>
                                    <div className="grid grid-cols-2 gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEmail('sarah@neyla.id');
                                                setPassword('password');
                                            }}
                                            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-900 hover:bg-emerald-600 hover:text-white transition-all text-left shadow-sm flex items-center justify-between"
                                        >
                                            <span className="truncate">Sarah (PRO)</span>
                                            <span className="text-[9px] font-bold px-1 rounded bg-emerald-200 text-emerald-900 shrink-0">SeaBank</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEmail('kevin@neyla.id');
                                                setPassword('password');
                                            }}
                                            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-900 hover:bg-emerald-600 hover:text-white transition-all text-left shadow-sm flex items-center justify-between"
                                        >
                                            <span className="truncate">Kevin (PRO)</span>
                                            <span className="text-[9px] font-bold px-1 rounded bg-emerald-200 text-emerald-900 shrink-0">BCA</span>
                                        </button>
                                    </div>
                                </div>

                                {/* 4. Admin Panel */}
                                <div>
                                    <span className="text-[10px] font-bold text-[#4b3b86] block mb-1">
                                        4. Panel Verifikasi Struk Admin:
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEmail('admin@neyla.id');
                                            setPassword('password');
                                        }}
                                        className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#8f78d8] text-[11px] font-bold text-[#4b3b86] hover:bg-[#8f78d8] hover:text-white transition-all text-center shadow-sm"
                                    >
                                        Super Admin (admin@neyla.id)
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 pt-5 border-t border-[#d9cff5]/60 text-center text-xs text-[#5d5577]">
                        {mode === 'login' ? (
                            <p>
                                Belum punya akun?{' '}
                                <Link to="/register" className="font-bold text-[#8f78d8] hover:text-[#4b3b86] transition-colors">
                                    Daftar sekarang
                                </Link>
                            </p>
                        ) : (
                            <button
                                type="button"
                                onClick={() => { setMode('login'); setError(''); setSuccessMessage(''); }}
                                className="font-bold text-[#8f78d8] hover:text-[#4b3b86] transition-colors"
                            >
                                Kembali ke halaman masuk
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
