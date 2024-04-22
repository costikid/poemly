<template>
  <div class="container">
    <h1>Welcome to Poemly</h1>
    <div class="buttons">
      <button @click="redirectToLogin" class="filled-violet-btn">Login</button>
      <button @click="redirectToRegister" class="filled-orange-btn">
        Register
      </button>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "HomePageContent",
  setup() {
    const router = useRouter();

    const redirectToLogin = () => {
      router.push({ name: "Login" });
    };

    const redirectToRegister = () => {
      router.push({ name: "Register" });
    };

    return {
      redirectToLogin,
      redirectToRegister,
    };
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: center;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
</style>
