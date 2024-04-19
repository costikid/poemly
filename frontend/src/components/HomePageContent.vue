<template>
  <div class="container">
    <h1>Welcome to Poemly</h1>
    <div class="buttons">
      <router-link to="/login"
        ><button class="filled-violet-btn">Login</button></router-link
      >
      <router-link to="/register"
        ><button class="filled-orange-btn">Register</button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePageContent",
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
