import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
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
  };

  const [careerState, setCareerState] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCareerState(prev => ({ ...prev, ...JSON.parse(saved) }));
      } else {
        setCareerState(defaultState);
      }
    } catch {
      setCareerState(defaultState);
    }
  }, [user?.id]);

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

  // Helper functions
  const activeCareer = CAREERS.find(c => c.id === careerState.targetCareerId) || null;

  // Calculate overall career preparation progress %
  const calculateTotalProgress = () => {
    let completedPoints = 0;
    const totalPoints = 5 + LEARNING_MODULES.length + 1 + 1 + PORTFOLIO_CHECKLIST.length; // Roadmap (5) + Learn (6) + Test (1) + CV (1) + Portfolio (5) = 18

    if (careerState.testResult) completedPoints += 1;
    if (careerState.cvPassed) completedPoints += 1;
    completedPoints += careerState.completedRoadmap.length;
    completedPoints += careerState.completedLearning.length;
    completedPoints += careerState.completedPortfolio.length;

    return Math.min(100, Math.round((completedPoints / totalPoints) * 100));
  };

  const getNextStepRecommendation = () => {
    if (!careerState.testResult) {
      return {
        title: 'Ikuti Tes Karier',
        desc: 'Jawab 25 pertanyaan untuk memetakan potensi & minat psikologis terbesarmu.',
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
    const nextRoadStepIndex = currentRoadmap.findIndex((_, idx) => !careerState.completedRoadmap.includes(idx));

    if (nextRoadStepIndex !== -1) {
      return {
        title: `Langkah Roadmap: ${activeCareer.n}`,
        desc: currentRoadmap[nextRoadStepIndex],
        path: '/roadmap',
        actionLabel: 'Buka Roadmap'
      };
    }

    return {
      title: 'Konsultasi Bersama Pakar',
      desc: 'Rencana kariermu sudah solid! Jadwalkan sesi konseling untuk validasi langkahmu.',
      path: '/psychologists',
      actionLabel: 'Pilih Psikolog'
    };
  };

  return (
    <CareerContext.Provider value={{
      careerState,
      updateCareerState,
      activeCareer,
      totalProgress: calculateTotalProgress(),
      nextStep: getNextStepRecommendation(),
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
