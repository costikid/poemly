<template>
  <div class="container">
    <div class="background-image"></div>
    <div class="overlay"></div>
    <div class="content">
      <h1>Welcome to Poemly</h1>
      <h2>Where simplicity reigns</h2>
      <p>
        Focus solely on crafting, editing, and deleting your poems, notes, and
        thoughts, free from distractions.
      </p>
      <div class="buttons">
        <button @click="redirectToLogin" class="filled-violet-btn">
          Login
        </button>
        <button @click="redirectToRegister" class="filled-orange-btn">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import "../shared-styles.css";

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
body,
html {
  margin: 0;
  padding: 0;
}

.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  z-index: 1;
  text-align: center;
  color: var(--light);
}

.buttons {
  margin-top: 20px;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

h1 {
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: typing 3.5s steps(30, end);
  padding-top: 1em;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@media (max-width: 767px) {
  h1 {
    font-size: 24px;
  }
}
</style>
