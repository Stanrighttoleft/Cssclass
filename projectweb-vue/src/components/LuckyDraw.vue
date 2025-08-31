<template>
  <div class="container-fluid mt-4">
    <!-- Cards area -->
    <div class="row justify-content-center cards-area">
      <div class="col-12 btnrow justify-content-center text-center mb-5">
        <button class="btn btn-primary mt-3" @click="startLottery">
          抽獎開始
        </button>
      </div>
      <div
        v-for="(res, index) in visibleResults"
        :key="index"
        class="col-12 col-md-4 col-lg-3 mb-3"
      >
        <div class="card shadow-sm" :class="getCardClass(res.rate)">
          <img :src="res.image" class="card-img-top imagesize" alt="Prize" />
          <div class="card-body text-center">
            <h5 class="card-title">第 {{ index + 1 }} 次抽獎</h5>
            <p class="card-text display-6">{{ res.rate }}</p>
            <p class="card-text text-success fw-bold">{{ res.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const results = ref(
  Array.from({ length: 10 }, () => ({
    rate: "",
    price: "",
    image: "",
    visible: false,
  }))
);

const visibleResults = computed(() =>
  results.value.filter((res) => res.visible)
);

function getPrizeText(number) {
  switch (number) {
    case 1:
      return "第一獎：禮券10000元";
    case 2:
      return "第二獎：禮券1000元";
    case 3:
      return "第三獎：禮券500元";
    default:
      return "普獎：禮券100元";
  }
}

function getPrizeImage(number) {
  switch (number) {
    case 1:
      return "/luckydraw/5.png";
    case 2:
      return "/luckydraw/4.png";
    case 3:
      return "/luckydraw/3.png";
    default:
      return "/luckydraw/2.png";
  }
}

// Return CSS class based on rate
function getCardClass(rate) {
  switch (rate) {
    case 1:
      return "gold-shadow";
    case 2:
      return "purple-shadow";
    case 3:
      return "blue-shadow";
    default:
      return "green-shadow";
  }
}

function startLottery() {
  // Reset all results
  results.value.forEach((res) => {
    res.rate = "";
    res.price = "";
    res.image = "";
    res.visible = false;
  });

  // Sequentially reveal prizes
  results.value.forEach((res, index) => {
    setTimeout(() => {
      const number = Math.floor(Math.random() * 4) + 1;
      res.rate = number;
      res.price = getPrizeText(number);
      res.image = getPrizeImage(number);
      res.visible = true; // reveal this card
    }, index * 500);
  });
}
</script>

<style scoped>
.cards-area {
  min-height: 600px;
}
.imagesize {
  width: 200px;
  height: 200px;
}

/* Box shadows for prizes */
.gold-shadow {
  box-shadow: 0 0 60px 50px gold !important;
}
.purple-shadow {
  box-shadow: 0 0 20px 5px purple !important;
}
.blue-shadow {
  box-shadow: 0 0 20px 5px blue !important;
}
.green-shadow {
  box-shadow: 0 0 20px 5px green !important;
}
.btnrow {
  height: 100px;
}
</style>
