import { defineStore } from 'pinia';

export const useApiUrlsStore = defineStore({
  id: 'apiUrls',
  state: () => ({
    apiBaseUrl: 'http://localhost:3000/api',
    authBaseUrl: 'http://localhost:3000/auth',
  }),
  getters: {
    updateDetailsUrl() {
      return `${this.apiBaseUrl}/update-details`;
    },
    changePasswordUrl() {
      return `${this.apiBaseUrl}/change-password`;
    },
    deleteAccountUrl() {
      return `${this.apiBaseUrl}/delete`;
    },
    userPoemsUrl() {
      return `${this.apiBaseUrl}/poems/user`;
    },
    singlePoemUrl() {
      return `${this.apiBaseUrl}/poems`;
    },
    loginUrl() {
      return `${this.authBaseUrl}/login`;
    },
    registerUrl() {
      return `${this.authBaseUrl}/register`;
    },
    logoutUrl() {
      return `${this.authBaseUrl}/logout`;
    },
  },
});
