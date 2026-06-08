import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../api/client';
import echo from '../api/echo';
import { useAuth } from '../context/AuthContext';
import { Button, Input, cn } from '../components/ui';
import { 
    Send, 
    User, 
    ArrowLeft, 
    MoreVertical,
    CheckCheck,
    Lock,
    XCircle
} from 'lucide-react';

export default function ChatRoom() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [session, setSession] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        fetchSession();
        
        console.log('Echo joining session:', id);
        const channel = echo.private(`session.${id}`)
            .listen('.MessageSent', (e) => {
                console.log('Echo Message Received:', e);
                setMessages((prev) => [...prev, e.message]);
            });

        channel.on('pusher:subscription_succeeded', () => {
            console.log('Echo Subscribed to session.' + id);
        });

        channel.on('pusher:subscription_error', (status) => {
            console.error('Echo Subscription Error:', status);
        });

        return () => {
            console.log('Echo leaving session:', id);
            channel.stopListening('.MessageSent');
        };
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchSession = async () => {
        try {
            const res = await client.get(`/sessions/${id}`);
            setSession(res.data);
            setMessages(res.data.messages || []);
        } finally {
            setLoading(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const content = newMessage;
        setNewMessage('');

        try {
            const res = await client.post(`/sessions/${id}/messages`, { content });
            // The message will also be received via Echo, so we handle duplication or just let Echo handle it
            // To avoid lag, we could add it optimistically, but let's keep it simple for now
            // setMessages((prev) => [...prev, res.data]); 
        } catch (err) {
            alert('Gagal mengirim pesan');
        }
    };

    const handleEndSession = async () => {
        if (!window.confirm('Apakah Anda yakin ingin mengakhiri sesi ini?')) return;
        
        try {
            await client.post(`/sessions/${id}/end`);
            fetchSession();
        } catch (err) {
            alert('Gagal mengakhiri sesi');
        }
    };

    if (loading) return <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
    </div>;

    const isSessionClosed = session?.status === 'closed';

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center space-x-4">
                    <button onClick={() => navigate('/bookings')} className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <User className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">
                            {user.role === 'patient' ? session?.booking?.psychologist?.name : session?.booking?.patient?.name}
                        </h3>
                        <p className="text-xs text-emerald-500 flex items-center font-medium">
                            <span className="h-2 w-2 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                            Sesi Aktif
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    {user.role === 'psychologist' && !isSessionClosed && (
                        <Button variant="danger" size="sm" onClick={handleEndSession}>
                            Akhiri Sesi
                        </Button>
                    )}
                    <button className="p-2 text-slate-400 hover:text-slate-600">
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                {messages.map((msg, index) => {
                    const isMe = msg.sender_id === user.id;
                    return (
                        <div key={msg.id} className={cn(
                            "flex flex-col max-w-[80%]",
                            isMe ? "ml-auto items-end" : "items-start"
                        )}>
                            <div className={cn(
                                "px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                                isMe 
                                    ? "bg-indigo-600 text-white rounded-tr-none" 
                                    : "bg-white text-slate-900 border border-slate-100 rounded-tl-none"
                            )}>
                                {msg.content}
                            </div>
                            <div className="flex items-center mt-1 space-x-1">
                                <span className="text-[10px] text-slate-400 font-medium">
                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                {isMe && <CheckCheck className="h-3 w-3 text-indigo-400" />}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Footer / Input */}
            <div className="p-4 bg-white border-t border-slate-100">
                {isSessionClosed ? (
                    <div className="flex items-center justify-center space-x-2 py-2 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <Lock className="h-4 w-4" />
                        <span className="text-sm font-medium">Sesi ini telah berakhir</span>
                    </div>
                ) : (
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                        <Input
                            className="flex-1"
                            placeholder="Ketik pesan Anda..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button type="submit" size="md" className="shrink-0 rounded-full h-10 w-10 p-0">
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
