import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/ui';
import { Heart } from 'lucide-react';

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
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
                        <Heart className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                    Daftar Akun Baru
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Bergabunglah dengan Neyla untuk mendapatkan layanan konseling terbaik
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-100">
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
                            <div className="text-sm text-rose-500 bg-rose-50 p-3 rounded-lg border border-rose-100">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full mt-2"
                            disabled={loading}
                        >
                            {loading ? 'Memproses...' : 'Buat Akun'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-500">
                            Sudah punya akun?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
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
