<template>
  <a @click="share" class="share-btn">Share</a>
</template>

<script>
export default {
  props: {
    title: String,
    content: String,
  },
  setup(props) {
    const share = async () => {
      try {
        if (navigator.share) {
          await navigator.share({
            title: props.title,
            text: props.content,
          });
        } else {
          shareViaEmail(props.title, props.content);
        }
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    };

    const shareViaEmail = (title, content) => {
      const emailSubject = encodeURIComponent(`Check out this poem: ${title}`);
      const emailBody = encodeURIComponent(content);
      window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    };

    return {
      share,
    };
  },
};
</script>

<style scoped>
a {
  padding: 1em;
}
</style>
