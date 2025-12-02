<template>
  <div class="loginpage">
    <loginForm />
  </div>
</template>

<script setup>
import loginForm from "@/components/loginForm.vue";
</script>

<style>
.loginpage {
  margin-top: 110px;
  height: 80vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(/assets/loginbg.png);

  background-size: cover;
  background-blend-mode: lighten;
  background-position: center;
}
</style>
