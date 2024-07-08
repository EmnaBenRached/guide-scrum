import { createRouter, createWebHistory } from 'vue-router';
import Accueil from './pages/Accueil.vue';
import Home from './pages/Home.vue';

const routes = [
    { path: '/', component: Accueil },
    { path: '/home', component: Home },
];

export const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;
