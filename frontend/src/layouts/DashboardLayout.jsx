import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    LayoutDashboard, 
    ClipboardCheck,
    Compass,
    Map,
    FileText,
    Briefcase,
    GraduationCap,
    Sparkles,
    Users,
    Calendar,
    BookOpen,
    User,
    LogOut, 
    Menu, 
    X,
    ClipboardList,
    CreditCard,
    UserCheck,
    Wallet
} from 'lucide-react';
import { Button, cn } from '../components/ui';
import LogoutModal from '../components/LogoutModal';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

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

    const getNavigation = () => {
        if (user?.role === 'admin') {
            return [
                { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
                { name: 'Paket Layanan', href: '/paket', icon: CreditCard },
                { name: 'Data User', href: '/admin/patients', icon: UserCheck },
                { name: 'Profil Saya', href: '/profil', icon: User },
            ];
        }

        if (user?.role === 'psychologist') {
            return [
                { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
                { name: 'Paket Layanan', href: '/paket', icon: CreditCard },
                { name: 'Profil Saya', href: '/profil', icon: User },
            ];
        }

        // Patient / Member
        return [
            { name: 'Beranda', href: '/dashboard', icon: LayoutDashboard },
            { name: 'Tes Karier', href: '/tes', icon: ClipboardCheck },
            { name: 'Jelajah Karier', href: '/jelajah', icon: Compass },
            { name: 'Roadmap', href: '/roadmap', icon: Map },
            { name: 'CV & Interview', href: '/cv-interview', icon: FileText },
            { name: 'Portofolio', href: '/portofolio', icon: Briefcase },
            { name: 'Belajar', href: '/belajar', icon: GraduationCap },
            { name: 'Zodiak Karier', href: '/zodiak', icon: Sparkles },
            { name: 'Paket Layanan', href: '/paket', icon: CreditCard },
            { name: 'Artikel & Tips', href: '/artikel-tips', icon: BookOpen },
            { name: 'Profil Saya', href: '/profil', icon: User },
        ];
    };

    const navigation = getNavigation();

    return (
        <div className="min-h-screen bg-[#f7f4fd] font-quicksand flex">
            {/* Mobile Sidebar Backdrop */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-[#2b2542]/40 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Desktop & Mobile Drawer */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-md border-r border-[#d9cff5]/80 flex flex-col justify-between transform transition-transform duration-200 ease-in-out lg:translate-x-0 shadow-card",
                !isSidebarOpen && "-translate-x-full"
            )}>
                <div className="flex flex-col h-full overflow-hidden">
                    {/* Brand Header */}
                    <div className="p-5 flex items-center justify-between border-b border-[#d9cff5]/60">
                        <Link to="/dashboard" className="flex items-center gap-2.5">
                            <img 
                                src="/logo.png" 
                                alt="Inner Whisper" 
                                className="h-9 w-auto object-contain drop-shadow-[0_4px_10px_rgba(143,120,216,0.3)]" 
                            />
                            <span className="text-xl font-bold bg-gradient-to-r from-[#4b3b86] to-[#9a82e6] bg-clip-text text-transparent tracking-tight">
                                Inner Whisper
                            </span>
                        </Link>
                        <button
                            type="button"
                            className="lg:hidden text-[#5d5577] hover:text-[#4b3b86] p-1"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation Menu Links */}
                    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150",
                                        isActive 
                                            ? "bg-gradient-to-r from-[#8f78d8] to-[#a68ff0] text-white shadow-btn" 
                                            : "text-[#5d5577] hover:bg-[#efeafb] hover:text-[#4b3b86]"
                                    )}
                                >
                                    <Icon size={18} className={isActive ? "text-white" : "text-[#8f78d8]"} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer User Info & Logout */}
                    <div className="p-4 border-t border-[#d9cff5]/60 bg-white/50">
                        <div className="flex items-center gap-3 px-2 py-1.5 mb-2">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#8f78d8] to-[#b9a6f0] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                {getInitials(user?.name)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-[#2b2542] truncate">
                                    {user?.name || 'Pengguna'}
                                </p>
                                <p className="text-[11px] font-semibold text-[#8f78d8] capitalize truncate">
                                    {user?.role === 'patient' ? 'User' : (user?.role || 'Member')}
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsLogoutModalOpen(true)}
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-[#dc3545] hover:bg-[#fce8e9] rounded-xl transition-colors cursor-pointer"
                        >
                            <LogOut size={14} />
                            Keluar dari Akun
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
                {/* Topbar (Mobile Hamburger & Quick Info) */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#d9cff5]/60 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <button
                        type="button"
                        className="p-2 text-[#5d5577] hover:text-[#4b3b86] lg:hidden rounded-lg hover:bg-[#efeafb]"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu size={22} />
                    </button>

                    <div className="lg:hidden flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
                        <span className="font-bold text-base bg-gradient-to-r from-[#4b3b86] to-[#9a82e6] bg-clip-text text-transparent">
                            Inner Whisper
                        </span>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#5d5577] bg-[#efeafb] px-3 py-1.5 rounded-full border border-[#d9cff5]">
                            <span className="w-2 h-2 rounded-full bg-[#198754] animate-pulse" />
                            Inner Whisper Online
                        </div>
                    </div>
                </header>

                <main className="p-4 sm:p-6 lg:p-8 flex-1">
                    {children}
                </main>
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
