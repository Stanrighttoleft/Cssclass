import { defineStore } from "pinia";
import { ref } from "vue";

export const useUIStore = defineStore("uiStore", () => {
  const showNavbar = ref(true);
  const openingFinished = ref(true);

  return { showNavbar, openingFinished };
});
