<template>
  <div class="container">
    <h2>Register</h2>
    <form class="register-form" @submit.prevent="registerUser">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        placeholder="Enter your email"
        required
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
import "../shared-styles.css";

export default {
  name: "RegisterForm",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "", // Added errorMessage data property
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await fetch("http://localhost:3000/auth/register", {
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
          this.$router.push("/login");
        } else {
          const errorMessage = await response.json();
          this.errorMessage = errorMessage.message; // Set errorMessage if registration fails
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

.error-message {
  color: var(--warning);
  margin-top: 5px;
}
</style>
