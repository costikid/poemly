<template>
  <div class="random-quote-container">
    <button @click="redirectToHome" class="grey-btn">Back</button>

    <h3>Inspiration</h3>

    <p>{{ quote }}</p>
    <p>- {{ author }}</p>
    <button @click="fetchAndEmitNewQuote" class="filled-violet-btn">
      Get New Quote
    </button>
    <button @click="copyQuote" class="filled-orange-btn">Copy Quote</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quote: "",
      author: "",
    };
  },
  methods: {
    async fetchRandomQuote() {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const quoteData = await response.json();
        this.quote = quoteData.content;
        this.author = quoteData.author;
      } catch (error) {
        console.error(error);
      }
    },
    fetchAndEmitNewQuote() {
      this.fetchRandomQuote();
    },
    copyQuote() {
      const quoteWithAuthor = `${this.quote} - ${this.author}`;
      const textarea = document.createElement("textarea");
      textarea.value = quoteWithAuthor;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Quote copied to clipboard!");
    },
    redirectToHome() {
      this.$router.push("/UserPoems");
    },
  },
  created() {
    this.fetchRandomQuote();
  },
};
</script>

<style scoped>
.random-quote-container {
  margin-top: 20px;
}
</style>
