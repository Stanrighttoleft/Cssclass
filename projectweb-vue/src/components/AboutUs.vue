<template>
  <div class="container-fluid m-0 p-0">
      <div class="row bg-warning">
        <div class="col-lg-3 d-none d-lg-inline"><img class="styleimg" :src="styleimg" alt=""></div>
        <div class=" col-md-3 d-flex justify-content-center"><img class="aboutimg" :src="aboutus" > </div>
        <div class="col-lg-6 col-md-9 ">
            <div class="d-flex justify-content-end" ><motion.img class="shipment2" 
                :src="shipmentpic"
                :initial="{opacity:0, x:0}"
                :while-in-view="{
                    opacity:1,
                    x:-50,
                    transition:{
                        duration:1
                    }
                    }"
                 alt=""></motion.img>
            </div>
            <div class="about d-flex align-items-center"><h3 class="text-white">在每一個細節中{{ displayedText }}</h3></div>
        </div>
        
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { motion } from 'motion-v';
const styleimg='/assets/shipment1.png';
const aboutus='/assets/aboutus.svg'
const shipmentpic='/assets/shipment3.png'

const contents=["下苦功把事情做得最好，讓每個收到貨的人都像是收到國外的禮物般受到尊重的感覺。很多時候物流得不方便讓我們在選購東西的時候有了猶豫，即使知道商品是好的，但就是不容易取得，澳打團購就是要彌補這塊鴻溝，讓消費者在團購國外商品時也能夠買得安全又安心。","用心思把每樣東西做到位，把顧客的東西當作自己的東西一樣全程追蹤和把關，在每一個環節都做到位。","用毅力做著同個事業，把每個步驟都做到位，把顧客放在第一位。","用行動在每個任務上都用上全力，主動關心每個需求。"]
const contentsIndex=ref(0)
const characterIndex=ref(0)
const displayedText=ref("")

function updateText(){
    characterIndex.value++
    
    const currentContents=contents[contentsIndex.value]
    displayedText.value=currentContents.slice(0,characterIndex.value)

    if(characterIndex.value===currentContents.length){
        contentsIndex.value=(contentsIndex.value+1) % contents.length
        characterIndex.value=0
    }
    setTimeout(updateText,100)
}

onMounted(()=>{
    updateText()
})




</script>

<style>
.styleimg{
    width: 400px;
}
.aboutimg{
    width:200px;
}
.shipment2{
    width:300px;
    height: 150px;
}
.about{
    height: 400px;
    
}


</style>