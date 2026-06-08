import React, { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            client.get('/user')
                .then(res => setUser(res.data))
                .catch(() => localStorage.removeItem('auth_token'))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await client.post('/login', { email, password });
        localStorage.setItem('auth_token', res.data.access_token);
        setUser(res.data.user);
        return res.data;
    };

    const register = async (data) => {
        const res = await client.post('/register', data);
        localStorage.setItem('auth_token', res.data.access_token);
        setUser(res.data.user);
        return res.data;
    };

    const logout = async () => {
        try {
            await client.post('/logout');
        } finally {
            localStorage.removeItem('auth_token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
