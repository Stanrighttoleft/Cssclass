<template>
  <motion.div
    :class="[
      { active: startAnim },
      'footerdiv position-relative  container-fluid bg-secondary text-white pt-3',
    ]"
    :initial="{ opacity: 0 }"
    :whileInView="{ opacity: 1 }"
    @viewport-enter="startAnim = true"
    @viewport-leave="startAnim = false"
  >
    <div class="row">
      <div class="col-md-3 col-xxl-2 offset-xxl-2">掃我到客服</div>
      <div class="col-md-3 col-xxl-2">
        <img class="img-fluid" src="/assets/logov12.png" alt="" />
      </div>
      <div class="col-md-6 col-xxl-4 d-flex justify-content-center">
        <ul class="list-unstyled">
          <RouterLink to="/likeus" class="text-decoration-none"
            ><li class="text-white text-decoration-none">
              兔兔抽獎十連抽模擬
            </li></RouterLink
          >
          <RouterLink to="/lottery" class="text-decoration-none"
            ><li class="text-white">PowerBall抽獎模擬</li></RouterLink
          >
          <li class="">購物流程</li>
          <li class="">隱私權聲明</li>
          <li class="">會員條款</li>
          <li class="">FAQ問與答</li>
          <li class="">聯絡我們</li>
          <li class=" ">追蹤澳丁</li>
        </ul>
      </div>
    </div>
    <hr />
    <div class="d-flex justify-content-center">copyright</div>
  </motion.div>
</template>

<script setup>
import { ref } from "vue";
import { motion } from "motion-v";
import { RouterLink } from "vue-router";

const startAnim = ref(false);
</script>

<style>
.footerdiv::after,
.footerdiv::before {
  content: "";
  position: absolute;
  display: block;
  background-image: url("/assets/footer.png");
  background-size: auto 100%;
  gap: 0;
  width: 100%;
  height: 120px;
  background-repeat: repeat-x;
  margin: 0;
  padding: 0;
  bottom: 98%;
  left: 0;
  z-index: 0;
}
.footerdiv.active::before {
  animation: pulse1 6s ease-in-out;
}
.footerdiv.active::after {
  animation: pulse2 6s ease-in-out;
}

@keyframes pulse1 {
  0% {
    background-position-x: 0;
  }
  50% {
    background-position-x: -1200px;
  }
  100% {
    background-position-x: 0;
  }
}
@keyframes pulse2 {
  0% {
    background-position-x: -300px;
  }
  50% {
    background-position-x: -900px;
  }
  100% {
    background-position-x: 0;
  }
}
</style>
