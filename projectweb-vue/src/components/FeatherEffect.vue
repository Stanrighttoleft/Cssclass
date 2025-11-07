<template>
  <!-- Main invisible container covering the screen -->
  <div class="feather-effect" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'


const container = ref(null)

// 🪶 create one feather at a given mouse position
function createFeather(x, y) {
  const feather = document.createElement('div')
  feather.classList.add('feather')

  // random rotation and size
  const size = Math.random() * 20 + 10
  feather.style.setProperty('--size', `${size}px`)
  feather.style.left = `${x}px`
  feather.style.top = `${y}px`
  feather.style.transform = `rotate(${Math.random() * 360}deg)`

  // 🔽 Provide your image URL here (see note below)
  feather.style.backgroundImage = 'url("./assets/feather.svg")'

  container.value.appendChild(feather)

  // remove after animation
  setTimeout(() => feather.remove(), 2000)
}

// Track mouse movement
function handleMove(e) {
  createFeather(e.clientX, e.clientY)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMove)
})
</script>

<style>
/* Full-screen invisible container */
.feather-effect {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 9999;
}

/* Individual feather particle */
.feather {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.8;
  animation: floatAway 2s ease-out forwards;
}

@keyframes floatAway {
  0% {
    transform: scale(1) translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(0.5) translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}
</style>
