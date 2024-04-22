<template>
  <div class="sort-by-date">
    <label for="sort">Sort by Date </label>
    <select v-model="selectedSort" @change="sortPoems" id="sort">
      <option value="asc">Oldest First</option>
      <option value="desc">Newest First</option>
    </select>
  </div>
</template>

<script>
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
</style>
