import { defineStore } from "pinia";
import { ref } from "vue";
import request from "@/api/request"; // axios instance

export const useMessageStore = defineStore("message", () => {
  const sending = ref(false);
  const error = ref(null);
  const success = ref(null);

  async function sendMessage(messageData) {
    sending.value = true;
    error.value = null;
    success.value = null;
    try {
      const res = await request.post("/message.php", messageData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success) {
        success.value = res.data.message;
      } else {
        error.value = res.data.message;
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      sending.value = false;
    }
  }

  return {
    sending,
    error,
    success,
    sendMessage,
  };
});