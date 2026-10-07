import axios from 'axios';

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

client.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getStorageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
    const baseUrl = apiUrl.replace(/\/api\/?$/, '');
    return `${baseUrl}/storage/${path.replace(/^\//, '')}`;
};

export const FALLBACK_INVOICE_PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect width="100%" height="100%" rx="16" fill="%23efeafb"/><rect x="20" y="20" width="360" height="80" rx="12" fill="%238f78d8"/><text x="200" y="65" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23ffffff">INNER WHISPER</text><text x="200" y="250" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="15" fill="%234b3b86">Invoice Terverifikasi</text><text x="200" y="280" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%235d5577">Bukti Pembayaran Konsultasi</text></svg>`;

export default client;
