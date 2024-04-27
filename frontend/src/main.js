import { createApp } from 'vue';
import { createPinia } from 'pinia'; 
import App from './App.vue';
import router from './router';
import './global.css';
import Cookies from 'js-cookie'; 


const pinia = createPinia(); 
Cookies.defaults = {
  sameSite: 'Strict', 
};

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app');
