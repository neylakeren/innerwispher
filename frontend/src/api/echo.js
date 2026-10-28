import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

let echoInstance = null;

function getEcho() {
    if (!echoInstance && typeof window !== 'undefined') {
        try {
            echoInstance = new Echo({
                broadcaster: 'reverb',
                key: import.meta.env.VITE_REVERB_APP_KEY || 'vvusdluefxxmgjbeetva',
                wsHost: import.meta.env.VITE_REVERB_HOST || 'localhost',
                wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
                wssPort: import.meta.env.VITE_REVERB_PORT || 8080,
                forceTLS: (import.meta.env.VITE_REVERB_SCHEME || 'http') === 'https',
                enabledTransports: ['ws', 'wss'],
                authorizer: (channel) => ({
                    authorize: (socketId, callback) => {
                        const token = localStorage.getItem('auth_token');
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
                        .then(res => res.json())
                        .then(data => callback(false, data))
                        .catch(err => callback(true, err));
                    }
                }),
            });
        } catch (e) {
            console.warn('Echo initialization skipped:', e);
        }
    }
    return echoInstance;
}

const echoProxy = new Proxy({}, {
    get(target, prop) {
        if (typeof prop === 'symbol' || prop === 'then' || prop === 'toJSON' || prop === '$$typeof') {
            return undefined;
        }
        const instance = getEcho();
        if (!instance) return () => {};
        const val = instance[prop];
        return typeof val === 'function' ? val.bind(instance) : val;
    }
});

export default echoProxy;
