<template>
  <div
    class="container-fluid mt-5 luckydrawcontainer"
    :style="{
      backgroundImage: `linear-gradient(${overlayColor}, ${overlayColor}), url('/luckydraw/rabbit.jpg')`,
    }"
  >
    <!-- Flying Fish -->
    <img
      v-if="showFish"
      src="/luckydraw/fish.svg"
      class="flying-fish"
      @animationend="showFish = false"
    />

    <!-- Background overlay -->
    <!-- <div
      class="background-overlay"
      :style="{ backgroundColor: overlayColor }"
    ></div> -->

    <!-- Cards area -->
    <div class="row justify-content-center cards-area">
      <div class="col-12 btnrow justify-content-center text-center mb-5">
        <motion.button
          class="btn btn-warning mt-3 startdraw"
          @click="startLottery"
          :while-hover="{ scale: 1.5, transition: { duration: 0.5 } }"
        >
          抽獎開始
        </motion.button>
      </div>

      <div
        v-for="(res, index) in visibleResults"
        :key="index"
        class="col-12 col-md-4 col-xxl-2 mb-3"
      >
        <motion.div
          class="card shadow-sm bg-warning"
          :class="getCardClass(res.rate)"
          :initial="{ x: 0, opacity: 0, scale: 0.8 }"
          :animate="{
            x: [900, 0],
            opacity: 1,
            transition: { duration: 0.5 },
            scale: 1,
          }"
          :while-hover="{ y: -10, scale: 1 }"
        >
          <img :src="res.image" class="card-img-top imagesize" alt="Prize" />
          <div class="card-body text-center">
            <h5 class="card-title">第 {{ index + 1 }} 次抽獎</h5>
            <p class="card-text text-success fw-bold">{{ res.price }}</p>
          </div>
        </motion.div>
      </div>
    </div>

    <button
      class="side-tab-btn btn btn-warning"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#resultOffcanvas"
      aria-controls="resultOffcanvas"
    >
      抽獎結果
    </button>

    <!-- Offcanvas -->
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="resultOffcanvas"
      aria-labelledby="resultOffcanvasLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="resultOffcanvasLabel">
          <i class="pi pi-apple pi-spin" style="color: red"></i> 累積抽獎結果
        </h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <p>
          <i class="pi pi-crown" style="color: gold"></i> 特獎：{{
            accumulatedSummary.prize1
          }}
          次
        </p>
        <p>
          <i class="pi pi-gift" style="color: red"></i> 二獎：{{
            accumulatedSummary.prize2
          }}
          次
        </p>
        <p>
          <i class="pi pi-gift" style="color: red"></i>三獎：{{
            accumulatedSummary.prize3
          }}
          次
        </p>
        <p>
          <i class="pi pi-gift" style="color: red"></i>普獎：{{
            accumulatedSummary.prize4
          }}
          次
        </p>
        <p>
          <i class="pi pi-megaphone" style="color: red"></i> 總共抽出：{{
            accumulatedSummary.prize1 +
            accumulatedSummary.prize2 +
            accumulatedSummary.prize3 +
            accumulatedSummary.prize4
          }}
          次
        </p>

        <hr />

        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-danger" @click="resetAccumulated">
            重設累積結果
          </button>
          <button class="btn btn-sm btn-warning" @click="saveAccumulated">
            儲存累積結果
          </button>
          <button
            class="btn btn-sm btn-secondary text-white"
            @click="loadAccumulated"
          >
            載入上次累積結果
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from "vue";
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

// accumulated summary (persisted to localStorage)
const accumulatedSummary = ref({
  prize1: 0,
  prize2: 0,
  prize3: 0,
  prize4: 0,
});

const visibleResults = computed(() =>
  results.value.filter((res) => res.visible)
);

const overlayColor = ref("rgba(255,0,0,0.4)");
let colorInterval = null;

const STORAGE_KEY = "luckydraw_accumulated_v1";

// Offcanvas instance
const offcanvasInstance = ref(null);

function triggerFishFly() {
  showFish.value = false;
  nextTick(() => {
    showFish.value = true;
  });
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r},${g},${b},0.6)`;
}

function getPrizeText(number) {
  switch (number) {
    case 1:
      return "特獎：雪梨歌劇院跨年煙火特等席";
    case 2:
      return "第二獎：雪梨大橋攀爬券";
    case 3:
      return "第三獎：動物園看袋鼠";
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

function saveAccumulated() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accumulatedSummary.value));
  } catch (e) {
    console.warn("無法寫入 localStorage", e);
  }
}

function loadAccumulated() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      accumulatedSummary.value.prize1 = parsed.prize1 || 0;
      accumulatedSummary.value.prize2 = parsed.prize2 || 0;
      accumulatedSummary.value.prize3 = parsed.prize3 || 0;
      accumulatedSummary.value.prize4 = parsed.prize4 || 0;
    }
  } catch (e) {
    console.warn("無法從 localStorage 讀取累積結果", e);
  }
}

function resetAccumulated() {
  accumulatedSummary.value = { prize1: 0, prize2: 0, prize3: 0, prize4: 0 };
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("無法清除 localStorage", e);
  }
}

// function exportAccumulated() {
//   const dataStr = JSON.stringify(accumulatedSummary.value, null, 2);
//   const blob = new Blob([dataStr], { type: "application/json" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "luckydraw_accumulated.json";
//   a.click();
//   URL.revokeObjectURL(url);
// }

function startLottery() {
  triggerFishFly();

  if (colorInterval) clearInterval(colorInterval);
  colorInterval = setInterval(() => {
    overlayColor.value = getRandomColor();
  }, 200);

  results.value.forEach((res) => {
    res.rate = "";
    res.price = "";
    res.image = "";
    res.visible = false;
  });

  summary.value = {
    prize1: 0,
    prize2: 0,
    prize3: 0,
    prize4: 0,
  };

  results.value.forEach((res, index) => {
    setTimeout(() => {
      const number = Math.floor(Math.random() * 4) + 1;
      res.rate = number;
      res.price = getPrizeText(number);
      res.image = getPrizeImage(number);
      res.visible = true;

      switch (number) {
        case 1:
          summary.value.prize1++;
          accumulatedSummary.value.prize1++;
          break;
        case 2:
          summary.value.prize2++;
          accumulatedSummary.value.prize2++;
          break;
        case 3:
          summary.value.prize3++;
          accumulatedSummary.value.prize3++;
          break;
        default:
          summary.value.prize4++;
          accumulatedSummary.value.prize4++;
      }

      if (index === results.value.length - 1) {
        clearInterval(colorInterval);
        overlayColor.value = "rgba(255, 255, 255, 0.3)";
      }
    }, index * 500);
  });
}

onMounted(() => {
  const offcanvasEl = document.getElementById("resultOffcanvas");
  const tabBtn = document.querySelector(".side-tab-btn");

  // When offcanvas opens
  offcanvasEl.addEventListener("show.bs.offcanvas", () => {
    tabBtn.classList.add("moved");
  });

  // When offcanvas closes
  offcanvasEl.addEventListener("hide.bs.offcanvas", () => {
    tabBtn.classList.remove("moved");
  });
});

// onMounted(async () => {
//   loadAccumulated();

//   const el = document.getElementById("resultOffcanvas");
//   if (!el) return;

//   if (window.bootstrap && window.bootstrap.Offcanvas) {
//     try {
//       offcanvasInstance.value = new window.bootstrap.Offcanvas(el);
//     } catch (e) {
//       console.warn("window.bootstrap.Offcanvas init failed", e);
//     }
//     return;
//   }

//   try {
//     const mod = await import("bootstrap/js/dist/offcanvas");
//     const Offcanvas = mod.default || mod;
//     offcanvasInstance.value = new Offcanvas(el);
//   } catch (e) {
//     console.warn(
//       "Bootstrap Offcanvas JS not found. 請在 main.js 引入： import 'bootstrap/dist/js/bootstrap.bundle';"
//     );
//   }
// });
</script>

<style scoped>
.cards-area {
  min-height: 600px;
}
.startdraw {
  z-index: 100;
}
.imagesize {
  width: 230px;
  height: 200px;
}

/* Shadows */
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
.drawbtn {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 2px dotted red;
  transform: translateY(-20px);
}

.luckydrawcontainer {
  background-size: contain;
  height: 150vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-blend-mode: color-burn;
}
.background-overlay {
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

/* ---- Offcanvas + tab handle styling ---- */
.with-tab {
  --bs-offcanvas-width: 320px;
  overflow: visible !important;
}

.offcanvas {
  z-index: 1150;
}
.side-tab-btn {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  border-radius: 8px 0 0 8px;
  z-index: 1200;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: 12px 6px;
  font-size: 16px;
  transition: transform 0.3s ease-in-out;
}

.side-tab-btn.moved {
  transform: translateY(-50%) translateX(-399px); /* adjust 300px to match your offcanvas width */
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
