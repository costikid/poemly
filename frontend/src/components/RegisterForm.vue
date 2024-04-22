<template>
  <div class="container">
    <h2>Register</h2>
    <form class="register-form" @submit.prevent="registerUser">
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
</template>

<script>
import { REGISTER_URL } from "../authConfig.js";
import "../shared-styles.css";

export default {
  name: "RegisterForm",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await fetch(REGISTER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        });
        if (response.ok) {
          console.log("Registration successful");
          this.$router.push({ name: "Login" });
        } else {
          const errorMessage = await response.json();
          this.errorMessage = errorMessage.message;
        }
      } catch (error) {
        console.error("Error registering user:", error.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}

.register-form {
  display: inline-block;
  text-align: left;
  max-width: 300px;
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
</style>
