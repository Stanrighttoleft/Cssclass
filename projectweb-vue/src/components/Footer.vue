<template>
    <motion.div :class="[{active:startAnim },'footerdiv position-relative  container-fluid bg-secondary text-white pt-3']"
    :initial="{opacity:0}"
    :whileInView="{opacity:1}"
    @viewport-enter="startAnim=true"
    @viewport-leave="startAnim=false"

    >
        <div class="row">
            <div class="col-md-3">掃我到客服</div>
            <div class="col-md-3"><img class="img-fluid" src="/assets/logov12.png" alt=""></div>
            <div class="col-md-6 d-flex justify-content-center">
                <ul class="list-unstyled">
                    <li class="">澳丁團購</li>
                    <li class="">會員登入</li>
                    <li class="">購物流程</li>
                    <li class="">隱私權聲明</li>
                    <li class="">會員條款</li>
                    <li class="">FAQ問與答</li>
                    <li class="">聯絡我們</li>
                    <li class=" ">追蹤澳丁</li>

                </ul>
            </div>
        </div>
        <hr>
        <div class="d-flex justify-content-center">copyright</div>
    </motion.div>
    
  
</template>

<script setup>
import { ref } from 'vue';
import { motion } from 'motion-v';

const startAnim=ref(false)

</script>

<style>
.footerdiv::before{
    content: '';
    position:absolute;
    display:block;
    background-image: url('/assets/footer.png');
    background-size: auto 100%;
    gap: 0;
    width:200%;
    height: 200px;
    background-repeat: repeat-x;
   
    margin: 0;
    padding: 0;
   
    bottom: 100%;
    left:0;
    z-index: 0;
    
}
.footerdiv.active::before{
    animation:pulse 2s ease-in-out;
}

@keyframes pulse{
    0%{
        transform:translateX(0) translateY(0) scale(1);
        
        

    }
    50%{
        transform:translateX(-20%) translateY(1%) scale(1.1);
        
        
    }
    100%{
        transform:translateX(0) translateY(0) scale(1);
        
        
    }
}

</style>