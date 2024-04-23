<template>
  <div class="container">
    <div class="background-image"></div>
    <div class="overlay"></div>
    <div class="auth-container glass-effect">
      <h2>Register</h2>
      <form @submit.prevent="registerUser" class="auth-form">
        <label for="email">Email:</label>
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          required
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
        />

        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
        <button type="submit" class="filled-violet-btn">Register</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useApiUrlsStore } from "@/stores/apiUrls";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

export default {
  name: "RegisterForm",
  setup() {
    const apiUrlsStore = useApiUrlsStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const registerUser = async () => {
      try {
        const response = await fetch(apiUrlsStore.registerUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });
        if (response.ok) {
          const responseData = await response.json();
          const token = responseData.token;
          // Set JWT token as a cookie
          Cookies.set("token", token);
          console.log("Registration successful");
          router.push({ name: "Login" });
        } else {
          const errorMessage = await response.json();
          errorMessage.value = errorMessage.message;
        }
      } catch (error) {
        console.error("Error registering user:", error.message);
      }
    };

    return {
      email,
      password,
      errorMessage,
      registerUser,
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

label {
  display: block;
  margin-bottom: 5px;
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

h2 {
  margin-bottom: 20px;
  color: white;
}

.error-message {
  color: red;
}
</style>
