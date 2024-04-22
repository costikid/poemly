import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Import Pinia
import App from './App.vue';
import router from './router';
import './global.css';

const pinia = createPinia(); // Create a Pinia instance

// Create the app, use the router, use Pinia, and mount it to the DOM
createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app');
