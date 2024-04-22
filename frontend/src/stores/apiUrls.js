import { defineStore } from 'pinia';

export const useApiUrlsStore = defineStore({
  id: 'apiUrls',
  state: () => ({
    apiBaseUrl: 'http://localhost:3000/api',
    authBaseUrl: 'http://localhost:3000/auth',
    userId: null, // Add userId to the initial state
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
    userPoemsUrl(state) {
      const userId = state.userId;
      if (!userId) {
        console.error("User ID is not set.");
        return null;
      }
      return `${this.apiBaseUrl}/poems/user/${userId}`;
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
    updatePoemUrl() {
    return (poemId) => `${this.apiBaseUrl}/poems/${poemId}`;
    },
    savePoemUrl() {
    return `${this.apiBaseUrl}/poems`;
    },
    },});