import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY || 'vvusdluefxxmgjbeetva',
    wsHost: import.meta.env.VITE_REVERB_HOST || 'localhost',
    wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT || 8080,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME || 'http') === 'https',
    enabledTransports: ['ws', 'wss'],
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                const token = localStorage.getItem('auth_token');
                console.log('Echo Authorizing channel:', channel.name);
                fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/broadcasting/auth`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({
                        socket_id: socketId,
                        channel_name: channel.name
                    })
                })
                .then(response => {
                    if (!response.ok) throw new Error('Broadcast auth failed');
                    return response.json();
                })
                .then(data => {
                    console.log('Echo Auth Success:', data);
                    callback(false, data);
                })
                .catch(error => {
                    console.error('Echo Auth Error:', error);
                    callback(true, error);
                });
            }
        };
    },
});

export default echo;
