<template>
  <div class="h-screen m-auto fixed flex justify-center" v-if="isLoading">
    <loaderIcon />
  </div>
  <div class="  inset-0 bg-black h-full  fixed bg-opacity-50" @click="$emit('openResultModal')"
    v-if="singlePoll && !isLoading">
    <div class="absolute top-1/4 left-1/3 transform " @click.stop>
      <CanvasJSChart :options="options" />
    </div>
  </div>
</template>
<script setup>
import { defineEmits, defineProps, ref, onMounted } from 'vue';
import loaderIcon from './loaderIcon.vue'
import { createUpdateandopenSinglePagePollApi } from '@/composables/pollingDetails'
const options = ref({});
const props = defineProps(['pollId']);
defineEmits(['openResultModal']);
onMounted(() => {
  openSinglePoll()
});

const openSinglePoll = async () => {
  await getPollById(props.pollId);
  if (singlePoll.value) {
    options.value = {
      animationEnabled: true,
      title: {
        text: singlePoll.value ? singlePoll.value.title : '',
      },
      data: [{
        type: "bar",
        dataPoints: singlePoll.value.optionList.map((data) => ({
          label: data.optionTitle,
          y: data.voteCount.length
        }))
      }]
    }
  }
};
const { getPollById, singlePoll, isLoading } = createUpdateandopenSinglePagePollApi();

</script>


