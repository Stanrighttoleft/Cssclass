<template>
    <div>
        <div>

        </div>

        <div>
            <img :src="pen" alt="">
        </div>
    </div>
  
</template>

<script setup>
import { ref } from 'vue';
const name='News'

const pen=ref('./assets/pen.gif')

</script>

<!-- this for the news API -->
<!-- var url = 'https://newsapi.org/v2/everything?' +'q=Apple&'+'from=2025-07-28&' +'sortBy=popularity&'+'apiKey=';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    }) -->

<style>

</style>