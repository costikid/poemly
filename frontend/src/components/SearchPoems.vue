<!-- Search.vue -->
<template>
  <input type="text" v-model="searchQuery" placeholder="Search your poems..." />
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  watch: {
    searchQuery(newVal) {
      this.$emit("search", newVal);
    },
  },
};
</script>
