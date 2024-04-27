<template>
  <div class="main-auth-container">
    <div class="background-image"></div>
    <div class="overlay"></div>
    <div class="auth-container glass-effect">
      <h1>Register</h1>
      <form @submit.prevent="registerUser" class="auth-form">
        <label for="email">Email:</label>
        <input
          autocomplete="email"
          type="email"
          v-model="email"
          placeholder="Email"
          required
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
        />

        <label for="password">Password</label>
        <input
          autocomplete="new-password"
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
          @input="isTypingPassword = true"
        />

        <div class="password-strength-meter" v-if="isTypingPassword">
          <span v-if="passwordStrength === 0" class="strength-label"
            >Very Weak</span
          >
          <span v-else-if="passwordStrength === 1" class="strength-label"
            >Weak</span
          >
          <span v-else-if="passwordStrength === 2" class="strength-label"
            >Fair</span
          >
          <span v-else-if="passwordStrength === 3" class="strength-label"
            >Strong</span
          >
        </div>

        <button type="submit" class="filled-orange-btn">Register</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
      <p>
        Have an account?<br />
        <router-link to="/login" class="form-link">Log in</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useApiUrlsStore } from "@/stores/apiUrls";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import zxcvbn from "zxcvbn";

export default {
  name: "RegisterForm",
  setup() {
    const apiUrlsStore = useApiUrlsStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const isTypingPassword = ref(false); // New boolean flag

    const passwordStrength = computed(() => {
      return zxcvbn(password.value).score;
    });

    const passwordStrengthText = computed(() => {
      if (passwordStrength.value === 0) return "Very Weak";
      if (passwordStrength.value === 1) return "Weak";
      if (passwordStrength.value === 2) return "Fair";
      if (passwordStrength.value === 3) return "Strong";
      return "";
    });

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
        } else if (response.status === 409) {
          errorMessage.value = "User already exists. Please login instead.";
        } else {
          const errorMessageResponse = await response.json();
          errorMessage.value = errorMessageResponse.message;
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
      passwordStrength,
      passwordStrengthText,
      isTypingPassword,
    };
  },
};
</script>

<style scoped>
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
}

label {
  color: var(--light);
}

.password-strength-meter {
  height: 2em;
  margin-bottom: 10px;
}

.password-strength-meter span {
  color: var(--light);
}

form {
  width: 15em;
}
</style>
