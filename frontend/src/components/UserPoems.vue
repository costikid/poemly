<template>
  <div class="container">
    <div class="background-image"></div>
    <div class="overlay"></div>

    <button @click="logout" class="grey-btn">Logout</button>
    <a @click="goToUpdateDetails" class="update-details-btn"> Your account </a>
    <button class="inspiration-btn" @click="redirectToInspiration">
      Need inspiration?
    </button>

    <h2>Your Poems</h2>
    <div class="sort-and-search">
      <SortByDate @sort-poems="sortPoems" />
      <Search @search="searchPoems" />
    </div>

    <div @click="toggleNewPoemForm" class="add-poem-toggle">Add New Poem</div>
    <hr />
    <NewPoemForm
      v-if="showNewPoemForm"
      @save-poem="savePoem"
      @close-form="closeNewPoemForm"
    />

    <div v-for="poem in filteredPoems" :key="poem._id" class="poem-container">
      <div v-if="!poem.editing">
        <h3>{{ poem.title }}</h3>
        <p>{{ poem.content }}</p>
        <p>{{ formatDate(poem.writtenDate) }}</p>
        <button @click="editPoem(poem)" class="edit-btn">Edit</button>
        <button @click="deletePoem(poem._id)" class="delete-btn">Delete</button>
        <ShareButton :title="poem.title" :content="poem.content" />
      </div>
      <div v-else>
        <form @submit.prevent="saveEditedPoem(poem)" class="edit-form">
          <label for="editedTitle">Title:</label>
          <input
            type="text"
            id="editedTitle"
            v-model="poem.editedTitle"
            required
          />
          <label for="editedContent">Content:</label>
          <textarea
            id="editedContent"
            v-model="poem.editedContent"
            required
            class="content-textarea"
          ></textarea>
          <button type="submit" class="filled-violet-btn">Save</button>
          <button @click="cancelEdit(poem)">Cancel</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useApiUrlsStore } from "@/stores/apiUrls";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

import SortByDate from "./SortByDate.vue";
import NewPoemForm from "./NewPoemForm.vue";
import Search from "./SearchPoems.vue";
import ShareButton from "./ShareButton.vue";

import "../shared-styles.css";

export default {
  name: "UserPoems",
  components: {
    SortByDate,
    NewPoemForm,
    Search,
    ShareButton,
  },
  setup() {
    const apiUrlsStore = useApiUrlsStore();
    const poems = ref([]);
    const sortBy = ref("asc");
    const showNewPoemForm = ref(false);
    const searchQuery = ref("");
    const router = useRouter();

    const userId = computed(() => apiUrlsStore.userId);

    const sortedPoems = computed(() => {
      if (sortBy.value === "asc") {
        return poems.value
          .slice()
          .sort((a, b) => new Date(a.writtenDate) - new Date(b.writtenDate));
      } else {
        return poems.value
          .slice()
          .sort((a, b) => new Date(b.writtenDate) - new Date(a.writtenDate));
      }
    });

    const filteredPoems = computed(() => {
      if (!searchQuery.value) {
        return sortedPoems.value;
      } else {
        const searchTerm = searchQuery.value.toLowerCase();
        return sortedPoems.value.filter(
          (poem) =>
            poem.title.toLowerCase().includes(searchTerm) ||
            poem.content.toLowerCase().includes(searchTerm)
        );
      }
    });
    const loadPoems = async () => {
      try {
        const token = Cookies.get("token");
        let userIdValue = userId.value;

        // Check if userId is not set or null, then try to retrieve it from cookies
        if (!userIdValue || userIdValue === "null") {
          userIdValue = Cookies.get("userId");
          apiUrlsStore.userId = userIdValue; // Assign userId directly to the store's state
        }

        if (!userIdValue) {
          console.error("User ID not found in cookies.");
          return;
        }

        const response = await axios.get(apiUrlsStore.userPoemsUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        poems.value = response.data.map((poem) => ({
          ...poem,
          editing: false,
          editedTitle: poem.title,
          editedContent: poem.content,
        }));
      } catch (error) {
        console.error(error);
      }
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const logout = async () => {
      try {
        const token = Cookies.get("token");
        await axios.post(apiUrlsStore.logoutUrl, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Cookies.remove("token");
        Cookies.remove("userId");

        // Reset userId in the Pinia store
        apiUrlsStore.userId = null;

        if (router) {
          router.push({ name: "Login" });
        } else {
          console.error("Router instance not available.");
        }
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    };

    const redirectToInspiration = () => {
      router.push({ name: "Inspiration" });
    };

    const goToUpdateDetails = () => {
      router.push({ name: "AccountSettings" });
    };

    const sortPoems = (sortOrder) => {
      sortBy.value = sortOrder;
    };

    const toggleNewPoemForm = () => {
      showNewPoemForm.value = !showNewPoemForm.value;
    };

    const closeNewPoemForm = () => {
      showNewPoemForm.value = false;
    };

    const cancelEdit = (poem) => {
      poem.editing = false;
    };

    const searchPoems = (query) => {
      searchQuery.value = query;
    };

    const savePoem = async (poemData) => {
      try {
        const token = Cookies.get("token");
        const response = await axios.post(
          apiUrlsStore.savePoemUrl,
          {
            userId: userId.value,
            ...poemData,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newPoem = {
          ...response.data,
          editing: false,
          editedTitle: response.data.title,
          editedContent: response.data.content,
        };
        poems.value.push(newPoem);

        closeNewPoemForm();
      } catch (error) {
        console.error("Error saving poem:", error);
      }
    };

    const editPoem = (poem) => {
      poem.editing = true;
    };

    const saveEditedPoem = async (poem) => {
      try {
        const token = Cookies.get("token");
        const response = await axios.put(
          apiUrlsStore.updatePoemUrl(poem._id), // Pass poemId here
          {
            title: poem.editedTitle,
            content: poem.editedContent,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const index = poems.value.findIndex((p) => p._id === poem._id);
          if (index !== -1) {
            poems.value[index].title = poem.editedTitle;
            poems.value[index].content = poem.editedContent;
            poems.value[index].editing = false;
          }
          cancelEdit(poem);
        } else {
          console.error("Failed to save edited poem.");
        }
      } catch (error) {
        console.error("Error saving edited poem:", error);
      }
    };

    const deletePoem = async (poemId) => {
      try {
        const token = Cookies.get("token");
        const response = await axios.delete(
          apiUrlsStore.updatePoemUrl(poemId), // Pass poemId here
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          poems.value = poems.value.filter((p) => p._id !== poemId);
        } else {
          console.error("Failed to delete poem.");
        }
      } catch (error) {
        console.error("Error deleting poem:", error);
      }
    };

    onMounted(() => {
      loadPoems();
    });

    return {
      poems,
      userId,
      sortBy,
      showNewPoemForm,
      searchQuery,
      sortedPoems,
      filteredPoems,
      logout,
      redirectToInspiration,
      goToUpdateDetails,
      sortPoems,
      toggleNewPoemForm,
      closeNewPoemForm,
      cancelEdit,
      searchPoems,
      formatDate,
      savePoem,
      editPoem,
      saveEditedPoem,
      loadPoems,

      deletePoem,
    };
  },
};
</script>

<style scoped>
.edit-form {
  margin-top: 10px;
}

.content-textarea {
  height: 200px;
}

.edit-btn {
  border: 1px solid var(--orange-dark);
  background-color: var(--light);
  color: var(--orange-dark);
  margin-right: 10px;
}

.edit-btn:hover {
  border: 1px solid var(--orange-light);
}

.delete-btn {
  border: 1px solid var(--violet-dark);
  background-color: var(--light);
  color: var(--violet-light);
}
.delete-btn:hover {
  border: 1px solid var(--violet-light);
}

.add-poem-toggle {
  text-decoration: underline;
  cursor: var(--link-cursor);
  padding-top: 1em;
}
.inspiration-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;

  background-color: var(--violet-dark);
  color: var(--light);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.inspiration-btn:hover {
  transform: translateY(-5px);
}

.container {
  position: relative;
  width: 100%;
  min-height: 100vh;
}

.SortByDate,
.NewPoemForm,
.Search,
.ShareButton {
  position: relative;
  z-index: 2;
}

.add-poem-toggle {
  position: relative;
  z-index: 2;
}

h2 {
  color: var(--light);
  padding: 1em;
}

.sort-and-search {
  display: flex;
  align-items: center;
}

.sort-and-search > * {
  margin-right: 20px;
}
</style>
