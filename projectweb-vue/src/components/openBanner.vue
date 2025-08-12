<script setup>

import { ref } from 'vue';
const rabbit = ref('/assets/rabbit.png');
const fu = ref('/assets/fun.png')
const cloud = ref('/assets/cloud.svg')
const cloud2 = '/assets/cloud2.svg'
import { motion, useScroll } from 'motion-v';

const { scrollProgress } = useScroll()

const scrollIndicator = {
    rotate: scrollProgress,
}





</script>

<template>
    <div class="open d-flex justify-content-center align-items-center position-relative">

        <motion.div :initial="{
            x: 0,
            opacity: 0,
            scale: 0.8
        }" :whileInView="{
            y: [0, -50, 0],
            opacity: 1,
            transition: { duration: 2 },
            scale: 1
        }" :whilePress="{ y: -50 }">
            <img :src=rabbit alt="">
        </motion.div>
        <div class="fu">
            <motion.img :src=fu alt="" :initial="{ rotate: 0 }" :whileInView="{
                rotate: 180,
                transition: {
                    delay: 0.5,
                    duration: 1
                }
            }"></motion.img>
        </div>
        <div class="cloud position-absolute ">
            <motion.img :src=cloud alt="" :initial="{
                x: 0,
                opacity: 0
            }" :whileInView="{
                    x: 100,
                    opacity: 0.7,
                    transition: {
                        delay: 0.5,
                        duration: 1,
                    }
                }"></motion.img>
        </div>
        <div class="cloud2 position-absolute ">
            <motion.img :src=cloud2 alt="" :initial="{
                x: 0,
                opacity: 0
            }" :whileInView="{
                    x: -100,
                    opacity: 0.7,
                    transition: {
                        delay: 0.5,
                        duration: 1,
                    }
                }"></motion.img>
        </div>

    </div>

</template>

<style>
.open {
    background-image: url('/assets/bg-banner.jpg');
    background-size: cover;
    height: 670px;
    overflow: hidden;




}

.open::before {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 300px;

    bottom: 0%;
    background-image: url('/assets/grass.svg');
    background-size: contain;
    background-repeat: repeat-x;
    background-position: center;
    z-index: 2;
}

.open::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 1;
    pointer-events: none;
}

.fu {
    transform: translate(-40%, -80%)
}

.cloud {
    width: 500px;
    height: 500px;
    top: 50%;
    left: 0;
    z-index: 3;

}

.cloud2 {
    width: 600px;
    height: 600px;
    top: 60%;
    right: 0;
    z-index: 3;

}
</style>