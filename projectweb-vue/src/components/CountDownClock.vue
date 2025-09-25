<template>
    <div class="container countdownclock">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="clockarea w-100 h-5 bg-light d-flex justify-content-center">{{ clocktime }}</div>
                <div class="btn btn-warning" @click="toggleStatus">{{clockStatus}}</div>
                <div class="btn btn-danger">Reset</div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
let minutes=ref(5);
let seconds=ref(0);
let secondcount=ref(0);
let clockStatus=ref('Start')
let clocktime=computed(()=>{
    return `${addZero(minutes.value)}:${addZero(seconds.value)}:${addZero(secondcount.value)}`
})

function toggleStatus(){
    clockStatus.value=clockStatus.value==='Start' ?'Stop':'Start';
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