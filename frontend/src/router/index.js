import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Profile from '@/views/Profile.vue'
import Modify from '@/views/Modify.vue'


const routes = [
  {
    name: 'Login',
    path: '/',
    component: Login
  },
  {
    name: 'Profile',
    path: '/profile',
    component: Profile,
    props: true,
  },
  {
    name: 'Modify',
    path: '/modify',
    component: Modify
  },
];

const router = createRouter ({
  history: createWebHistory(),
  routes
});

export default router;