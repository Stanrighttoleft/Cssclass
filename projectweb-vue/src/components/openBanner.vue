<script setup>



</script>

<template>
    <div class="open">
        <p>test</p>
        
    </div>

</template>

<style>
.open{
    background-image: url('./assets/open-field.jpg');
    background-size: cover;
    height: 670px;
    overflow: hidden;
    position: relative;
    

}
.open::before{
    content: '';
    position: absolute;
    top:40%;
    left: 0;
    right: 0;
    bottom: -70%;
    background-image:url('./assets/grass1.svg');
    background-repeat: repeat-x;
    background-position: center;
    

}
.open::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(256, 256,256, 0.3);  
    z-index: 1;
}


</style>