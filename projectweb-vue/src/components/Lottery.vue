<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xxl-8 offset-xxl-2 flex-column">
        <!-- Banner -->
        <div class="bg-warning p-2 mb-3 position-relative overflow-hidden">
          <div class="position-absolute conic-gradient-test"></div>
          <img :src="banner1" alt="" />
          <br />
          <h1>Powerball</h1>
          <p>
            Are you ready to become one of the hundreds of winners? Enjoy
            Australia’s biggest jackpotting Lottery with Oz Lotteries.
          </p>
          <h1>What is Powerball and how does it work?</h1>
          <p>
            Powerball is a popular lottery introduced to Australia in 1996 and
            is played every Thursday night. Powerball offers a larger prize
            compared to other lottery games.
          </p>
          <p>The current drawing involves two sets of numbered balls:</p>
          <ul>
            <li>
              The first barrel has 35 balls of which seven are chosen at random.
            </li>
            <li>The final Powerball comes from a barrel of 20 numbers.</li>
          </ul>
          <p>
            If a player matches the first seven plus the extra ball, it is a
            Division 1 win worth millions of dollars. The chances of winning the
            grand prize are 1:134,490,400. These odds mean that it is not
            unusual that no one picks all of the right numbers.
          </p>

          <p>
            If several weeks go by without a winner the jackpot can grow into a
            huge prize. The largest reward so far was $200 Million in February,
            2024.
          </p>
          <p>
            But for the shake of this stimulate game, you don't have to wait a
            week for the result, the prize will open immediatly as long as you
            hit the open prize button, and the corresponse prize will be given
            base on the odd*2.5 (the amount for one draw)
          </p>
          <p>Enjoy the game and goodluck!</p>
        </div>

        <div class="maincontent">
          <!-- Tabs -->
          <ul class="nav nav-tabs mb-3 d-flex justify-content-start">
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
              <label class="bg-light">Select number of games:</label>
              <br />
              <br />
              <select v-model="selectedStandardGames" class="form-select mb-2">
                <option
                  v-for="opt in gameOptionsStandard"
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
              <button
                type="button"
                class="btn btn-outline-primary mb-4 ms-2"
                @click="autoPickRestStandard"
              >
                Auto Pick Rest
              </button>

              <div
                v-for="(game, i) in standardGames"
                :key="'std-' + i"
                class="mb-4"
              >
                <div class="d-flex flex-wrap mb-2 bg-light">
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
                  class="card p-3 bg-light"
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
                          : 'btn btn-outline-danger'
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
            <div class="col-12 d-flex flex-row">
              <div class="col-md-6 bg-light">
                <div class="mb-4">
                  <button
                    type="button"
                    class="btn btn-warning mb-2"
                    @click="openPrizeStandard"
                  >
                    Open Prize
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger ms-3 mb-2"
                    @click="resetAll"
                  >
                    Reset
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
              </div>
              <div class="col-md-6 bg-warning pt-3 px-3">
                <div v-if="gameResults.length > 0" class="mb-5">
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
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Division</th>
                      <th scope="col">Match</th>
                      <th scope="col">Odds</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Division 1</td>
                      <td>All 7 main winning numbers + the Powerball</td>
                      <td>1:134,490,400</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Division 2</td>
                      <td>All 7 main winning numbers</td>
                      <td>1:7,078,443</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Division 3</td>
                      <td>Any 6 main winning numbers + the Powerball</td>
                      <td>1:686,176</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Division 4</td>
                      <td>Any 6 main winning numbers</td>
                      <td>1:36,115</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>Division 5</td>
                      <td>Any 5 main winning numbers + the Powerball</td>
                      <td>1:16,943</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Division 6</td>
                      <td>Any 4 main winning numbers + the Powerball</td>
                      <td>1:1,173</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>Division 7</td>
                      <td>Any 5 main winning numbers</td>
                      <td>1:892</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>Division 8</td>
                      <td>Any 3 main winning numbers + the Powerball</td>
                      <td>1:188</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>Division 9</td>
                      <td>Any 2 main winning numbers + the Powerball</td>
                      <td>1:66</td>
                    </tr>
                  </tbody>
                </table>
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
              <br /><br />
              <select v-model="selectedPowerhitGames" class="form-select mb-2">
                <option
                  v-for="opt in gameOptionsPowerhit"
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
              <button
                type="button"
                class="btn btn-outline-primary mb-4 ms-2"
                @click="autoPickRestPowerhit"
              >
                Auto Pick Rest
              </button>

              <div
                v-for="(game, i) in powerhitGames"
                :key="'ph-' + i"
                class="mb-4"
              >
                <div class="d-flex flex-wrap mb-2">
                  <div
                    v-for="num in game.picks.slice().sort((a, b) => a - b)"
                    :key="num"
                    class="badge bg-primary me-2 mb-2"
                  >
                    {{ num }}
                  </div>
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
            <div class="d-flex flex-row">
              <div class="mb-4 col-md-6">
                <button
                  type="button"
                  class="btn btn-warning mb-2"
                  @click="generatePowerhitPrize"
                >
                  Open Prize
                </button>
                <button
                  type="button"
                  class="btn btn-danger ms-2 mb-2"
                  @click="resetAll"
                >
                  Reset
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
                <div v-if="powerhitPrize" class="mt-2">
                  <p class="fw-bold">Winning Numbers:</p>
                  <span
                    v-for="n in powerhitPrize.numbers"
                    :key="'wpnph-' + n"
                    class="badge bg-primary me-2"
                  >
                    {{ n }}
                  </span>
                  <span class="badge bg-danger">{{
                    powerhitPrize.powerball
                  }}</span>

                  <div
                    v-for="(game, i) in powerhitGames"
                    :key="'resph-' + i"
                    class="mt-2"
                  >
                    <p>Game {{ i + 1 }}:</p>
                    <span
                      v-for="n in game.picks"
                      :key="'gph' + i + '-' + n"
                      class="badge bg-primary me-2"
                    >
                      {{ n }}
                    </span>
                    <span class="badge bg-danger">{{
                      powerhitPrize.powerball
                    }}</span>
                    <span class="badge bg-success ms-2">
                      Division: {{ gameResults[i].division }}
                    </span>
                    <span class="badge bg-info ms-2">
                      Prize: ${{ gameResults[i].prize.toFixed(2) }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="bg-warning col-md-6 px-3 pt-3">
                <!-- Summary like Standard -->
                <div v-if="gameResults.length > 0" class="mb-5 mt-3">
                  <h3>Results:</h3>
                  <div v-for="(res, i) in gameResults" :key="'phres-' + i">
                    Set {{ i + 1 }}: {{ res.division }} - Won ${{
                      res.prize.toLocaleString()
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
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Division</th>
                      <th scope="col">Match</th>
                      <th scope="col">Odds</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Division 1</td>
                      <td>All 7 main winning numbers + the Powerball</td>
                      <td>1:134,490,400</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Division 2</td>
                      <td>All 7 main winning numbers</td>
                      <td>1:7,078,443</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Division 3</td>
                      <td>Any 6 main winning numbers + the Powerball</td>
                      <td>1:686,176</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Division 4</td>
                      <td>Any 6 main winning numbers</td>
                      <td>1:36,115</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>Division 5</td>
                      <td>Any 5 main winning numbers + the Powerball</td>
                      <td>1:16,943</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Division 6</td>
                      <td>Any 4 main winning numbers + the Powerball</td>
                      <td>1:1,173</td>
                    </tr>
                    <tr>
                      <th scope="row">7</th>
                      <td>Division 7</td>
                      <td>Any 5 main winning numbers</td>
                      <td>1:892</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>Division 8</td>
                      <td>Any 3 main winning numbers + the Powerball</td>
                      <td>1:188</td>
                    </tr>
                    <tr>
                      <th scope="row">9</th>
                      <td>Division 9</td>
                      <td>Any 2 main winning numbers + the Powerball</td>
                      <td>1:66</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, unref, computed } from "vue";

/** Banner */
const banner1 = "/luckydraw/banner.png";
const activeTab = ref("standard");

/** Game Options */
const gameOptionsStandard = [
  { value: 4, label: "4 games - $10" },
  { value: 5, label: "5 games - $12.5" },
  { value: 6, label: "6 games - $15" },
  { value: 7, label: "7 games - $17.5" },
  { value: 8, label: "8 games - $20 mini" },
  { value: 9, label: "9 games - $22.5" },
  { value: 10, label: "10 games - $25" },
  { value: 20, label: "20 games - $50" },
];

const gameOptionsPowerhit = [
  { value: 4, label: "4 games - $200" },
  { value: 5, label: "5 games - $250" },
  { value: 6, label: "6 games - $300" },
  { value: 7, label: "7 games - $350" },
  { value: 8, label: "8 games - $400" },
  { value: 9, label: "9 games - $450" },
  { value: 10, label: "10 games - $500" },
  { value: 20, label: "20 games - $1000" },
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

function autoPickRestStandard() {
  standardGames.value.forEach((g) => {
    if (!isStandardComplete(g)) {
      // fill missing numbers
      const nums = g.picks.slice();
      while (nums.length < 7) {
        const n = Math.floor(Math.random() * 35) + 1;
        if (!nums.includes(n)) nums.push(n);
      }
      g.picks = nums.sort((a, b) => a - b);

      if (g.powerball == null) {
        g.powerball = Math.floor(Math.random() * 20) + 1;
      }
    }
  });
}

function autoPickRestPowerhit() {
  const pb =
    standardPrize.value?.powerball || Math.floor(Math.random() * 20) + 1;

  powerhitGames.value.forEach((g) => {
    if (!isPowerhitComplete(g)) {
      const nums = g.picks.slice();
      while (nums.length < 7) {
        const n = Math.floor(Math.random() * 35) + 1;
        if (!nums.includes(n)) nums.push(n);
      }
      g.picks = nums.sort((a, b) => a - b);

      if (!g.powerball) {
        g.powerball = pb;
      }
    }
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
const prizePool = 4000000;

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

const totalWeight = divisionOdds.reduce((sum, d) => sum + d.odds, 0);

const divisionPrizeMap = divisionOdds.reduce((map, d) => {
  const share = d.odds / totalWeight;
  map[d.name] = Math.floor(prizePool * share);
  return map;
}, {});

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
    const prize = divName !== "-" ? divisionPrizeMap[divName] : 0;
    return { division: divName, prize };
  });
}

// function calcDivision(game, prize) {
//   const res = gameResults.value[standardGames.value.indexOf(game)];
//   return res ? res.division : "-";
// }

function generatePowerhitPrize() {
  // generate winning numbers
  const nums = [];
  while (nums.length < 7) {
    const n = Math.floor(Math.random() * 35) + 1;
    if (!nums.includes(n)) nums.push(n);
  }
  nums.sort((a, b) => a - b);
  const pb = Math.floor(Math.random() * 20) + 1;

  // store winning set
  powerhitPrize.value = { numbers: nums, powerball: pb };

  // calculate results for each PowerHit game
  gameResults.value = powerhitGames.value.map((g) => {
    const mainMatch = g.picks.filter((n) => nums.includes(n)).length;
    // PowerHit means PB is guaranteed → always true
    const pbMatch = true;
    const divObj = divisions.find((d) => d.check(mainMatch, pbMatch));
    const divName = divObj ? divObj.name : "-";
    const prize = divName !== "-" ? divisionPrizeMap[divName] : 0;
    return { division: divName, prize };
  });
}

function calcDivisionPowerhit(game, prize) {
  if (!prize) return "-";
  const mainMatch = game.picks.filter((n) => prize.numbers.includes(n)).length;
  const pbMatch = game.powerball === standardPrize.value?.powerball;
  const div = divisions.find((d) => d.check(mainMatch, pbMatch));
  return div ? div.name : "-";
}

const totalStandardPrize = computed(() =>
  gameResults.value.reduce((sum, r) => sum + r.prize, 0)
);

function calcPowerhitPrize(game) {
  if (!powerhitPrize.value) return 0;
  const mainMatch = game.picks.filter((n) =>
    powerhitPrize.value.numbers.includes(n)
  ).length;
  const pbMatch = true; // PowerHit covers all PBs
  const div = divisions.find((d) => d.check(mainMatch, pbMatch));
  return div ? divisionPrizeMap[div.name] : 0;
}

const totalPowerhitPrize = computed(() =>
  powerhitGames.value.reduce((sum, g) => sum + calcPowerhitPrize(g), 0)
);

// reset everything
function resetAll() {
  // clear standard games
  standardGames.value = standardGames.value.map(() => ({
    picks: [],
    powerball: null,
  }));

  // clear powerhit games
  powerhitGames.value = powerhitGames.value.map(() => ({
    picks: [],
    powerball: null,
  }));

  // reset prizes
  standardPrize.value = null;
  powerhitPrize.value = null;

  // reset results
  gameResults.value = [];

  // reset active tab/game index if you use them
  activeStandardGame.value = 0;
  activePowerhitGame.value = 0;
}
</script>

<style scoped>
.d-grid {
  display: grid !important;
}
.conic-gradient-test {
  top: 0;
  left: 0;
  height: 200%;
  width: 200%;
  background-image: repeating-conic-gradient(
    from 0deg at center,
    rgba(255, 128, 128, 0.7),
    rgba(128, 255, 128, 0.7),
    rgba(128, 128, 255, 0.7)
  );
  background-position: 0%;
  transition: all 3s ease;
  transform: translateX(-25%) translateY(-25%) rotate(0deg);
  opacity: 0;
}
.conic-gradient-test:hover {
  transform: translateX(-25%) translateY(-25%) rotate(720deg);
  opacity: 0.8;
}
</style>
