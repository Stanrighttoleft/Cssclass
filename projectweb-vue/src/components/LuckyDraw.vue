<template>
  <div class="container-fluid mt-5 luckydrawcontainer">
    <img 
  v-if="showFish" 
  src="/luckydraw/fish.svg" 
  class="flying-fish" 
  @animationend="showFish = false"
/>
     <div 
      class="background-overlay" 
      :style="{ backgroundColor: overlayColor }"
    ></div>
    <!-- Cards area -->
    <div class="row justify-content-center cards-area">
      <div class="col-12 btnrow justify-content-center text-center mb-5">
        
          <motion.button class="btn btn-primary mt-3" @click="startLottery"
         
          :while-hover="{
              scale:1.5,
              transition:{duration:0.5},
              
          }"
          
          >
            抽獎開始
          </motion.button>
        
      </div>
      <div
        v-for="(res, index) in visibleResults"
        :key="index"
        class="col-12 col-md-4 col-xl-2 mb-3"
      >
        <motion.div class="card shadow-sm" :class="getCardClass(res.rate)" :initial="{
            x:0,
            opacity:0,
            scale:0.8
        }"
        :animate="{
            x:[900,0],
            opacity:1,
            transition:{duration:0.5},
            scale:1
        }"
        :while-hover="{
            y:-10,
            scale:1,
            
        }"
       
        >
          <img :src="res.image" class="card-img-top imagesize" alt="Prize" />
          <div class="card-body text-center">
            <h5 class="card-title">第 {{ index + 1 }} 次抽獎</h5>
            
            <p class="card-text text-success fw-bold">{{ res.price }}</p>
          </div>
        </motion.div>
      </div>
    </div>
    <div class="text-center mt-4 result-summary text-white fs-5">
  <p>🎉 本次抽獎結果：</p>
  <p>🏆 特獎（1）：{{ summary.prize1 }} 次</p>
  <p>🥈 第二獎（2）：{{ summary.prize2 }} 次</p>
  <p>🥉 第三獎（3）：{{ summary.prize3 }} 次</p>
  <p>🎁 普獎（4）：{{ summary.prize4 }} 次</p>
  <p>🔢 總共抽出：{{ summary.prize1 + summary.prize2 + summary.prize3 + summary.prize4 }} 次</p>
</div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { motion } from "motion-v";

const results = ref(
  Array.from({ length: 10 }, () => ({
    rate: "",
    price: "",
    image: "",
    visible: false,
  }))
);
const showFish = ref(false);
const summary = ref({
  prize1: 0,
  prize2: 0,
  prize3: 0,
  prize4: 0,
});

function triggerFishFly() {
  showFish.value = false; // reset
  nextTick(() => {
    showFish.value = true; // trigger animation
  });
}

const visibleResults = computed(() =>
  results.value.filter((res) => res.visible)
);

const overlayColor=ref("rgba(255,0,0,0.4)");
let colorInterval=null;

function getRandomColor(){
   const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r},${g},${b},0.4)`;

}

function getPrizeText(number) {
  switch (number) {
    case 1:
      return "特獎：雪梨歌劇院跨年煙火特等席";
    case 2:
      return "第二獎：雪梨大橋攀爬券";
    case 3:
      return "第三獎：ˇ動物園看袋鼠";
    default:
      return "普獎：和無尾熊共浴";
  }
}

function getPrizeImage(number) {
  switch (number) {
    case 1:
      return "/luckydraw/1.png";
    case 2:
      return "/luckydraw/2.png";
    case 3:
      return "/luckydraw/3.png";
    default:
      return "/luckydraw/4.png";
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
  triggerFishFly();
   // Start random color changes
   
  if (colorInterval) clearInterval(colorInterval);
  colorInterval = setInterval(() => {
    overlayColor.value = getRandomColor();
  }, 200); // change every 200ms
  // Reset all results
  results.value.forEach((res) => {
    res.rate = "";
    res.price = "";
    res.image = "";
    res.visible = false;
  });

  // Reset summary
  summary.value = {
    prize1: 0,
    prize2: 0,
    prize3: 0,
    prize4: 0,
  };

  // Sequentially reveal prizes
  results.value.forEach((res, index) => {
    setTimeout(() => {
      const number = Math.floor(Math.random() * 4) + 1;
      res.rate = number;
      res.price = getPrizeText(number);
      res.image = getPrizeImage(number);
      res.visible = true; // reveal this card

      // Update summary count
      switch (number) {
        case 1:
          summary.value.prize1++;
          break;
        case 2:
          summary.value.prize2++;
          break;
        case 3:
          summary.value.prize3++;
          break;
        default:
          summary.value.prize4++;
      }

       // When the last card is shown, stop the color changes
      if (index === results.value.length - 1) {
        clearInterval(colorInterval);
        overlayColor.value = "rgba(0, 0, 0, 0.4)"; // Optional: set to some final color
      }
    }, index * 500);
  });
}
</script>

<style scoped>
.cards-area {
  min-height: 600px;
}
.imagesize {
  width: 230px;
  height: 200px;
}

/* Box shadows for prizes */
.gold-shadow {
  box-shadow: 0 0 50px 50px gold !important;
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
.drawbtn{
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 2px dotted red;
  transform: translateY(-20px)

}
.luckydrawcontainer{
  background-image: url('/luckydraw/rabbit.jpg');
  background-size: contain;
  height: 150vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.background-overlay{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;    
  bottom: 0;   
  pointer-events: none;
  z-index: 1;
  opacity: 0.4;
  transition: background-color 0.3s ease;
}
.flying-fish {
  position: absolute;
  top: 30%;
  left: -200px;
  width: 400px;
  height: auto;
  z-index: 10;
  animation: fishFly 6s ease-in-out forwards;
  pointer-events: none;
}

@keyframes fishFly {
  0% {
    transform: translateX(0) rotate(0deg);
  }
  25% {
    transform: translateX(60vw) translateY(-30px) rotate(20deg);
  }
  50% {
    transform: translateX(80vw) translateY(30px) rotate(20deg) scaleX(-1);
  }
  75% {
    transform: translateX(30vw) translateY(-80px) rotate(25deg) scaleX(-1);
  }
  100% {
    transform: translateX(0vw) rotate(20deg) scaleX(-1);
  }
}

</style>