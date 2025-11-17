import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('uiStore', () => {
  const showNavbar = ref(false);
  const openingFinished = ref(false);

  return { showNavbar, openingFinished };
});