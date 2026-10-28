import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import client from '../api/client';
import { CAREERS, LEARNING_MODULES, PORTFOLIO_CHECKLIST, ROADMAPS } from '../data/careerData';

const CareerContext = createContext();

export function CareerProvider({ children }) {
  const { user } = useAuth();
  const storageKey = user ? `iw_career_${user.id}` : 'iw_career_guest';

  const defaultState = {
    testResult: null,
    targetCareerId: null,
    completedRoadmap: [],
    completedLearning: [],
    completedPortfolio: [],
    cvPassed: false,
    cvScore: 0,
    zodiac: user?.zodiac || 'Aries',
    major: '',
    university: '',
    bio: '',
    unlockedPackages: [], // 'report', 'cv_ats', 'bundle'
  };

  const [careerState, setCareerState] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
    } catch {
      return defaultState;
    }
  });

  const [proPayment, setProPayment] = useState(null);
  const [proMeta, setProMeta] = useState({ proExpiresAt: null, daysLeft: 0 });
  const [proLoading, setProLoading] = useState(false);

  const refreshProStatus = async () => {
    if (!user) return;
    try {
      setProLoading(true);
      const res = await client.get('/pro/status');
      setProPayment(res.data.latest_payment || null);
      setProMeta({
        proExpiresAt: res.data.pro_expires_at || null,
        daysLeft: res.data.days_left ?? 0
      });
      if (res.data.is_pro || res.data.latest_payment?.status === 'verified') {
        unlockPro();
      } else {
        // Pastikan tidak ada flag stale di localStorage jika belum diverifikasi admin
        setCareerState(prev => ({
          ...prev,
          isPro: false,
          unlockedPackages: []
        }));
      }
    } catch (err) {
      console.warn('Failed to fetch pro status:', err);
    } finally {
      setProLoading(false);
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!user?.is_pro) {
          parsed.isPro = false;
          parsed.unlockedPackages = [];
        }
        setCareerState(prev => ({ ...defaultState, ...prev, ...parsed }));
      } else {
        setCareerState(defaultState);
      }
    } catch {
      setCareerState(defaultState);
    }

    if (user?.id) {
      refreshProStatus();
    }
  }, [user?.id, user?.is_pro]);

  const submitProPaymentProof = async (formData) => {
    const res = await client.post('/pro/upload-proof', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setProPayment(res.data.payment);
    return res.data;
  };

  const proPaymentStatus = user?.is_pro || proPayment?.status === 'verified'
    ? 'verified'
    : proPayment?.status === 'pending'
      ? 'pending'
      : proPayment?.status === 'rejected'
        ? 'rejected'
        : 'none';

  const updateCareerState = (updates) => {
    setCareerState(prev => {
      const next = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save career state', e);
      }
      return next;
    });
  };

  // PRO / Bundling unlocking (hanya aktif jika user.is_pro === true atau verifikasi admin)
  const unlockPro = () => {
    updateCareerState(prev => {
      const current = prev.unlockedPackages || [];
      const set = new Set([...current, 'pro', 'bundle', 'report', 'cv_ats']);
      return { isPro: true, unlockedPackages: Array.from(set) };
    });
  };

  const unlockPackage = (packageId = 'pro') => {
    unlockPro();
  };

  // Otorisasi Ketat PRO: Wajib akun terverifikasi is_pro di backend atau status pembayaran 'verified'
  // Sebelum bayar / sebelum di-acc admin -> SEMUA FITUR PRO TERKUNCI (isProUnlocked = false)
  const isProUnlocked = Boolean(
    user?.is_pro || proPaymentStatus === 'verified'
  );

  const isReportUnlocked = isProUnlocked;
  const isCvAtsUnlocked = isProUnlocked;
  const isBundleUnlocked = isProUnlocked;

  // Helper functions
  const activeCareer = CAREERS.find(c => c.id === careerState.targetCareerId) || null;

  // Calculate overall career preparation progress %
  const calculateTotalProgress = () => {
    let completedPoints = 0;
    const totalPoints = 5 + LEARNING_MODULES.length + 1 + 1 + PORTFOLIO_CHECKLIST.length; // Roadmap (5) + Learn (6) + Test (1) + CV (1) + Portfolio (5) = 18

    if (careerState?.testResult) completedPoints += 1;
    if (careerState?.cvPassed) completedPoints += 1;
    completedPoints += (careerState?.completedRoadmap || []).length;
    completedPoints += (careerState?.completedLearning || []).length;
    completedPoints += (careerState?.completedPortfolio || []).length;

    return Math.min(100, Math.round((completedPoints / totalPoints) * 100));
  };

  const getNextStepRecommendation = () => {
    if (!careerState?.testResult) {
      return {
        title: 'Ikuti Tes Karier',
        desc: 'Jawab 25 pertanyaan untuk konsultasi karier dan memetakan potensi terbesarmu.',
        path: '/tes',
        actionLabel: 'Mulai Tes'
      };
    }

    if (!activeCareer) {
      return {
        title: 'Pilih Tujuan Karier',
        desc: 'Eksplorasi rekomendasi berdasarkan hasil tesmu dan tentukan target utama.',
        path: '/jelajah',
        actionLabel: 'Pilih Karier'
      };
    }

    const currentRoadmap = ROADMAPS[activeCareer.c] || [];
    const completedRoadmap = careerState?.completedRoadmap || [];
    const nextRoadStepIndex = currentRoadmap.findIndex((_, idx) => !completedRoadmap.includes(idx));

    if (nextRoadStepIndex !== -1) {
      return {
        title: `Langkah Roadmap: ${activeCareer.n}`,
        desc: currentRoadmap[nextRoadStepIndex],
        path: '/roadmap',
        actionLabel: 'Buka Roadmap'
      };
    }

    return {
      title: 'Buka Laporan & Audit Lengkap',
      desc: 'Rencana kariermu sudah solid! Buka laporan diagnostik lengkap atau audit CV ATS untuk persiapan maksimal.',
      path: '/paket',
      actionLabel: 'Lihat Paket'
    };
  };

  return (
    <CareerContext.Provider value={{
      careerState,
      updateCareerState,
      activeCareer,
      totalProgress: calculateTotalProgress(),
      nextStep: getNextStepRecommendation(),
      unlockPackage,
      unlockPro,
      isProUnlocked,
      isReportUnlocked,
      isCvAtsUnlocked,
      isBundleUnlocked,
      proPayment,
      proPaymentStatus,
      proLoading,
      proExpiresAt: proMeta.proExpiresAt || user?.pro_expires_at || null,
      daysLeft: proMeta.daysLeft,
      submitProPaymentProof,
      refreshProStatus,
    }}>
      {children}
    </CareerContext.Provider>
  );
}

export function useCareer() {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
}
