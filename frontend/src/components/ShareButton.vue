<template>
  <a @click="share" class="share-btn">Share</a>
</template>
<script>
export default {
  props: {
    title: String,
    content: String,
  },
  methods: {
    async share() {
      try {
        if (navigator.share) {
          await navigator.share({
            title: this.title,
            text: this.content,
          });
        } else {
          this.shareViaEmail();
        }
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    },
    shareViaEmail() {
      const emailSubject = encodeURIComponent(
        `Check out this poem: ${this.title}`
      );
      const emailBody = encodeURIComponent(this.content);
      window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    },
  },
};
</script>

<style scoped>
a {
  padding: 1em;
}
</style>
