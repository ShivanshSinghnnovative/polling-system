<template>
  <div class="h-screen m-auto flex justify-center" v-if="isLoading">
    <span class=" text-7xl flex justify-center  m-auto">
      <loaderIcon />
    </span>
  </div>
  <div class="flex justify-center h-screen bg-gray-200 " v-if="singlePoll && !isLoading">
    <div class="w-2/5 m-auto pl-4 pr-4 h-fit bg-white rounded flex flex-col">
      <div class="text-2xl m-3 rounded flex justify-center bg-gray-400"> 
      <div class="text-2xl p-4 font-bold m-auto bg-gray-400">{{singlePoll.title}}</div> </div>
      <h1 class="text-2xl mt-3">Options:</h1>
      <div v-for="option in singlePoll.optionList" :key="option.id" class="bg-white">
        <h3 class="pl-4 pt-4 mv:text-xs mv:pt-2 md:pt-3 md:text-lg ">
          {{ option.optionTitle }}
        </h3>
      </div>
      <button
        class="bg-green-600 rounded shadow px-3 text-white mb-3 w-2/5 m-auto  py-3 md:mt-6 font-bold md:text-lg mv:text-xs mv:p-2 mv:mt-1 "
        @click="goBack">Back</button>
    </div>
  </div>
</template>

<script setup>
import { createUpdateandopenSinglePagePollApi } from '@/composables/pollingDetails';
import loaderIcon from "../components/loaderIcon.vue"
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()
onMounted(() => {
  openSinglePoll();
});
const { getPollById, goBack, singlePoll, isLoading } = createUpdateandopenSinglePagePollApi();

const openSinglePoll = async () => {
  const id = route.params.id;
  await getPollById(id);
};
</script>


