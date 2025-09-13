<template>
  <div>
    <!-- Slide-out container (menu + tab) -->
    <motion.div
      class="side-wrapper d-none d-md-flex"
      :initial="{ x: -100}"
      :animate="isOpen ? { x: -100 } : { x: 0 }"
      :transition="{ type: 'spring', stiffness: 250, damping: 20 }"
    >
      <!-- Side Menu -->
      <div class="side-menu shadow-lg bg-secondary ">
        <div class="menu-content p-3">
          <h5 class="mb-3">Navigation</h5>
          <ul class="list-unstyled">
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/about">About</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
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
import { ref } from 'vue'
import { motion } from 'motion-v'

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
</script>



<style scoped>
/* Wrapper that slides (menu + tab) */
.side-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 260px; /* 220 (menu) + 40 (tab) */
  display: flex;
  flex-direction: row;
  z-index: 1000;
}

/* Side Menu */
.side-menu {
  width: 100px;
  height: 100vh;
  background-color: white;
  border-right: 1px solid #ccc;
}

/* Tab */
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




