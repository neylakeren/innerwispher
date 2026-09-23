import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import LandingLayout from './layouts/LandingLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PsychologistDashboard from './pages/PsychologistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookingList from './pages/BookingList';
import ChatRoom from './pages/ChatRoom';
import AdminPsychologistList from './pages/AdminPsychologistList';
import AdminPatientList from './pages/AdminPatientList';
import PsychologistDiscovery from './pages/PsychologistDiscovery';
import SessionNotes from './pages/SessionNotes';

// Landing Pages
import Beranda from './pages/landing/Beranda';
import Layanan from './pages/landing/Layanan';
import TentangKami from './pages/landing/TentangKami';
import Artikel from './pages/landing/Artikel';

// Components
import PWAInstallBanner from './components/PWAInstallBanner';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
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

            {/* Dashboard (Protected) */}
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <HomeRouter />
                </ProtectedRoute>
            } />
            
            <Route path="/bookings" element={
                <ProtectedRoute>
                    <BookingList />
                </ProtectedRoute>
            } />

            <Route path="/notes" element={
                <ProtectedRoute>
                    <SessionNotes />
                </ProtectedRoute>
            } />

            <Route path="/psychologists" element={
                <ProtectedRoute>
                    <PsychologistDiscovery />
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
            
            <Route path="/sessions/:id" element={
                <ProtectedRoute>
                    <ChatRoom />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
                <PWAInstallBanner />
            </Router>
        </AuthProvider>
    );
}

export default App;
