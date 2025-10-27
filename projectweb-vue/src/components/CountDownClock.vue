<template>
  <div class="container countdownclock">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <!-- Clock Display -->
        <div
          class="clockarea w-100 h-5 bg-light d-flex justify-content-center rounded-2 position-relative"
        >
          <div class="position-absolute bg-white clockway rounded-3"></div>
          <Motion
            v-if="showStartBubble"
            :initial="{ opacity: 0, scale: 0.5, y: -20 }"
            :enter="{ opacity: 1, scale: 1, y: 0 }"
            :leave="{ opacity: 0, scale: 0.5, y: -20 }"
            class="speech-bubble start-bubble"
            :style="{
              position: 'absolute',
              top: (parseFloat(runningImg?.style.top) || 0) - 10 + 'px',
              left: (parseFloat(runningImg?.style.left) || 0) + 250 + 'px',
            }"
          >
            Ahhh~~~Again!!
          </Motion>

          <Motion
            v-if="showBubble"
            class="speech-bubble position-absolute"
            :style="{
              position: 'absolute',
              top: (parseFloat(runningImg?.style.top) || 0) - 10 + 'px',
              left: (parseFloat(runningImg?.style.left) || 0) + 250 + 'px',
            }"
          >
            Leave me alone!
          </Motion>
          <Motion
            v-if="showHoverBubble"
            :initial="{ opacity: 0, scale: 0.5, y: -20 }"
            :enter="{ opacity: 1, scale: 1, y: 0 }"
            :leave="{ opacity: 0, scale: 0.5, y: -20 }"
            class="speech-bubble hover-bubble"
            :style="{
              position: 'absolute',
              top: (parseFloat(runningImg?.style.top) || 0) - 10 + 'px',
              left: (parseFloat(runningImg?.style.left) || 0) + 250 + 'px',
            }"
          >
            No more work, please!
          </Motion>
          <div
            class="theclock position-absolute"
            style="
              font-size: 50px;
              font-family: 'Caveat', cursive;
              font-weight: bolder;
            "
          >
            {{ clocktime }}
          </div>
          <div
            class="circle-container mt-4"
            style="position: relative; width: 500px; height: 500px"
          >
            <canvas id="circleCanvas" width="500" height="500"></canvas>
            <img
              ref="runningImg"
              :src="bird"
              style="
                position: absolute;
                width: 200px;
                height: 200px;
                top: 0;
                left: 0;
              "
              class="runimage"
              @mouseenter="showHoverBubble = true"
              @mouseleave="showHoverBubble = false"
            />
          </div>
        </div>

        <!-- Input Fields -->
        <div class="mb-3 d-flex mt-5">
          <label class="form-label mt-2">調整分鐘</label>
          <input
            type="number"
            v-model.number="inputMinutes"
            min="0"
            class="form-control"
            placeholder="Minutes"
            style="width: 80px"
          />
          <label class="form-label mt-2 ms-2">自訂秒數</label>
          <input
            type="number"
            v-model.number="inputSeconds"
            min="0"
            max="59"
            class="form-control"
            placeholder="Seconds"
            style="width: 80px"
          />
        </div>

        <!-- Buttons -->
        <button class="btn btn-warning me-2" @click="toggleStatus">
          {{ clockStatus }}
        </button>
        <button class="btn btn-danger me-2" @click="resetTimer">Reset</button>
        <button class="btn btn-success me-2" @click="saveToCookie">
          Save Current
        </button>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#recordsModal"
          @click="loadFromCookie"
        >
          Show Records
        </button>

        <!-- Records Modal -->
        <div
          class="modal fade"
          id="recordsModal"
          tabindex="-1"
          aria-labelledby="recordsModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="recordsModalLabel">
                  Saved Countdown Records
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Minutes</th>
                      <th>Seconds</th>
                      <th>Tenths</th>
                      <th>Saved At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in savedList" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <template v-if="editingIndex === index">
                          <input
                            type="number"
                            v-model.number="editMinutes"
                            class="form-control form-control-sm"
                          />
                        </template>
                        <template v-else>{{ item.minutes }}</template>
                      </td>
                      <td>
                        <template v-if="editingIndex === index">
                          <input
                            type="number"
                            v-model.number="editSeconds"
                            class="form-control form-control-sm"
                          />
                        </template>
                        <template v-else>{{ item.seconds }}</template>
                      </td>
                      <td>
                        <template v-if="editingIndex === index">
                          <input
                            type="number"
                            v-model.number="editTenths"
                            class="form-control form-control-sm"
                          />
                        </template>
                        <template v-else>{{ item.secondcount }}</template>
                      </td>
                      <td>{{ item.savedAt }}</td>
                      <td>
                        <button
                          class="btn btn-sm btn-warning me-1"
                          v-if="editingIndex !== index"
                          @click="startEdit(index)"
                        >
                          Modify
                        </button>
                        <button
                          class="btn btn-sm btn-success me-1"
                          v-else
                          @click="saveEdit(index)"
                        >
                          Save
                        </button>
                        <button
                          class="btn btn-sm btn-danger"
                          @click="deleteRecord(index)"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  class="btn btn-secondary mt-2 text-white"
                  @click="clearAllRecords"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Cookies from "js-cookie";
import { ref, computed, watch, onMounted } from "vue";
import { motion } from "motion-v";

let minutes = ref(0);
let seconds = ref(30);
let secondcount = ref(0);
let inputMinutes = ref(0);
let inputSeconds = ref(30);
let savedList = ref([]);
let modifyingIndex = ref(null);
let bird = "/luckydraw/bear.gif";

let showBubble = ref(false);
let showStartBubble = ref(false);

//running image
const runningImg = ref(null);
const canvasRef = ref(null);
let radius = 180; // radius of the circle
let centerX = 250; // center of canvas
let centerY = 250;
let angle = 0; // current angle
let animationFrame;
let marks = []; // save points where user clicked "Save"
let totalTime = ref(0); // total seconds for current countdown
let elapsedTime = ref(0); // seconds elapsed
let startTimestamp = null;

//for edit function
let editingIndex = ref(null);
let editMinutes = ref(0);
let editSeconds = ref(0);
let editTenths = ref(0);

// Clock Status
let clockStatus = ref("Start");
let interval = null;

// Computed display
let clocktime = computed(
  () =>
    `${addZero(minutes.value)}:${addZero(seconds.value)}:${addZero(
      secondcount.value
    )}`
);

// control the start and stop button and start or stop countdown
function toggleStatus() {
  if (clockStatus.value === "Start") {
    clockStatus.value = "Stop";
    startCountdown();
  } else {
    clockStatus.value = "Start";
    stopCountdown();
  }
}
function startCountdown() {
  if (interval) return;

  //starting from scratch, set totalTime from inputs
  if (!elapsedTime.value || elapsedTime.value <= 0) {
    totalTime.value =
      (inputMinutes.value || 0) * 60 + (inputSeconds.value || 0);
    elapsedTime.value = 0;
    // startTimestamp = now
    startTimestamp = Date.now();
    // Show start bubble
    showStartBubble.value = true;
    setTimeout(() => {
      showStartBubble.value = false;
    }, 2000);
  } else {
    // resuming: set startTimestamp so elapsedTime continues from previous value
    startTimestamp = Date.now() - Math.floor(elapsedTime.value * 1000);
  }

  interval = setInterval(() => {
    // countdown ticking as you already have...
    if (secondcount.value > 0) secondcount.value--;
    else if (seconds.value > 0) {
      seconds.value--;
      secondcount.value = 9;
    } else if (minutes.value > 0) {
      minutes.value--;
      seconds.value = 59;
      secondcount.value = 9;
    } else {
      // finished
      stopCountdown();
      elapsedTime.value = totalTime.value;
      angle = 2 * Math.PI;
      updateImagePosition();

      // 👉 Show conversation bubble
      showBubble.value = true;

      // Optional: auto-hide after 3s
      setTimeout(() => {
        showBubble.value = false;
      }, 3000);

      return;
    }

    // Use real elapsed time (measured from timestamp)
    elapsedTime.value = (Date.now() - startTimestamp) / 1000;

    // clamp so fraction never exceeds 1
    if (totalTime.value > 0) {
      if (elapsedTime.value > totalTime.value)
        elapsedTime.value = totalTime.value;
      angle = (elapsedTime.value / totalTime.value) * 2 * Math.PI;
    } else {
      angle = 0;
    }

    // update image position (see next snippet — use actual img width)
    updateImagePosition();

    // redraw marks if you want them refreshed
    drawMarks();
  }, 100);
}

function stopCountdown() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  // Keep image where it stopped
  updateImagePosition();
}

function resetTimer() {
  stopCountdown();

  // set visible minutes/seconds from input
  minutes.value = Math.max(0, inputMinutes.value || 0);
  seconds.value = Math.min(59, Math.max(0, inputSeconds.value || 0));
  secondcount.value = 0;
  clockStatus.value = "Start";

  // --- Reset timing state so next Start uses the new inputs ---
  elapsedTime.value = 0;
  totalTime.value = (inputMinutes.value || 0) * 60 + (inputSeconds.value || 0);
  startTimestamp = null;
  angle = 0;

  // clear marks and redraw the base circle
  marks = [];
  drawBaseCircle();
  updateImagePosition(); // place the image at the start
}
watch(clockStatus, (newVal) =>
  newVal === "Stop" ? startCountdown() : stopCountdown()
);

// Cookies functions
function saveToCookie() {
  let list = Cookies.get("countdownList");
  list = list ? JSON.parse(list) : [];
  list.push({
    minutes: minutes.value,
    seconds: seconds.value,
    secondcount: secondcount.value,
    savedAt: new Date().toISOString(),
  });
  Cookies.set("countdownList", JSON.stringify(list), { expires: 1 });
  loadFromCookie();

  marks.push({
    angle: angle,
    timeLabel: clocktime.value, // the current countdown time
  });
  drawMarks();
}
function loadFromCookie() {
  const list = Cookies.get("countdownList");
  savedList.value = list ? JSON.parse(list) : [];
}
function deleteRecord(index) {
  savedList.value.splice(index, 1);
  Cookies.set("countdownList", JSON.stringify(savedList.value), { expires: 1 });
}
function clearAllRecords() {
  savedList.value = [];
  Cookies.remove("countdownList");
  marks = [];
  drawBaseCircle();
}

//modify functions function
function startEdit(index) {
  editingIndex.value = index;
  const record = savedList.value[index];
  editMinutes.value = record.minutes;
  editSeconds.value = record.seconds;
  editTenths.value = record.secondcount;
}

function saveEdit(index) {
  savedList.value[index] = {
    minutes: editMinutes.value,
    seconds: editSeconds.value,
    secondcount: editTenths.value,
    savedAt: new Date().toISOString(),
  };
  Cookies.set("countdownList", JSON.stringify(savedList.value), { expires: 1 });
  editingIndex.value = null; // exit edit mode
}

//running image
function drawBaseCircle() {
  const canvas = document.getElementById("circleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw static circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawMarks() {
  const canvas = document.getElementById("circleCanvas");
  const safeAngle = (a) => (isFinite(a) ? a : 0);
  marks.forEach((markObj) => {
    const a = safeAngle(markObj.angle);
    // use `a` when computing cos/sin
  });
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  marks.forEach((markObj) => {
    const { angle, timeLabel } = markObj;

    // Draw red dot
    ctx.beginPath();
    ctx.arc(
      centerX + radius * Math.cos(angle),
      centerY + radius * Math.sin(angle),
      5,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "red";
    ctx.fill();

    // Draw time label next to the dot
    ctx.font = "14px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(
      timeLabel,
      centerX + radius * Math.cos(angle) + 10, // offset a bit to the right
      centerY + radius * Math.sin(angle)
    );
  });
}

function updateImagePosition() {
  if (!runningImg.value) return;

  // detect actual displayed size of the image
  const imgRect = runningImg.value.getBoundingClientRect();
  const imgSize = (imgRect.width + imgRect.height) / 2 || 50; // fallback

  runningImg.value.style.left = `${
    centerX + radius * Math.cos(angle) - imgSize / 2
  }px`;
  runningImg.value.style.top = `${
    centerY + radius * Math.sin(angle) - imgSize / 2
  }px`;

  // draw marks (this only draws marks on top — you already redraw base circle on reset/mount)
  drawMarks();
}

onMounted(() => {
  drawBaseCircle();
});

// Helper
function addZero(x) {
  return x < 10 ? "0" + x : x;
}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap");
.clockarea {
  background-image: radial-gradient(
      circle at 60% center,
      rgba(255, 255, 0, 0.2) 10%,
      rgba(255, 0, 0, 0.2)
    ),
    url("/luckydraw/bg.jpg");
  background-size: cover; /* scale image to fill */
  background-position: center;
  background-blend-mode: normal;
}
.speech-bubble {
  background: #fff;
  border: 2px solid #333;
  border-radius: 10px;
  padding: 6px 10px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  position: absolute;
  white-space: nowrap;
}

.speech-bubble::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 20px;
  border-width: 10px 10px 0;
  border-style: solid;
  border-color: #fff transparent transparent;
}
.hover-bubble {
  background: #fffae6;
  border: 2px solid #f0a500;
  color: #d35400;
  padding: 6px 12px;
  border-radius: 12px;
  font-weight: bold;
  white-space: nowrap;
}
.start-bubble {
  background: #e6f7ff;
  border: 2px solid #1890ff;
  color: #0050b3;
  padding: 6px 12px;
  border-radius: 12px;
  font-weight: bold;
  white-space: nowrap;
}
.clockway {
  height: 100px;
  width: 200px;
  top: 0;
  left: 10%;
  z-index: 1;
  background-image: linear-gradient(skyblue, white, skyblue);
  opacity: 70%;
  box-shadow: 0px 0px 20px white;
}
.theclock {
  top: 0;
  left: 12%;
  z-index: 2;
}
.runimage {
  box-shadow: 0px 1px 30px white;
  border-radius: 50%;
  z-index: 5;
}
</style>
