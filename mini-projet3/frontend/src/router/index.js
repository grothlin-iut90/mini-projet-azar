import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user'; // N'oublie pas d'importer le store
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginForm.vue';
import RegisterView from '../views/RegisterForm.vue';
import Chat from '../views/Chat.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,  
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
    },
    {
        path: '/chat',
        name: 'chat',
        component: Chat,
        beforeEnter: async (to, from, next) => {
            const userStore = useUserStore();
            await userStore.fetchUser();  // Attends que l'utilisateur soit récupéré
            if (userStore.isLoggedIn) {
                next();
            } else {
                next('/');
            }
        },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;