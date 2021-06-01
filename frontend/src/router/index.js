import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue'


const routes = [
  {
    name: 'Login',
    path: '/',
    component: Login
  },
  {
    name: 'Profile',
    path: '/profile',
    component: Profile
  }
];

const router = createRouter ({
  history: createWebHistory(),
  routes
});

export default router;