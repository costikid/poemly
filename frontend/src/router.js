import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import RegisterPage from './views/RegisterPage.vue';
import LoginPage from './views/LoginPage.vue';
import UserPoemsPage from './views/UserPoemsPage.vue';
import AccountSettingsPage from './views/AccountSettingsPage.vue';
import InspirationalQuotesPage from './views/InspirationalQuotesPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/userpoems',
    name: 'UserPoems',
    component: UserPoemsPage,
    meta: {
      emitLoadPoems: true, 
    },
  },
  {
    path: '/account-settings',
    name: 'AccountSettings',
    component: AccountSettingsPage,
  },
  {
    path: '/inspiration',
    name: 'Inspiration',
    component: InspirationalQuotesPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
