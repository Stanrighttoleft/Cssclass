<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-5 offset-3 col-xxl-6">
        <div class="card" style="width: 18rem">
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body">
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card’s content.
            </p>
          </div>
        </div>
        <p style="font-size: 100px">{{ lottery }}</p>
        <button class="btn btn-secondary text-white" @click="getPrize">
          抽獎
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const lottery = ref(1);
let count = 0;
let intervalId = null;

// Utility function to generate random numbers
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getPrize() {
  count = 0;

  intervalId = setInterval(() => {
    if (count < 30) {
      lottery.value = rand(1, 4);
      count++;
    } else {
      clearInterval(intervalId);
      showPrize();
    }
  }, 100);
}

function showPrize() {
  switch (lottery.value.toString()) {
    case "1":
      alert("恭喜!抽中第一獎：禮券10000元");
      break;
    case "2":
      alert("恭喜!抽中第二獎：禮券1000元");
      break;
    case "3":
      alert("恭喜!抽中第三獎：禮券500元");
      break;
    default:
      alert("恭喜!抽中普獎：禮券100元");
  }
}
</script>

<style></style>
