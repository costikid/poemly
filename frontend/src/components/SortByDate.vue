<template>
  <div class="sort-by-date">
    <label class="by-date" for="sort">Sort by Date </label>
    <select
      class="sort-dropdown"
      v-model="selectedSort"
      @change="sortPoems"
      id="sort"
    >
      <option value="asc">Oldest First</option>
      <option value="desc">Newest First</option>
    </select>
  </div>
</template>

<script>
import "../shared-styles.css";

import { ref } from "vue";

export default {
  setup(props, { emit }) {
    const selectedSort = ref("asc");

    const sortPoems = () => {
      emit("sort-poems", selectedSort.value);
    };

    return {
      selectedSort,
      sortPoems,
    };
  },
};
</script>

<style scoped>
select {
  padding: 0.5em;
}

.sort-by-date {
  z-index: 1;
  width: 200px;
}

.by-date {
  color: var(--light);
  padding: 0.2em;
}

.sort-by-date {
  border-radius: 10px;
  background: var(--grey-background);
  backdrop-filter: var(--glass-filter);
  max-width: 50%;
  padding: 0.5em;
  margin-left: 10px;
}

@media (max-width: 767px) {
  .sort-by-date {
    max-width: 100%;
    padding: 0.2em;
  }
}

.sort-dropdown {
  padding: 0.2em;
  margin-left: 4px;
}
</style>
