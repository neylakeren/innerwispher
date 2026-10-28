import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  MessageSquareQuote, 
  CheckCircle2, 
  Sparkles, 
  Upload, 
  X, 
  Search, 
  Award,
  Loader2,
  AlertCircle,
  ThumbsUp,
  User
} from 'lucide-react';
import api from '../api/client';
import { Button } from '../components/ui';

export default function AdminReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'inactive'
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [notification, setNotification] = useState(null);

  // Form Fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [outcome, setOutcome] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/reviews');
      if (res.data?.success) {
        setReviews(res.data.reviews || []);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
      showNotification('Gagal memuat data review pelanggan.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const openCreateModal = () => {
    setEditingReview(null);
    setName('');
    setRole('');
    setOutcome('');
    setRating(5);
    setReviewText('');
    setIsActive(true);
    setAvatarFile(null);
    setAvatarPreview(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (rev) => {
    setEditingReview(rev);
    setName(rev.name || '');
    setRole(rev.role || '');
    setOutcome(rev.outcome || '');
    setRating(rev.rating || 5);
    setReviewText(rev.review || '');
    setIsActive(rev.is_active ?? true);
    setAvatarFile(null);
    setAvatarPreview(rev.avatar_url || null);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 3 * 1024 * 1024) {
      setFormError('Ukuran foto avatar maksimal 3 MB.');
      return;
    }

    setFormError('');
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Nama pelanggan wajib diisi.');
      return;
    }
    if (!reviewText.trim()) {
      setFormError('Isi testimoni / review wajib diisi.');
      return;
    }

    try {
      setSubmitting(true);
      setFormError('');

      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('role', role.trim());
      formData.append('outcome', outcome.trim());
      formData.append('rating', rating);
      formData.append('review', reviewText.trim());
      formData.append('is_active', isActive ? '1' : '0');

      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      if (editingReview) {
        await api.post(`/admin/reviews/${editingReview.id}`, formData);
        showNotification('Review pelanggan berhasil diperbarui!');
      } else {
        await api.post('/admin/reviews', formData);
        showNotification('Review pelanggan baru berhasil diunggah!');
      }

      setIsModalOpen(false);
      fetchReviews();
    } catch (err) {
      console.error('Error saving review:', err);
      setFormError(err.response?.data?.message || 'Gagal menyimpan review. Pastikan form terisi dengan benar.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await api.patch(`/admin/reviews/${id}/toggle`);
      if (res.data?.success) {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, is_active: res.data.is_active } : r));
        showNotification(res.data.is_active ? 'Review kini ditampilkan di halaman web.' : 'Review disembunyikan dari halaman web.');
      }
    } catch (err) {
      console.error('Failed to toggle review:', err);
      showNotification('Gagal mengubah status review.', 'error');
    }
  };

  const handleDelete = async (id, revName) => {
    if (!window.confirm(`Yakin ingin menghapus review dari "${revName}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      await api.delete(`/admin/reviews/${id}`);
      setReviews(prev => prev.filter(r => r.id !== id));
      showNotification('Review berhasil dihapus.');
    } catch (err) {
      console.error('Failed to delete review:', err);
      showNotification('Gagal menghapus review.', 'error');
    }
  };

  // Filtered reviews
  const filteredReviews = reviews.filter(rev => {
    const matchesSearch = 
      (rev.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rev.role || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rev.outcome || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rev.review || '').toLowerCase().includes(searchQuery.toLowerCase());

    if (statusFilter === 'active') return matchesSearch && rev.is_active;
    if (statusFilter === 'inactive') return matchesSearch && !rev.is_active;
    return matchesSearch;
  });

  const totalReviews = reviews.length;
  const activeReviews = reviews.filter(r => r.is_active).length;
  const avgRating = totalReviews > 0 ? (reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1) : '5.0';

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto font-quicksand">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded-2xl shadow-lg border flex items-center gap-3 animate-fade-in ${
          notification.type === 'error'
            ? 'bg-rose-50 border-rose-200 text-rose-800'
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          <CheckCircle2 size={18} className="shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{notification.message}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#d9cff5]/60">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-bold mb-2">
            <Sparkles size={13} className="text-[#8f78d8]" />
            <span>Manajemen Konten Publik</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#2b2542] tracking-tight">
            Kelola Review &amp; Testimoni Pelanggan
          </h1>
          <p className="text-xs sm:text-sm text-[#5d5577] mt-0.5">
            Unggah dan atur testimoni kepuasan pelanggan yang tampil di Landing Page &amp; Halaman Review Inner Whisper.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="btn-lv text-xs sm:text-sm px-4 py-2.5 rounded-xl text-white font-bold inline-flex items-center gap-2 shadow-btn active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Tambah Review Pelanggan</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-s p-4 sm:p-5 bg-white border border-[#d9cff5] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#5d5577]">Total Review Tersimpan</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#4b3b86] mt-1">{totalReviews}</h3>
            <p className="text-[11px] text-[#8a82a2] mt-0.5">Seluruh testimoni masuk</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center">
            <MessageSquareQuote size={24} />
          </div>
        </div>

        <div className="card-s p-4 sm:p-5 bg-white border border-[#d9cff5] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#5d5577]">Tampil di Halaman Web</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">{activeReviews}</h3>
            <p className="text-[11px] text-[#8a82a2] mt-0.5">Status aktif (live)</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Eye size={24} />
          </div>
        </div>

        <div className="card-s p-4 sm:p-5 bg-white border border-[#d9cff5] flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#5d5577]">Rata-rata Rating Kepuasan</p>
            <div className="flex items-center gap-2 mt-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2b2542]">{avgRating}</h3>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" />
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[#8a82a2] mt-0.5">Dari skala 5 bintang</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Star size={24} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-s p-4 bg-white border border-[#d9cff5] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a82a2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama, role, atau review..."
            className="w-full bg-[#efeafb]/30 border border-[#d9cff5] rounded-xl pl-9 pr-3 py-2 text-xs text-[#2b2542] placeholder-[#8a82a2] outline-none focus:ring-2 focus:ring-[#8f78d8]/30 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#efeafb]/70 border border-[#d9cff5] self-stretch sm:self-auto">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'all' 
                ? 'bg-[#8f78d8] text-white shadow-sm' 
                : 'text-[#4b3b86] hover:bg-white/60'
            }`}
          >
            Semua ({reviews.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'active' 
                ? 'bg-emerald-600 text-white shadow-sm' 
                : 'text-emerald-800 hover:bg-white/60'
            }`}
          >
            Aktif Tampil ({activeReviews})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('inactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'inactive' 
                ? 'bg-slate-700 text-white shadow-sm' 
                : 'text-slate-700 hover:bg-white/60'
            }`}
          >
            Disembunyikan ({totalReviews - activeReviews})
          </button>
        </div>
      </div>

      {/* Review List Table */}
      <div className="card-s bg-white border border-[#d9cff5] overflow-hidden">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 size={32} className="animate-spin text-[#8f78d8]" />
            <p className="text-xs text-[#5d5577] font-semibold">Memuat daftar review pelanggan...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center mx-auto">
              <MessageSquareQuote size={28} />
            </div>
            <h4 className="text-base font-bold text-[#2b2542]">Belum ada review yang cocok</h4>
            <p className="text-xs text-[#5d5577] max-w-sm mx-auto">
              {searchQuery ? 'Coba ubah kata kunci pencarian Anda.' : 'Klik tombol "Tambah Review Pelanggan" di atas untuk menambahkan testimoni pertama.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-[#efeafb]/40">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Pelanggan</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Capaian / Outcome</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Rating</th>
                  <th className="px-5 py-3.5 text-left text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Isi Testimoni</th>
                  <th className="px-5 py-3.5 text-center text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Status Web</th>
                  <th className="px-5 py-3.5 text-right text-xs font-bold text-[#4b3b86] uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReviews.map((rev) => {
                  return (
                    <tr key={rev.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Customer Info */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#efeafb] border border-[#d9cff5] text-[#4b3b86] font-bold text-xs flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                            {rev.avatar_url ? (
                              <img src={rev.avatar_url} alt={rev.name} className="w-full h-full object-cover" />
                            ) : (
                              <span>{rev.initials || 'IW'}</span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-xs sm:text-sm text-[#2b2542]">{rev.name}</p>
                            <p className="text-[11px] text-[#5d5577] max-w-[200px] truncate">{rev.role || '-'}</p>
                          </div>
                        </div>
                      </td>

                      {/* Outcome */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        {rev.outcome ? (
                          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#efeafb] text-[#4b3b86] text-[11px] font-bold border border-[#d9cff5]">
                            <Award size={12} className="text-[#8f78d8]" />
                            <span>{rev.outcome}</span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#8a82a2]">-</span>
                        )}
                      </td>

                      {/* Rating */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <div className="flex text-amber-400">
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} size={13} fill="currentColor" />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-[#4b3b86] ml-1">{rev.rating || 5}.0</span>
                        </div>
                      </td>

                      {/* Review Content */}
                      <td className="px-5 py-4">
                        <p className="text-xs text-[#5d5577] line-clamp-2 max-w-md leading-relaxed">
                          "{rev.review}"
                        </p>
                      </td>

                      {/* Status Toggle */}
                      <td className="px-5 py-4 whitespace-nowrap text-center">
                        <button
                          type="button"
                          onClick={() => handleToggle(rev.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-sm ${
                            rev.is_active
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                          }`}
                          title="Klik untuk mengubah status tampil"
                        >
                          {rev.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                          <span>{rev.is_active ? 'Tampil' : 'Sembunyi'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(rev)}
                            className="p-1.5 rounded-lg text-[#8f78d8] hover:bg-[#efeafb] transition-colors"
                            title="Edit Review"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(rev.id, rev.name)}
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Hapus Review"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2b2542]/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#d9cff5] overflow-hidden max-h-[92vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#efeafb] via-white to-[#efeafb] border-b border-[#d9cff5]/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#8f78d8] text-white flex items-center justify-center shadow-sm">
                  <MessageSquareQuote size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2b2542]">
                    {editingReview ? 'Sunting Review Pelanggan' : 'Unggah Review Pelanggan Baru'}
                  </h3>
                  <p className="text-[11px] text-[#5d5577]">Review akan langsung muncul di landing page publik</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5d5577] hover:bg-[#efeafb] hover:text-[#2b2542] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-error-container/40 border border-error/30 text-xs text-error flex items-center gap-2">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Customer Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                    Nama Pelanggan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Nadia Putri"
                    className="w-full bg-white border border-[#d9cff5] rounded-xl py-2 px-3 text-xs text-[#2b2542] outline-none focus:ring-2 focus:ring-[#8f78d8]/30 font-medium"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                    Role / Asal Kampus / Pekerjaan
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Contoh: Fresh Graduate UI/UX - UI"
                    className="w-full bg-white border border-[#d9cff5] rounded-xl py-2 px-3 text-xs text-[#2b2542] outline-none focus:ring-2 focus:ring-[#8f78d8]/30"
                  />
                </div>
              </div>

              {/* Outcome & Rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                    Capaian Utama / Outcome
                  </label>
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                    placeholder="Contoh: Lolos Interview FinTech"
                    className="w-full bg-white border border-[#d9cff5] rounded-xl py-2 px-3 text-xs text-[#2b2542] outline-none focus:ring-2 focus:ring-[#8f78d8]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                    Bintang Kepuasan (Rating)
                  </label>
                  <div className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl border border-[#d9cff5] bg-white">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`transition-transform hover:scale-110 ${
                          star <= rating ? 'text-amber-400' : 'text-slate-200'
                        }`}
                      >
                        <Star size={18} fill="currentColor" />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#4b3b86] ml-2">{rating}.0 / 5.0</span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                  Isi Testimoni / Pengalaman Pelanggan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tulis ulasan positif atau pengalaman pelanggan setelah menggunakan fitur Inner Whisper..."
                  className="w-full bg-white border border-[#d9cff5] rounded-xl p-3 text-xs text-[#2b2542] outline-none focus:ring-2 focus:ring-[#8f78d8]/30 resize-none leading-relaxed"
                />
              </div>

              {/* Avatar Photo Upload (Optional) */}
              <div>
                <label className="text-xs font-semibold text-[#5d5577] block mb-1">
                  Foto Avatar Pelanggan (Opsional)
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border border-[#d9cff5] bg-[#efeafb] flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Preview Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} className="text-[#8f78d8]" />
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#d9cff5] text-xs font-bold text-[#4b3b86] hover:bg-[#efeafb] cursor-pointer transition-colors">
                      <Upload size={14} />
                      <span>{avatarPreview ? 'Ganti Foto Avatar' : 'Pilih Foto Avatar'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="sr-only" 
                        onChange={handleAvatarChange} 
                      />
                    </label>
                    <p className="text-[10px] text-[#8a82a2] mt-1">Jika dikosongkan, avatar akan otomatis memakai inisial nama.</p>
                  </div>
                </div>
              </div>

              {/* Active Toggle Checkbox */}
              <div className="pt-2 border-t border-[#d9cff5]/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#2b2542]">Tampilkan Langsung di Halaman Publik</p>
                  <p className="text-[11px] text-[#5d5577]">Review akan langsung aktif di landing page &amp; halaman ulasan.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8f78d8]"></div>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-[#5d5577] hover:bg-[#efeafb] transition-colors"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-lv text-xs px-5 py-2.5 rounded-xl text-white font-bold inline-flex items-center gap-2 shadow-btn disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>{editingReview ? 'Simpan Perubahan' : 'Unggah Review'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
