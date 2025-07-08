<template>
  <div :class="`image-card-container-${visibleNumber} contain`">
    <div class="card" v-for="(image, index) in visibleList" :key="index">
      <img :src="image.src" class="card-img-top" alt="" />
      <div class="card-body text-danger ">{{ image.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageCard',
  props: {
    imageList: {
      type: Array,
      default: () => [],
    },
    visibleNumber: {
      type: [Number, String],
      default: 3,
      validator(value) {
        return value > 0 && value <= 5;
      },
    },
  },
  computed: {
    visibleList() {
      return this.imageList.slice(0, this.visibleNumber);
    },
  },
};
</script>

<style scoped>
.card-img-top{
  width: 300px;
  height: 300px;
}
.card{
  width:300px;
  display: flex;
  flex-direction: column;
}
.contain{
  display:flex;
  flex-wrap: wrap;
}
</style>