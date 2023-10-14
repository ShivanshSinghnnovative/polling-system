<template>
  <div class="w-full mt-2 text-right">
    <button @click="createPoll"
      class=" bg-green-900 rounded-md text-right text-white mv:text-xs sm:text-base text-md mr-5 mt-3 mb-3 font-serif p-2 pr-3 pl-3">
      Create Poll
    </button>
  </div>
  <div class="w-4/5  p-8 m-3 rounded bg-gray-100 ml-auto mr-auto">
    <span class=" text-7xl flex justify-center " v-if="isLoading && !polls.length">
      <font-awesome-icon icon="fa-solid fa-spinner" spin />
    </span>
    <div v-for="poll in polls" :key="poll.id">
      <h1 class="text-2xl font-medium breal-all break-words  md:text-xl lg:text-2xl lg:mt-3 mv:text-sm ">Title: {{
        poll.title }}
        <span class="p-2 cursor-pointer" @click="updateTitle(poll.id)">
          <font-awesome-icon icon="fa-solid fa-pen" /></span>
        <span class="p-2 cursor-pointer">
          <font-awesome-icon icon="fa-solid fa-trash" /></span>
      </h1>
      <h1 class="text-xl pt-2 pb-1 mv:text-xs md:text-lg ">Options: </h1>
      <div v-for="opt in poll.optionList" :key="opt.id" class="bg-white">
        <h3 class="pl-4 pt-4 mv:text-xs mv:pt-2 md:pt-3 md:text-lg ">
          <input type="checkbox" class="p-4 cursor-pointer">
          {{ opt.optionTitle }}
        </h3>
      </div>
      <hr>
    </div>
    <div class="w-full ml-4/5  text-right ">
      <button @click="getMorePolls"
        class=" bg-green-900 rounded-md  text-white mv:text-xs sm:text-base text-md mr-5 mt-3 mb-3 font-serif p-2 pr-3 pl-3">
        <span v-if="isLoading">
          <font-awesome-icon icon="fa-solid fa-spinner" spin />
        </span>
        <span v-else>Show More</span></button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getAllPollsApi } from '@/composables/pollingDetails';
const router = useRouter();
const createPoll = (() => {
  router.push('/addpoll')
})
const updateTitle = ((id) => {
  router.push(`/updatetitle/${id}`)
})
const {
  polls,
  getMorePolls,
  isLoading,
} = getAllPollsApi();

</script>