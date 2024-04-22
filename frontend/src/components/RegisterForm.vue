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
import { ref } from "vue";
import { useApiUrlsStore } from "@/stores/apiUrls";
import { useRouter } from "vue-router"; // Import useRouter from Vue Router

export default {
  name: "RegisterForm",
  setup() {
    const apiUrlsStore = useApiUrlsStore();
    const router = useRouter(); // Access the router instance
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
          console.log("Registration successful");
          // Redirect to login page after successful registration
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
