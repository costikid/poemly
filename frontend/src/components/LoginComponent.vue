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
import axios from "axios";
import { LOGIN_URL } from "../authConfig.js";
import "../shared-styles.css";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(LOGIN_URL, {
          email: this.email,
          password: this.password,
        });

        // Retrieve the user ID from the response data
        const userId = response.data.userId;
        console.log("User ID:", userId);

        // Store the token and user ID in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", userId);

        this.$router.push({ name: "UserPoems" });
      } catch (error) {
        console.error(error);
        this.errorMessage = "Invalid email or password.";
      }
    },
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
