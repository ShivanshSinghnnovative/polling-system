<template>
  <div class="w-full mt-2 text-right">
    <button @click="createPoll"
      class=" bg-green-900 rounded-md text-right text-white mv:text-xs sm:text-base text-md mr-5 mt-3 mb-3 font-serif p-2 pr-3 pl-3">
      Create Poll
    </button>
  </div>
  <div class="w-4/5  p-8 m-3 rounded bg-gray-100 ml-auto mr-auto">
    <div v-for="poll in polls" :key="poll.id">
      <h1 class="text-2xl font-medium breal-all break-words  md:text-xl lg:text-2xl mv:text-sm ">Title: {{ poll.title }}</h1>
      <h1 class="text-xl pt-2 pb-1 mv:text-xs md:text-lg ">Options: </h1>
      <div v-for="opt in poll.optionList" :key="opt.id" class="bg-white">
        <h3 class="pl-4 pt-4 mv:text-xs mv:pt-2 md:pt-3 md:text-lg "> <input type="checkbox" class="p-4 cursor-pointer"> {{ opt.optionTitle }}</h3>
      </div>
      <hr>
      <br />
    </div>
  </div>
</template>

<script setup>
import { showPollApi } from '../composables/pollingdetails.js'
import { useRouter } from 'vue-router';
const router = useRouter();
const createPoll = (() => {
  router.push('/addpoll')
})
const {
  polls
} = showPollApi();
</script>