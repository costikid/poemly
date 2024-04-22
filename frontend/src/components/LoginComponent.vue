<template>
  <div class="container">
    <h1>Login</h1>
    <form class="login-form" @submit.prevent="login">
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
      <button type="submit" class="filled-orange-btn">Login</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useApiUrlsStore } from "@/stores/apiUrls";
import { useRouter } from "vue-router";

export default {
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

        // Retrieve the user ID from the response data
        const userId = response.data.userId;
        console.log("User ID:", userId);

        // Store the token and user ID in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", userId);

        // Navigate to the UserPoems component
        router.push({ name: "UserPoems" });

        // Load poems after successful login
        // Emit a custom event to trigger the loadPoems function in the UserPoems component
        router.currentRoute.value.meta.emitLoadPoems();
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
  text-align: center;
}

.login-form {
  display: inline-block;
  text-align: left;
  max-width: 300px;
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
}
</style>
