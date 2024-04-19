import { createRouter, createWebHistory } from 'vue-router';
import HomePageContent from './components/HomePageContent.vue';
import RegisterForm from './components/RegisterForm.vue';
import LoginComponent from './components/LoginComponent.vue';
import UserPoems from './components/UserPoems.vue';
import AccountSettings from './components/AccountSettings.vue'; 
import InspirationalQuotes from './components/InspirationalQuotes.vue';


const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: HomePageContent,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponent,
  },
  {
  path: '/inspiration',
  name: 'inspiration',
  component: InspirationalQuotes,
},
  {
    path: '/userpoems',
    name: 'UserPoems',
    component: UserPoems,
  },
  {
    path: '/account-settings',
    name: 'AccountSettings',
    component: AccountSettings,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
