<template>
  <div class="container">
    <h1>Login</h1>
    <form class="login-form" @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
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
        const response = await axios.post("http://localhost:3000/auth/login", {
          email: this.email,
          password: this.password,
        });

        // Retrieve the user ID from the response data
        const userId = response.data.userId;
        console.log("User ID:", userId);

        // Store the token and user ID in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", userId);

        // Redirect to the UserPoems component
        this.$router.push("/UserPoems");
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

.error-message {
  color: var(--warning);
}

h1 {
  margin-bottom: 20px;
}
</style>
