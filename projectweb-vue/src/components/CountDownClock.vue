<template>
    <div class="container countdownclock">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="clockarea w-100 h-5 bg-light d-flex justify-content-center">
                    <div class="theclock">{{ clocktime }}</div>
                    
                </div>
                <!-- input fields -->
                 <div class="mb-3 ">
                    <label for="" class="form-label">調整分鐘</label>
                    <input type="number" v-model.number="inputMinutes" min="0" class="form-control mb-2" placeholder="Minutes"
                    style="width: 200px;">
                    <label for="" class="form-label">自訂秒數</label>
                    <input type="number" v-model.number="inputSeconds" min="0" max="59" class="form-control" placeholder="Seconds"
                    style="width: 200px;">
                 </div>
                <button class="btn btn-warning me-5" @click="toggleStatus">{{clockStatus}}</button>
                <button class="btn btn-danger" @click="resetTimer">Reset</button>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
let minutes=ref(5);
let seconds=ref(0);
let secondcount=ref(0);
let inputMinutes=ref(5);
let inputSeconds=ref(0);

//status toggle
let clockStatus=ref('Start');
let interval=null;

//computed display time
let clocktime=computed(()=>{
    return `${addZero(minutes.value)}:${addZero(seconds.value)}:${addZero(secondcount.value)}`
})

//watch clockstatus to start/stop countdown
watch(clockStatus,(newVal)=>{
    if(newVal === 'Stop'){
        startCountdown();
    }else{
        stopCountdown();
    }
})
//toggle between start and stop
function toggleStatus(){
    clockStatus.value=clockStatus.value==='Start' ?'Stop':'Start';
}

//countdown logic
function startCountdown(){
    if(interval) return;
    interval=setInterval(()=>{
        if(secondcount.value>0){
            secondcount.value--;
        }else if(seconds.value>0){
            seconds.value--;
            secondcount.value=9;
        }else if(minutes.value>0){
            minutes.value--;
            seconds.value=59;
            secondcount.value=9;
        }else{
            stopCountdown()
        }
    },100)
}

function stopCountdown(){
    if(interval){
        clearInterval(interval);
        interval=null;
    }
}
//reset to input values
function resetTimer(){
    stopCountdown();
    minutes.value = Math.max(0, parseInt(inputMinutes.value) || 0);
    seconds.value = Math.min(59, Math.max(0, parseInt(inputSeconds.value) || 0));
    secondcount.value = 0;
    clockStatus.value='Start';
}

function rand(min, max){
            min=Math.ceil(min);
            max=Math.floor(max);
            return Math.floor(Math.random()*(max-min+1)+min);   
        }
function addZero(x){
            return((x<10) ?"0"+x :x);
        }

</script>

<style>

</style>