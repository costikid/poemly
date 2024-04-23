<template>
  <div class="random-quote-container">
    <div class="background-image"></div>
    <div class="overlay"></div>
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
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const quote = ref("");
    const author = ref("");
    const router = useRouter();

    const fetchRandomQuote = async () => {
      try {
        const response = await fetch("https://api.quotable.io/random");
        const quoteData = await response.json();
        quote.value = quoteData.content;
        author.value = quoteData.author;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAndEmitNewQuote = () => {
      fetchRandomQuote();
    };

    const copyQuote = () => {
      const quoteWithAuthor = `${quote.value} - ${author.value}`;
      const textarea = document.createElement("textarea");
      textarea.value = quoteWithAuthor;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Quote copied to clipboard!");
    };

    const redirectToHome = () => {
      router.push({ name: "UserPoems" });
    };

    fetchRandomQuote();

    return {
      quote,
      author,
      fetchAndEmitNewQuote,
      copyQuote,
      redirectToHome,
    };
  },
};
</script>

<style scoped>
.random-quote-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--grey-background);
  backdrop-filter: var(--glass-filter);
  padding: 0.5em;
  z-index: 3;
}
</style>
