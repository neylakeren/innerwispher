import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CareerProvider } from './context/CareerContext';
import DashboardLayout from './layouts/DashboardLayout';
import LandingLayout from './layouts/LandingLayout';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard Views
import Dashboard from './pages/Dashboard';
import PsychologistDashboard from './pages/PsychologistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookingList from './pages/BookingList';
import ChatRoom from './pages/ChatRoom';
import AdminPsychologistList from './pages/AdminPsychologistList';
import AdminPatientList from './pages/AdminPatientList';
import AdminReviewList from './pages/AdminReviewList';
import PsychologistDiscovery from './pages/PsychologistDiscovery';
import SessionNotes from './pages/SessionNotes';
import CounselorHonorList from './pages/CounselorHonorList';
import AdminHonorList from './pages/AdminHonorList';

// Inner Whisper Feature Pages
import CareerTest from './pages/CareerTest';
import CareerExplorer from './pages/CareerExplorer';
import CareerRoadmap from './pages/CareerRoadmap';
import CareerCvInterview from './pages/CareerCvInterview';
import CareerPortfolio from './pages/CareerPortfolio';
import CareerLearning from './pages/CareerLearning';
import CareerZodiac from './pages/CareerZodiac';
import CareerArticles from './pages/CareerArticles';
import CareerPricing from './pages/CareerPricing';
import UserProfile from './pages/UserProfile';

// Landing Pages
import Beranda from './pages/landing/Beranda';
import Layanan from './pages/landing/Layanan';
import TentangKami from './pages/landing/TentangKami';
import Artikel from './pages/landing/Artikel';

// Components
import PWAInstallBanner from './components/PWAInstallBanner';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return (
            <div className="min-h-screen bg-[#f7f4fd] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#8f78d8] animate-ping opacity-75" />
            </div>
        );
    }
    if (!user) return <Navigate to="/login" replace />;
    return <DashboardLayout>{children}</DashboardLayout>;
};

function HomeRouter() {
    const { user } = useAuth();

    if (user?.role === 'admin') return <AdminDashboard />;
    if (user?.role === 'psychologist') return <PsychologistDashboard />;
    return <Dashboard />;
}

function AppRoutes() {
    return (
        <Routes>
            {/* Landing Pages (Public) */}
            <Route path="/" element={
                <LandingLayout><Beranda /></LandingLayout>
            } />
            <Route path="/layanan" element={
                <LandingLayout><Layanan /></LandingLayout>
            } />
            <Route path="/tentang-kami" element={
                <LandingLayout><TentangKami /></LandingLayout>
            } />
            <Route path="/artikel" element={
                <LandingLayout><Artikel /></LandingLayout>
            } />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Core Dashboard Router (Protected) */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <HomeRouter />
                </ProtectedRoute>
            } />
            
            {/* Inner Whisper Features */}
            <Route path="/tes" element={
                <ProtectedRoute>
                    <CareerTest />
                </ProtectedRoute>
            } />

            <Route path="/jelajah" element={
                <ProtectedRoute>
                    <CareerExplorer />
                </ProtectedRoute>
            } />

            <Route path="/roadmap" element={
                <ProtectedRoute>
                    <CareerRoadmap />
                </ProtectedRoute>
            } />

            <Route path="/cv-interview" element={
                <ProtectedRoute>
                    <CareerCvInterview />
                </ProtectedRoute>
            } />

            <Route path="/portofolio" element={
                <ProtectedRoute>
                    <CareerPortfolio />
                </ProtectedRoute>
            } />

            <Route path="/belajar" element={
                <ProtectedRoute>
                    <CareerLearning />
                </ProtectedRoute>
            } />

            <Route path="/zodiak" element={
                <ProtectedRoute>
                    <CareerZodiac />
                </ProtectedRoute>
            } />

            <Route path="/artikel-tips" element={
                <ProtectedRoute>
                    <CareerArticles />
                </ProtectedRoute>
            } />

            <Route path="/paket" element={
                <ProtectedRoute>
                    <CareerPricing />
                </ProtectedRoute>
            } />

            <Route path="/profil" element={
                <ProtectedRoute>
                    <UserProfile />
                </ProtectedRoute>
            } />

            {/* Counseling & Healthcare Management */}
            <Route path="/bookings" element={
                <ProtectedRoute>
                    <BookingList />
                </ProtectedRoute>
            } />

            <Route path="/psychologists" element={
                <ProtectedRoute>
                    <PsychologistDiscovery />
                </ProtectedRoute>
            } />

            <Route path="/notes" element={
                <ProtectedRoute>
                    <SessionNotes />
                </ProtectedRoute>
            } />

            <Route path="/admin/psychologists" element={
                <ProtectedRoute>
                    <AdminPsychologistList />
                </ProtectedRoute>
            } />

            <Route path="/admin/patients" element={
                <ProtectedRoute>
                    <AdminPatientList />
                </ProtectedRoute>
            } />

            <Route path="/admin/reviews" element={
                <ProtectedRoute>
                    <AdminReviewList />
                </ProtectedRoute>
            } />

            <Route path="/honor-konselor" element={
                <ProtectedRoute>
                    <CounselorHonorList />
                </ProtectedRoute>
            } />

            <Route path="/admin/honor" element={
                <ProtectedRoute>
                    <AdminHonorList />
                </ProtectedRoute>
            } />
            
            <Route path="/sessions/:id" element={
                <ProtectedRoute>
                    <ChatRoom />
                </ProtectedRoute>
            } />

            {/* Fallback to Dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <CareerProvider>
                <Router>
                    <AppRoutes />
                    <PWAInstallBanner />
                </Router>
            </CareerProvider>
        </AuthProvider>
    );
}

export default App;
