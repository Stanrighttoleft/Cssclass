<template>
  <div class="createacc container">
    <CreateAcc />
  </div>
</template>

<script setup>
import CreateAcc from "@/components/CreateAcc.vue";
</script>

<style>
.createacc {
  height: 75vh;
  margin-top: 100px;
  padding-top: 80px;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(/assets/loginbg.png);
  background-blend-mode: lighten;
  background-size: cover;
  background-position: center;
}
</style>
