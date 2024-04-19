<template>
  <div class="new-poem-form">
    <form @submit.prevent="saveNewPoem">
      <label for="newTitle">Title:</label>
      <input type="text" id="newTitle" v-model="newTitle" required />
      <label for="newContent">Content:</label>
      <textarea
        id="newContent"
        v-model="newContent"
        class="content-textarea"
        required
      ></textarea>
      <button type="submit" class="filled-violet-btn">Save</button>
      <button type="button" @click="cancelNewPoem">Cancel</button>
    </form>
  </div>
</template>

<script>
import "../shared-styles.css";

export default {
  data() {
    return {
      newTitle: "",
      newContent: "",
    };
  },
  methods: {
    saveNewPoem() {
      this.$emit("save-poem", {
        title: this.newTitle,
        content: this.newContent,
      });
      this.newTitle = "";
      this.newContent = "";
      this.$emit("close-form");
    },
    cancelNewPoem() {
      this.newTitle = "";
      this.newContent = "";
      this.$emit("close-form");
    },
  },
};
</script>

<style scoped>
.new-poem-form {
  margin-bottom: 20px;
}

.content-textarea {
  height: 300px;
}
</style>
