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
            { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        ];

        if (user?.role === 'admin') {
            return [
                ...baseNav,
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
        <div className="min-h-screen bg-background font-jakarta">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-on-background/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-outline-variant/30 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
                !isSidebarOpen && "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    <div className="p-6">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="bg-primary text-on-primary p-1.5 rounded-lg">
                                <Heart className="h-5 w-5" fill="currentColor" />
                            </div>
                            <span className="text-xl font-bold text-primary tracking-tight">InnerWhisper</span>
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
                                        "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-label-md font-medium transition-all",
                                        isActive 
                                            ? "bg-primary-container text-on-primary-container font-semibold" 
                                            : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-outline-variant/30">
                        <div className="flex items-center space-x-3 px-3 py-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                                <User className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-label-md font-bold text-on-surface truncate">
                                    {user?.name}
                                </p>
                                <p className="text-caption text-on-surface-variant truncate capitalize">
                                    {user?.role}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-error hover:bg-error-container/20"
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
                <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="p-2 text-on-surface-variant lg:hidden"
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
