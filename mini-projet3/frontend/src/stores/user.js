import { defineStore } from 'pinia';
import axios from 'axios';
import socket from '../socket';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    getters: {
        isLoggedIn: (state) => !!state.user,  // Retourne true si un utilisateur est connecté
    },
    actions: {
        async login({ email, password }) {
            console.log('Login action called with:', { email, password });
            const response = await axios.post('http://localhost:5000/auth/login', {
                email,
                password
            }, {withCredentials: true});

            if (response.status !== 200) {
                throw new Error('Erreur de connexion');
            }

            const data = response.data.user;
            this.user = data;
            setTimeout(() => {
                socket.connect();
            }, 100);
        },
        async register({ email, username, password }) {
            console.log('Register action called with:', { email, username, password });
            const response = await axios.post('http://localhost:5000/auth/register', {
                email,
                username,
                password
            }, {withCredentials: true});

            if (response.status !== 200) {
                throw new Error('Erreur lors de l\'inscription');
            }

            const data = response.data.user;
            this.user = data;
            setTimeout(() => {
                socket.connect();
            }, 100);
        },
        async fetchUser() {
            try {
                const res = await axios.get('http://localhost:5000/api/current_user', { withCredentials: true });
                this.user = res.data || null;
            } catch (err) {
                this.user = null;
            }
        },
        logout() {
            window.location.href = 'http://localhost:5000/auth/logout';
        }
    }
});
