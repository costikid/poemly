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
import { ref } from "vue";
import "../shared-styles.css";

export default {
  setup(props, { emit }) {
    const newTitle = ref("");
    const newContent = ref("");

    const saveNewPoem = () => {
      emit("save-poem", {
        title: newTitle.value,
        content: newContent.value,
      });
      newTitle.value = "";
      newContent.value = "";
      emit("close-form");
    };

    const cancelNewPoem = () => {
      newTitle.value = "";
      newContent.value = "";
      emit("close-form");
    };

    return {
      newTitle,
      newContent,
      saveNewPoem,
      cancelNewPoem,
    };
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
