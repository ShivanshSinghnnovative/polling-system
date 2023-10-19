<template>
  <div class="flex justify-center h-screen bg-gray-200 " v-if="singlePoll">
    <div class=" border-black border-2 w-2/6 pl-4 pr-4 bg-white m-auto flex flex-col">
      <h1 class="text-2xl mt-3">Title : </h1>
      <input class="border-black text-2xl p-2 w-4/4 mt-2 border-2" type="text" v-model="singlePoll.title" readonly>
      <h1 class="text-2xl mt-3">Options:</h1>
      <div v-for="option in singlePoll.optionList" :key="option.id" class="bg-white">
        <h3 class="pl-4 pt-4 mv:text-xs mv:pt-2 md:pt-3 md:text-lg ">
          <input type="checkbox" class="p-4 cursor-pointer">
          {{ option.optionTitle }}
        </h3>
      </div>
      <button
        class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 md:mt-6 font-bold md:text-lg mv:text-xs mv:p-2 mv:mt-1 "
        @click="goBack">Back</button>
    </div>
  </div>
</template>

<script setup>
import { openSingleApi } from '@/composables/pollingDetails';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()
onMounted(() => {
  openSinglePoll();
});
const { getPollById, goBack, singlePoll } = openSingleApi();

const openSinglePoll = async () => {
  const id = route.params.id;
  await getPollById(id);
};
</script>


