<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xxl-8 offset-xxl-2 flex-column">
        <!-- Banner -->
        <div class="bg-warning"><img :src="banner1" alt="" /></div>

        <div class="maincontent">
          <!-- Tabs -->
          <ul class="nav nav-tabs mb-3">
            <li class="nav-item">
              <button
                class="nav-link"
                :class="{ active: activeTab === 'standard' }"
                @click="activeTab = 'standard'"
              >
                Standard
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                :class="{ active: activeTab === 'powerhit' }"
                @click="activeTab = 'powerhit'"
              >
                PowerHit
              </button>
            </li>
          </ul>

          <!-- Standard Tab -->
          <div
            v-show="activeTab === 'standard'"
            class="tab-pane fade show active"
          >
            <form @submit.prevent>
              <label>Select number of games:</label>
              <select v-model="selectedStandardGames" class="form-select mb-2">
                <option
                  v-for="opt in gameOptions"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>

              <button
                type="button"
                class="btn btn-success mb-4"
                @click="autoPickStandard"
              >
                Auto Pick All Standard
              </button>

              <div
                v-for="(game, i) in standardGames"
                :key="'std-' + i"
                class="mb-4"
              >
                <div class="d-flex flex-wrap mb-2">
                  <span
                    v-for="num in game.picks.slice().sort((a, b) => a - b)"
                    :key="num"
                    class="badge bg-primary me-2 mb-2"
                  >
                    {{ num }}
                  </span>
                  <span
                    class="badge bg-danger me-2 mb-2"
                    v-if="game.powerball !== null"
                    >{{ game.powerball }}</span
                  >
                </div>

                <div
                  v-if="activeStandardGame === i && !isStandardComplete(game)"
                  class="card p-3"
                >
                  <p class="fw-bold">Select 7 numbers (1–35)</p>
                  <div
                    class="d-grid gap-2"
                    style="grid-template-columns: repeat(10, 1fr)"
                  >
                    <button
                      v-for="n in 35"
                      :key="n"
                      type="button"
                      @click="toggleNumber(standardGames, i, n, 'standard')"
                      :class="
                        game.picks.includes(n)
                          ? 'btn btn-primary'
                          : 'btn btn-outline-secondary'
                      "
                      class="btn btn-sm"
                    >
                      {{ n }}
                    </button>
                  </div>

                  <p class="fw-bold mt-3">Select Powerball (1–20)</p>
                  <div
                    class="d-grid gap-2"
                    style="grid-template-columns: repeat(10, 1fr)"
                  >
                    <button
                      v-for="n in 20"
                      :key="'pb-' + n"
                      type="button"
                      @click="selectPowerball(standardGames, i, n)"
                      :class="
                        game.powerball === n
                          ? 'btn btn-danger'
                          : 'btn btn-outline-secondary'
                      "
                      class="btn btn-sm"
                    >
                      {{ n }}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <!-- Prize Section -->
            <div class="mb-4">
              <button
                type="button"
                class="btn btn-warning mb-2"
                @click="openPrizeStandard"
              >
                Open Prize
              </button>

              <div v-if="standardPrize" class="mt-2">
                <p class="fw-bold">Winning Numbers:</p>
                <span
                  v-for="n in standardPrize.numbers"
                  :key="'wpn-' + n"
                  class="badge bg-primary me-2"
                  >{{ n }}</span
                >
                <span class="badge bg-danger">{{
                  standardPrize.powerball
                }}</span>

                <div
                  v-for="(game, i) in standardGames"
                  :key="'res-' + i"
                  class="mt-2"
                >
                  <p>Game {{ i + 1 }}:</p>
                  <span
                    v-for="n in game.picks"
                    :key="'g' + i + '-' + n"
                    class="badge bg-primary me-2"
                    >{{ n }}</span
                  >
                  <span class="badge bg-danger">{{ game.powerball }}</span>
                  <span class="badge bg-success ms-2"
                    >Division: {{ gameResults[i].division }}</span
                  >
                  <span class="badge bg-info ms-2"
                    >Prize: ${{ gameResults[i].prize.toFixed(2) }}</span
                  >
                </div>
              </div>
            </div>
            <!-- Add below your results section for Standard -->
            <div v-if="gameResults.length">
              <h3>Results:</h3>
              <div v-for="(res, i) in gameResults" :key="i">
                Set {{ i + 1 }}: {{ res.division }} - Won ${{
                  res.prize.toLocaleString()
                }}
              </div>
              <div>
                <strong
                  >Total Prize: ${{
                    totalStandardPrize.toLocaleString()
                  }}</strong
                >
              </div>
            </div>
          </div>

          <!-- PowerHit Tab (unchanged) -->
          <div
            v-show="activeTab === 'powerhit'"
            class="tab-pane fade show active"
          >
            <form @submit.prevent>
              <label>Select number of games:</label>
              <select v-model="selectedPowerhitGames" class="form-select mb-2">
                <option
                  v-for="opt in gameOptions"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>

              <button
                type="button"
                class="btn btn-success mb-4"
                @click="autoPickPowerhit"
              >
                Auto Pick All PowerHit
              </button>

              <div
                v-for="(game, i) in powerhitGames"
                :key="'ph-' + i"
                class="mb-4"
              >
                <div class="d-flex flex-wrap mb-2">
                  <span
                    v-for="num in game.picks.slice().sort((a, b) => a - b)"
                    :key="num"
                    class="badge bg-primary me-2 mb-2"
                    >{{ num }}</span
                  >
                </div>

                <div
                  v-if="activePowerhitGame === i && !isPowerhitComplete(game)"
                  class="card p-3"
                >
                  <p class="fw-bold">Select 7 numbers (1–35)</p>
                  <div
                    class="d-grid gap-2"
                    style="grid-template-columns: repeat(10, 1fr)"
                  >
                    <button
                      v-for="n in 35"
                      :key="n"
                      type="button"
                      @click="toggleNumber(powerhitGames, i, n, 'powerhit')"
                      :class="
                        game.picks.includes(n)
                          ? 'btn btn-primary'
                          : 'btn btn-outline-secondary'
                      "
                      class="btn btn-sm"
                    >
                      {{ n }}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div class="mb-4">
              <button
                type="button"
                class="btn btn-warning mb-2"
                @click="generatePowerhitPrize"
              >
                Open Prize
              </button>

              <div v-if="powerhitPrize" class="mt-2">
                <p class="fw-bold">Winning Numbers:</p>
                <span
                  v-for="n in powerhitPrize.numbers"
                  :key="'wpnph-' + n"
                  class="badge bg-primary me-2"
                  >{{ n }}</span
                >

                <div
                  v-for="(game, i) in powerhitGames"
                  :key="'resph-' + i"
                  class="mt-2"
                >
                  <p>
                    Game {{ i + 1 }}: Division:
                    {{ calcDivisionPowerhit(game, powerhitPrize) }}
                  </p>
                </div>
              </div>
              <!-- For PowerHit, similarly -->
              <div v-if="powerhitGames.length && standardPrize">
                <h3>Results:</h3>
                <div v-for="(game, i) in powerhitGames" :key="i">
                  Set {{ i + 1 }}:
                  {{ calcDivisionPowerhit(game, standardPrize) }} - Won ${{
                    calcPowerhitPrize(game).toLocaleString()
                  }}
                </div>
                <div>
                  <strong
                    >Total Prize: ${{
                      totalPowerhitPrize.toLocaleString()
                    }}</strong
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, unref } from "vue";

/** Banner */
const banner1 = "/luckydraw/banner.png";
const activeTab = ref("standard");

/** Game Options */
const gameOptions = [
  { value: 4, label: "4 games - $10" },
  { value: 5, label: "5 games - $12.5" },
  { value: 6, label: "6 games - $15" },
  { value: 7, label: "7 games - $17.5" },
  { value: 8, label: "8 games - $20 mini" },
  { value: 9, label: "9 games - $22.5" },
  { value: 10, label: "10 games - $25" },
  { value: 20, label: "20 games - $50" },
];

/** Standard Games */
const selectedStandardGames = ref(4);
const standardGames = ref([]);
const activeStandardGame = ref(0);
watch(
  selectedStandardGames,
  (val) => {
    standardGames.value = Array.from({ length: val }, () => ({
      picks: [],
      powerball: null,
    }));
    activeStandardGame.value = 0;
  },
  { immediate: true }
);

function isStandardComplete(game) {
  return game?.picks?.length === 7 && game.powerball != null;
}

/** PowerHit Games */
const selectedPowerhitGames = ref(4);
const powerhitGames = ref([]);
const activePowerhitGame = ref(0);
watch(
  selectedPowerhitGames,
  (val) => {
    powerhitGames.value = Array.from({ length: val }, () => ({ picks: [] }));
    activePowerhitGame.value = 0;
  },
  { immediate: true }
);
function isPowerhitComplete(game) {
  return game?.picks?.length === 7;
}

/** ---------------- COMMON LOGIC ---------------- */
function toggleNumber(listRef, idx, n, mode) {
  const list = unref(listRef);
  const game = list[idx];
  if (!game) return;
  if (game.picks.includes(n)) game.picks = game.picks.filter((x) => x !== n);
  else if (game.picks.length < 7) game.picks.push(n);
  checkGameComplete(listRef, idx, mode);
}

function selectPowerball(listRef, idx, n) {
  const list = unref(listRef);
  const game = list[idx];
  if (!game) return;
  game.powerball = n;
  checkGameComplete(listRef, idx, "standard");
}

function checkGameComplete(listRef, idx, mode) {
  const list = unref(listRef);
  if (mode === "standard" && isStandardComplete(list[idx])) {
    if (idx < list.length - 1) activeStandardGame.value = idx + 1;
  } else if (mode === "powerhit" && isPowerhitComplete(list[idx])) {
    if (idx < list.length - 1) activePowerhitGame.value = idx + 1;
  }
}

/** ---------------- AUTO PICK ---------------- */
function autoPickStandard() {
  standardGames.value.forEach((g) => {
    const nums = [];
    while (nums.length < 7) {
      const n = Math.floor(Math.random() * 35) + 1;
      if (!nums.includes(n)) nums.push(n);
    }
    g.picks = nums.sort((a, b) => a - b);
    g.powerball = Math.floor(Math.random() * 20) + 1;
  });
}

function autoPickPowerhit() {
  const pb =
    standardPrize.value?.powerball || Math.floor(Math.random() * 20) + 1;
  powerhitGames.value.forEach((g) => {
    const nums = [];
    while (nums.length < 7) {
      const n = Math.floor(Math.random() * 35) + 1;
      if (!nums.includes(n)) nums.push(n);
    }
    g.picks = nums.sort((a, b) => a - b);
    g.powerball = pb;
  });
}

/** ---------------- PRIZE ---------------- */
const standardPrize = ref(null);
const powerhitPrize = ref(null);
const gameResults = ref([]);

const divisionOdds = [
  { name: "Division 1", odds: 134490400 },
  { name: "Division 2", odds: 7078443 },
  { name: "Division 3", odds: 686176 },
  { name: "Division 4", odds: 36115 },
  { name: "Division 5", odds: 16943 },
  { name: "Division 6", odds: 1173 },
  { name: "Division 7", odds: 892 },
  { name: "Division 8", odds: 188 },
  { name: "Division 9", odds: 66 },
];

const divisions = [
  { name: "Division 1", check: (m, pb) => m === 7 && pb },
  { name: "Division 2", check: (m) => m === 7 },
  { name: "Division 3", check: (m, pb) => m === 6 && pb },
  { name: "Division 4", check: (m) => m === 6 },
  { name: "Division 5", check: (m, pb) => m === 5 && pb },
  { name: "Division 6", check: (m, pb) => m === 4 && pb },
  { name: "Division 7", check: (m) => m === 5 },
  { name: "Division 8", check: (m, pb) => m === 3 && pb },
  { name: "Division 9", check: (m, pb) => m === 2 && pb },
];

function openPrizeStandard() {
  const nums = [];
  while (nums.length < 7) {
    const n = Math.floor(Math.random() * 35) + 1;
    if (!nums.includes(n)) nums.push(n);
  }
  nums.sort((a, b) => a - b);
  const pb = Math.floor(Math.random() * 20) + 1;
  standardPrize.value = { numbers: nums, powerball: pb };

  // Calculate division and prize
  gameResults.value = standardGames.value.map((g) => {
    const mainMatch = g.picks.filter((n) => nums.includes(n)).length;
    const pbMatch = g.powerball === pb;
    const divObj = divisions.find((d) => d.check(mainMatch, pbMatch));
    const divName = divObj ? divObj.name : "-";
    const oddsObj = divisionOdds.find((d) => d.name === divName);
    const prize = oddsObj ? 2.5 * oddsObj.odds : 0;
    return { division: divName, prize };
  });
}

function calcDivision(game, prize) {
  const res = gameResults.value[standardGames.value.indexOf(game)];
  return res ? res.division : "-";
}

function calcDivisionPowerhit(game, prize) {
  if (!prize) return "-";
  const mainMatch = game.picks.filter((n) => prize.numbers.includes(n)).length;
  const pbMatch = game.powerball === standardPrize.value?.powerball;
  const div = divisions.find((d) => d.check(mainMatch, pbMatch));
  return div ? div.name : "-";
}

import { computed } from "vue";

const totalStandardPrize = computed(() =>
  gameResults.value.reduce((sum, r) => sum + r.prize, 0)
);

function calcPowerhitPrize(game) {
  if (!standardPrize.value) return 0;
  const mainMatch = game.picks.filter((n) =>
    standardPrize.value.numbers.includes(n)
  ).length;
  const pbMatch = game.powerball === standardPrize.value.powerball;
  const div = divisions.find((d) => d.check(mainMatch, pbMatch));
  const oddsObj = divisionOdds.find((d) => d.name === (div ? div.name : "-"));
  return oddsObj ? 2.5 * oddsObj.odds : 0;
}

const totalPowerhitPrize = computed(() =>
  powerhitGames.value.reduce((sum, g) => sum + calcPowerhitPrize(g), 0)
);
</script>

<style scoped>
.d-grid {
  display: grid !important;
}
</style>
