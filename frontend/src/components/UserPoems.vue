<template>
  <div class="container">
    <button @click="logout" class="grey-btn">Logout</button>
    <a @click="goToUpdateDetails" class="update-details-btn"> Your account </a>
    <button class="inspiration-btn" @click="redirectToInspiration">
      Need inspiration?
    </button>

    <h2>Your Poems</h2>
    <SortByDate @sort-poems="sortPoems" />
    <Search @search="searchPoems" />

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
    const userId = ref(null);
    const newPoem = ref({ title: "", content: "" });
    const sortBy = ref("asc");
    const showNewPoemForm = ref(false);
    const searchQuery = ref("");
    const router = useRouter();

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
        const token = localStorage.getItem("token");
        userId.value = localStorage.getItem("userId");
        const response = await axios.get(
          `${apiUrlsStore.userPoemsUrl}/${userId.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

    const savePoem = async (poemData) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          apiUrlsStore.singlePoemUrl,
          {
            title: poemData.title,
            content: poemData.content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        poems.value.push(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const editPoem = (poem) => {
      poem.editing = true;
      poem.editedTitle = poem.title;
      poem.editedContent = poem.content;
    };

    const saveEditedPoem = async (poem) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${apiUrlsStore.singlePoemUrl}/${poem._id}`,
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
        const updatedPoemIndex = poems.value.findIndex(
          (p) => p._id === poem._id
        );
        poems.value[updatedPoemIndex] = response.data;
        poem.editing = false;
      } catch (error) {
        console.error(error);
      }
    };

    const deletePoem = async (poemId) => {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${apiUrlsStore.singlePoemUrl}/${poemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        poems.value = poems.value.filter((poem) => poem._id !== poemId);
      } catch (error) {
        console.error(error);
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    const redirectToInspiration = () => {
      router.push({ name: "Inspiration" });
    };

    const goToUpdateDetails = () => {
      router.push({ name: "AccountSettings" });
    };

    const logout = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.post(apiUrlsStore.logoutUrl, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        if (router) {
          router.push({ name: "Login" });
        } else {
          console.error("Router instance not available.");
        }
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
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

    // Load poems when the component is mounted
    onMounted(() => {
      if (
        router.currentRoute.value.meta &&
        router.currentRoute.value.meta.emitLoadPoems
      ) {
        loadPoems();
      }
    });

    return {
      poems,
      userId,
      newPoem,
      sortBy,
      showNewPoemForm,
      searchQuery,
      sortedPoems,
      filteredPoems,
      loadPoems,
      savePoem,
      editPoem,
      saveEditedPoem,
      deletePoem,
      formatDate,
      redirectToInspiration,
      goToUpdateDetails,
      logout,
      sortPoems,
      toggleNewPoemForm,
      closeNewPoemForm,
      cancelEdit,
      searchPoems,
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
</style>
