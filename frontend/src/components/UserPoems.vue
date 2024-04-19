<template>
  <div class="container">
    <!-- Existing code for user actions -->
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
import axios from "axios";
import SortByDate from "./SortByDate.vue";
import NewPoemForm from "./NewPoemForm.vue";
import Search from "./SearchPoems.vue";
import "../shared-styles.css";

export default {
  name: "UserPoems",
  components: {
    SortByDate,
    NewPoemForm,
    Search,
  },
  data() {
    return {
      poems: [],
      userId: null,
      newPoem: {
        title: "",
        content: "",
      },
      sortBy: "asc",
      showNewPoemForm: false,
      searchQuery: "",
    };
  },
  async created() {
    console.log("Component created");
    await this.loadPoems();
  },
  computed: {
    sortedPoems() {
      if (this.sortBy === "asc") {
        return this.poems
          .slice()
          .sort((a, b) => new Date(a.writtenDate) - new Date(b.writtenDate));
      } else {
        return this.poems
          .slice()
          .sort((a, b) => new Date(b.writtenDate) - new Date(a.writtenDate));
      }
    },
    filteredPoems() {
      if (!this.searchQuery) {
        return this.sortedPoems;
      } else {
        const searchTerm = this.searchQuery.toLowerCase();
        return this.sortedPoems.filter(
          (poem) =>
            poem.title.toLowerCase().includes(searchTerm) ||
            poem.content.toLowerCase().includes(searchTerm)
        );
      }
    },
  },
  methods: {
    async loadPoems() {
      try {
        const token = localStorage.getItem("token");
        this.userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:3000/api/poems/user/${this.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.poems = response.data.map((poem) => ({
          ...poem,
          editing: false,
          editedTitle: poem.title,
          editedContent: poem.content,
        }));
      } catch (error) {
        console.error(error);
      }
    },
    async savePoem(poemData) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3000/api/poems",
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
        this.poems.push(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editPoem(poem) {
      poem.editing = true;
      poem.editedTitle = poem.title;
      poem.editedContent = poem.content;
    },
    async saveEditedPoem(poem) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.put(
          `http://localhost:3000/api/poems/${poem._id}`,
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
        const updatedPoemIndex = this.poems.findIndex(
          (p) => p._id === poem._id
        );
        this.poems[updatedPoemIndex] = response.data;
        poem.editing = false;
      } catch (error) {
        console.error(error);
      }
    },
    async deletePoem(poemId) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/poems/${poemId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.poems = this.poems.filter((poem) => poem._id !== poemId);
      } catch (error) {
        console.error(error);
      }
    },

    redirectToInspiration() {
      this.$router.push("/inspiration");
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    goToUpdateDetails() {
      this.$router.push("/account-settings");
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.$router.push("/login");
    },
    sortPoems(sortOrder) {
      this.sortBy = sortOrder;
    },
    toggleNewPoemForm() {
      this.showNewPoemForm = !this.showNewPoemForm;
    },
    closeNewPoemForm() {
      this.showNewPoemForm = false;
    },
    cancelEdit(poem) {
      poem.editing = false;
    },
    searchPoems(query) {
      this.searchQuery = query;
    },
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
