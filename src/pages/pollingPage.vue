<template>
  <div class="w-full mt-2 text-right">
 <button @click="createPoll" class=" bg-green-700 text-right text-white text-2xl p-3">
  Add a new poll
 </button>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const createPoll = (()=>{
  router.push('/addpoll')
})
</script>