<template>
  <div>
    <!-- Slide-out container (menu + tab) -->
    <motion.div
      class="side-wrapper"
      :initial="{ x: -200 }"
      :animate="isOpen ? { x: 0 } : { x: -200 }"
      :transition="{ type: 'spring', stiffness: 100, damping: 20 }"
    >
      <!-- Side Menu -->
      <div class="side-menu shadow-lg bg-secondary">
        <div class="menu-content p-3">
          <ul class="list-unstyled">
            <li><RouterLink to="/">團購首頁</RouterLink></li>
            <li><RouterLink to="/memo">購貨須知</RouterLink></li>
            <li><RouterLink to="/products">商品瀏覽</RouterLink></li>
            <li><RouterLink to="/contact">聯絡我們</RouterLink></li>
          </ul>
        </div>
      </div>
      <!-- Tab (attached to the menu) -->
      <div
        class="side-tab d-flex align-items-center justify-content-center"
        @click="toggleMenu"
      >
        <span class="rotate-text">Menu</span>
      </div>
    </motion.div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { motion } from "motion-v";
const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>
<style scoped>
/* Wrapper that slides (menu + tab) */
.side-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 230px; /* 220 (menu) + 40 (tab) */
  display: flex;
  flex-direction: row;
  z-index: 10;
} /* Side Menu */
.side-menu {
  width: 200px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid #ccc;
} /* Tab */
.side-tab {
  width: 40px;
  height: 100px;
  background-color: #343a40;
  color: white;
  cursor: pointer;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: calc(50vh - 50px); /* Vertically center the tab */
}
.rotate-text {
  transform: rotate(-90deg);
  font-weight: bold;
  white-space: nowrap;
}
</style>