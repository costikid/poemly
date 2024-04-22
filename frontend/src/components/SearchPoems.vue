<template>
  <input type="text" v-model="searchQuery" placeholder="Search your poems..." />
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
