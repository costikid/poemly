<template>
  <div class="search">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search your poems..."
    />
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  setup(props, { emit }) {
    const searchQuery = ref("");

    watch(searchQuery, (newVal) => {
      emit("search", newVal);
    });

    return {
      searchQuery,
    };
  },
};
</script>

<style scoped>
input {
  border-radius: 10px;
  background: var(--grey-background);
  backdrop-filter: var(--glass-filter);
  max-width: 100vw;
  padding: 0.5em;
}

@media (max-width: 768px) {
  input {
    margin-left: 2px;
  }

  .search {
    padding: 1em;
  }
}
</style>
