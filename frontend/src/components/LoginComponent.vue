<template>
  <div class="container">
    <div class="background-image"></div>
    <div class="overlay"></div>
    <div class="auth-container glass-effect">
      <h1>Login</h1>
      <form @submit.prevent="login" class="auth-form">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          required
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <button type="submit" class="filled-violet-btn">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useApiUrlsStore } from "@/stores/apiUrls";
import { useRouter } from "vue-router";
import Cookies from "js-cookie"; // Import Cookies library
import "../shared-styles.css";

export default {
  name: "LoginPage",
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const apiUrlsStore = useApiUrlsStore();
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post(apiUrlsStore.loginUrl, {
          email: email.value,
          password: password.value,
        });

        // Retrieve the user ID and token from the response data
        const userId = response.data.userId;
        const token = response.data.token;

        // Set the JWT token and user ID as cookies
        Cookies.set("token", token);
        Cookies.set("userId", userId); // Store user ID in cookie

        router.push({ name: "UserPoems" });
      } catch (error) {
        console.error(error);
        errorMessage.value = "Invalid email or password.";
      }
    };

    return {
      email,
      password,
      errorMessage,
      login,
    };
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

h1 {
  margin-bottom: 20px;
  color: var(--light);
}

.error-message {
  color: var(--warning);
}
</style>
