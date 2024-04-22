<script>
import { ref } from "vue";
import axios from "axios";
import { useApiUrlsStore } from "@/stores/apiUrls";
import { useRouter } from "vue-router";
import { Cookies } from "vue3-cookies"; // Import Cookies from vue3-cookies

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const apiUrlsStore = useApiUrlsStore();
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post(apiUrlsStore.loginUrl, {
          email: email.value,
          password: password.value,
        });

        // Retrieve the user ID from the response data
        const userId = response.data.userId;
        console.log("User ID:", userId);

        // Set cookies after successful login
        Cookies.set("token", response.data.token);
        Cookies.set("userId", userId);

        // Navigate to the UserPoems component
        router.push({ name: "UserPoems" });

        // Load poems after successful login
        // Emit a custom event to trigger the loadPoems function in the UserPoems component
        router.currentRoute.value.meta.emitLoadPoems();
      } catch (error) {
        console.error(error);
        errorMessage.value = "Invalid email or password.";
      }
    };

    return {
      email,
      password,
      errorMessage,
      login,
    };
  },
};
</script>
