import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    LayoutDashboard, 
    Calendar, 
    MessageSquare, 
    LogOut, 
    User, 
    Heart,
    Menu,
    X,
    CheckCircle,
    Users,
    ClipboardList
} from 'lucide-react';
import { Button, cn } from '../components/ui';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const getNavigation = () => {
        const baseNav = [
            { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        ];

        if (user?.role === 'admin') {
            return [
                ...baseNav,
                { name: 'Verifikasi', href: '/', icon: CheckCircle }, // Admin dashboard covers this
                { name: 'Daftar Psikolog', href: '/admin/psychologists', icon: Users },
                { name: 'Data Pasien', href: '/admin/patients', icon: User },
            ];
        }

        if (user?.role === 'psychologist') {
            return [
                ...baseNav,
                { name: 'Jadwal Saya', href: '/bookings', icon: Calendar },
                { name: 'Catatan Sesi', href: '/notes', icon: ClipboardList },
            ];
        }

        // Patient / Client
        return [
            ...baseNav,
            { name: 'Booking Saya', href: '/bookings', icon: Calendar },
            { name: 'Cari Psikolog', href: '/psychologists', icon: Users },
        ];
    };

    const navigation = getNavigation();

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
                !isSidebarOpen && "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    <div className="p-6">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="bg-indigo-600 p-1.5 rounded-lg">
                                <Heart className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">Neyla</span>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={cn(
                                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive 
                                            ? "bg-indigo-50 text-indigo-700" 
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-slate-100">
                        <div className="flex items-center space-x-3 px-3 py-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                <User className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">
                                    {user?.name}
                                </p>
                                <p className="text-xs text-slate-500 truncate capitalize">
                                    {user?.role}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-5 w-5 mr-3" />
                            Keluar
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="p-2 text-slate-600 lg:hidden"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        
                        <div className="flex-1 px-4 flex justify-end">
                            {/* Header actions (notifications, etc) */}
                        </div>
                    </div>
                </header>

                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
