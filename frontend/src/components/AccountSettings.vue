<template>
  <div>
    <button @click="redirectToHome" class="logout-btn">Back</button>

    <h1>Update your details</h1>
    <p>Update your email</p>

    <form @submit.prevent="updateEmail">
      <label for="newEmail">New Email:</label>
      <input type="email" id="newEmail" v-model="newEmail" required />
      <button type="submit">Update Email</button>
    </form>
    <hr />
    <p>Update your password</p>

    <form @submit.prevent="changePassword">
      <label for="oldPassword">Old Password:</label>
      <input type="password" id="oldPassword" v-model="oldPassword" required />
      <label for="newPassword">New Password:</label>
      <input type="password" id="newPassword" v-model="newPassword" required />
      <button type="submit">Change Password</button>
    </form>
    <hr />
  </div>
  <a @click="deleteAccount">Delete Account</a>
</template>

<script>
import axios from "axios";
import "../shared-styles.css";

export default {
  data() {
    return {
      newEmail: "",
      oldPassword: "",
      newPassword: "",
    };
  },
  methods: {
    async updateEmail() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const response = await axios.put(
          "http://localhost:3000/api/update-details",
          { email: this.newEmail },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              userId: userId,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async changePassword() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const response = await axios.put(
          "http://localhost:3000/api/change-password",
          {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              userId: userId,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteAccount() {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const response = await axios.delete(
          "http://localhost:3000/api/delete",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              userId: userId,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    redirectToHome() {
      this.$router.push("/UserPoems");
    },
  },
};
</script>

<style scoped>
input {
  padding: 1em;
}

a {
  color: var(--warning);
}

button:hover {
  background-color: var(--light-grey);
}
</style>
