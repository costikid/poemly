<template>
  <div class="settings">
    <button @click="redirectToUserPoemsPage" class="grey-btn">Back</button>

    <h1>Update your details</h1>
    <p>Update your email</p>

    <form @submit.prevent="updateEmail">
      <label for="newEmail">New Email:</label>
      <input
        type="email"
        id="newEmail"
        v-model="newEmail"
        required
        autocomplete="email"
      />
      <button type="submit">Update Email</button>
      <p v-if="emailUpdated" class="success-message">
        Email updated successfully!
      </p>
    </form>
    <hr />
    <p>Update your password</p>

    <form @submit.prevent="changePassword">
      <label for="oldPassword">Old Password:</label>
      <input type="password" id="oldPassword" v-model="oldPassword" required />
      <label for="newPassword">New Password:</label>
      <input
        autocomplete="new-password"
        type="password"
        id="newPassword"
        v-model="newPassword"
        required
      />
      <button type="submit">Change Password</button>
      <p v-if="passwordChanged" class="success-message">
        Password changed successfully!
      </p>
      <p v-if="passwordChangeError" class="error-message">
        {{ passwordChangeError }}
      </p>
    </form>
    <hr />

    <a @click="openDeleteConfirmationModal">Delete Account</a>

    <div v-if="showDeleteConfirmationModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeDeleteConfirmationModal">&times;</span>
        <p>Are you sure you want to delete your account?</p>
        <a class="delete" @click="deleteAccount">Yes</a>
        <a @click="closeDeleteConfirmationModal">No</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useApiUrlsStore } from "@/stores/apiUrls";
import axios from "axios";
import Cookies from "js-cookie"; // Import Cookies library
import { useRouter } from "vue-router";

export default {
  setup() {
    const newEmail = ref("");
    const oldPassword = ref("");
    const newPassword = ref("");
    const emailUpdated = ref(false);
    const passwordChanged = ref(false);
    const showDeleteConfirmationModal = ref(false);
    const passwordChangeError = ref("");

    const apiUrlsStore = useApiUrlsStore();
    const router = useRouter();

    const updateEmail = async () => {
      try {
        const token = Cookies.get("token"); // Retrieve token from cookies
        const userId = Cookies.get("userId"); // Retrieve userId from cookies

        await axios.put(
          apiUrlsStore.updateDetailsUrl,
          { email: newEmail.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              userId: userId,
            },
          }
        );

        // Update email in cookies
        Cookies.set("email", newEmail.value);

        emailUpdated.value = true;
      } catch (error) {
        console.error(error);
      }
    };
    const changePassword = async () => {
      try {
        const token = Cookies.get("token"); // Retrieve token from cookies
        const userId = Cookies.get("userId"); // Retrieve userId from cookies

        await axios.put(
          apiUrlsStore.changePasswordUrl,
          {
            oldPassword: oldPassword.value,
            newPassword: newPassword.value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              userId: userId,
            },
          }
        );

        passwordChanged.value = true;
        oldPassword.value = "";
        newPassword.value = "";

        // Reset passwordChangeError if the password change is successful
        passwordChangeError.value = "";
      } catch (error) {
        console.error("Error changing password:", error);
        passwordChangeError.value =
          "Error changing password. Please try again.";
      }
    };

    const deleteAccount = async () => {
      try {
        const token = Cookies.get("token"); // Retrieve token from cookies
        const userId = Cookies.get("userId"); // Retrieve userId from cookies

        await axios.delete(apiUrlsStore.deleteAccountUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            userId: userId,
          },
        });

        alert("Account deleted successfully!");
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    };

    const openDeleteConfirmationModal = () => {
      showDeleteConfirmationModal.value = true;
    };

    const closeDeleteConfirmationModal = () => {
      showDeleteConfirmationModal.value = false;
    };

    const redirectToUserPoemsPage = () => {
      router.push({ name: "UserPoems" });
    };

    return {
      newEmail,
      oldPassword,
      newPassword,
      emailUpdated,
      passwordChanged,
      showDeleteConfirmationModal,
      updateEmail,
      changePassword,
      deleteAccount,
      openDeleteConfirmationModal,
      closeDeleteConfirmationModal,
      redirectToUserPoemsPage,
      passwordChangeError,
    };
  },
};
</script>

<style scoped>
.settings {
  background: linear-gradient(to bottom right, #333333, #666666);
  padding: 1em;
}

h1,
p,
label {
  color: var(--light);
}
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

a {
  padding: 1em;
  color: var(--light);
}

.delete {
  text-decoration: none;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

button:hover {
  background-color: var(--light-grey);
}

form {
  background: var(--grey-background);
  backdrop-filter: var(--glass-filter);
  max-width: 50%;
  padding: 0.5em;
  margin-left: 10px;
  color: var(--light);
}
</style>
