import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCareer } from '../context/CareerContext';
import { ZODIACS } from '../data/careerData';
import { Button, Input } from '../components/ui';
import { User, LogOut, CheckCircle2, Sparkles, GraduationCap } from 'lucide-react';
import LogoutModal from '../components/LogoutModal';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { careerState, updateCareerState, activeCareer, totalProgress } = useCareer();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    major: careerState.major || '',
    university: careerState.university || '',
    bio: careerState.bio || '',
    zodiac: careerState.zodiac || 'Aries',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const getInitials = (name) => {
    if (!name) return 'IW';
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(w => w[0])
      .join('')
      .toUpperCase();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateCareerState({
      major: formData.major,
      university: formData.university,
      bio: formData.bio,
      zodiac: formData.zodiac,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-quicksand pb-12">
      {/* Header Profile Summary */}
      <div className="card-s p-8 text-center space-y-4">
        {/* Avatar Initials with Glow */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#8f78d8] to-[#b9a6f0] text-white mx-auto flex items-center justify-center text-2xl font-extrabold shadow-btn ring-4 ring-[#efeafb]">
          {getInitials(formData.name)}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#2b2542]">{formData.name}</h1>
          <p className="text-xs sm:text-sm text-[#5d5577]">{formData.email}</p>
          {(formData.major || formData.university) && (
            <p className="text-xs text-[#8f78d8] font-semibold mt-1">
              {[formData.major, formData.university].filter(Boolean).join(' • ')}
            </p>
          )}
          {formData.bio && (
            <p className="text-xs text-[#5d5577] max-w-md mx-auto mt-2 italic">
              "{formData.bio}"
            </p>
          )}
        </div>

        {/* Status Chips */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#efeafb] text-[#4b3b86]">
            {formData.zodiac}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#efeafb] text-[#4b3b86]">
            {activeCareer ? activeCareer.n : 'Belum Ada Target Karier'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#8f78d8] text-white">
            Progres Karier {totalProgress}%
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#d1e7dd] text-[#198754] capitalize">
            Peran: {user?.role === 'patient' ? 'User' : (user?.role || 'User')}
          </span>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="card-s p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2">
          <User size={18} className="text-[#8f78d8]" />
          <h2 className="text-lg font-bold text-[#2b2542]">Edit Informasi Profil</h2>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Nama Lengkap"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            disabled
            className="bg-gray-50 cursor-not-allowed opacity-80"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Jurusan / Program Studi"
              name="major"
              value={formData.major}
              onChange={handleChange}
              placeholder="Contoh: Manajemen / Sistem Informasi"
            />

            <Input
              label="Universitas / Institusi"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="Contoh: Universitas Indonesia"
            />
          </div>

          <div className="space-y-1.5 w-full">
            <label className="text-sm font-semibold text-[#2b2542] block">
              Bio Singkat
            </label>
            <textarea
              name="bio"
              rows={2}
              maxLength={160}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tuliskan minat profesional atau moto hidupmu..."
              className="w-full p-3 rounded-xl border border-[#d9cff5] bg-white text-sm text-[#2b2542] focus:outline-none focus:border-[#8f78d8] focus:ring-2 focus:ring-[#8f78d8]/20 transition-all"
            />
          </div>

          <div className="space-y-1.5 w-full">
            <label className="text-sm font-semibold text-[#2b2542] block">
              Zodiak
            </label>
            <select
              name="zodiac"
              value={formData.zodiac}
              onChange={handleChange}
              className="flex h-11 w-full rounded-xl border border-[#d9cff5] bg-white px-3.5 py-2 text-sm text-[#2b2542] focus:outline-none focus:border-[#8f78d8]"
            >
              {ZODIACS.map(z => (
                <option key={z.name} value={z.name}>
                  {z.name} ({z.date})
                </option>
              ))}
            </select>
          </div>

          {savedSuccess && (
            <div className="text-xs text-success bg-[#d1e7dd] p-3 rounded-xl border border-success/30 text-center font-bold flex items-center justify-center gap-1.5">
              <CheckCircle2 size={15} />
              Profil berhasil disimpan!
            </div>
          )}

          <Button type="submit" variant="primary" size="md" className="w-full">
            Simpan Perubahan
          </Button>
        </form>

        <div className="pt-4 border-t border-[#d9cff5]/60">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full text-error hover:bg-error-container/30 border-error/40 flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut size={16} />
            Keluar dari Akun
          </Button>
        </div>
      </div>

      {/* Custom Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => !isLoggingOut && setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
        loading={isLoggingOut}
        userName={user?.name}
      />
    </div>
  );
}
