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
export default {
  data() {
    return {
      selectedSort: "asc",
    };
  },
  methods: {
    sortPoems() {
      this.$emit("sort-poems", this.selectedSort);
    },
  },
};
</script>

<style scoped>
select {
  padding: 0.5em;
}
</style>
