<template>
    <div class=" inset-0 bg-black h-full  fixed bg-opacity-50" @click="$emit('openResultModal')">
    <div class="absolute top-1/4 left-1/3 transform " @click.stop>
    <CanvasJSChart :options="options"/>
    </div>
    </div>
  </template>
<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
defineEmits(['openResultModal']);
const options = ref({
  animationEnabled: true,
  title: {
    text: "Vue.js Basic Bar Chart" 
  },
  data: [{
    type: "bar", 
    dataPoints: [
      { label: "apple",  y: 10 },
      { label: "orange", y: 15 },
      { label: "banana", y: 25 },
      { label: "mango",  y: 30 },
      { label: "grape",  y: 28 }
    ]
  }]
});
</script>


