<template>
  <div class="w-4/5  p-8 m-3 rounded bg-gray-100 ml-auto mr-auto">
    <span class=" text-7xl flex justify-center " v-if="isLoading && !polls.length">
      <loaderIcon />
    </span>

    <div v-for="poll in polls" :key="poll.id">
      <h1 class="text-2xl font-medium breal-all break-words md:text-xl lg:text-2xl lg:mt-3 mv:text-sm ">Title: {{
        poll.title }}
        <span class="p-2 cursor-pointer" @click="updateTitle(poll.id)" v-if="user && user.roleId === 1">
          <font-awesome-icon icon="fa-solid fa-pen" /></span>
        <span class="p-2 cursor-pointer" @click="openDeleteModal(poll.id)" v-if="user && user.roleId === 1">
          <font-awesome-icon icon="fa-solid fa-trash" />
        </span>
        <span class="p-2 cursor-pointer" @click="showResult(poll.id)" v-if="user && user.roleId === 1">
          <font-awesome-icon :icon="['fas', 'chart-bar']" />
        </span>
        <span class="p-2 cursor-pointer" @click="openSinglePoll(poll.id)">
          <font-awesome-icon icon="fa-solid fa-arrow-right" /></span>
      </h1>
      <h1 class="text-xl pt-2 pb-1 mv:text-xs md:text-lg ">Options: </h1>
      <div v-for="opt in poll.optionList" :key="opt.id" class="bg-white">
        <h3 class="pl-4 pt-4 mv:text-xs mv:pt-2 md:pt-3 md:text-lg ">
          <input :disabled="isOptionDisabled(opt.pollId)" name="x" @click="selectedOption(opt.id, opt.pollId)"
            type="radio" v-if="!votedOption(opt.id)" class="p-4 cursor-pointer">
          <input v-else :disabled="isOptionDisabled(opt.pollId)" type="radio" checked>
          {{ opt.optionTitle }}
        </h3>
      </div>
      <button @click="increaseVote()" v-if="poll.id == voteOptionPollId && !isOptionDisabled(poll.id)"
        class=" bg-green-900 rounded-md  text-white mv:text-xs sm:text-base text-md mr-5 mt-3 mb-3 font-serif p-2 pr-3 pl-3">
        Vote
      </button>
      <hr>
    </div>
    <div v-if="resultPopUp">
      <barChart @openResultModal="showResult(pollId)" :pollId="barChartPollId" />
    </div>
    <div v-if="deletePopUp">
      <deleteModal @confirmDelete="confirmDelete" @openDeleteModal="openDeleteModal">
        <template v-slot:title>Are you sure to delete Poll</template>
      </deleteModal>
    </div>
    <div class="w-full ml-4/5  text-right ">
      <button @click="getMorePolls" v-if="showMoreButtonDisable"
        class=" bg-green-900 rounded-md  text-white mv:text-xs sm:text-base text-md mr-5 mt-3 mb-3 font-serif p-2 pr-3 pl-3">
        <span v-if="isLoading">
          <loaderIcon />
        </span>
        <span v-else>Show More</span></button>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import barChart from '../components/barChartModal.vue'
import deleteModal from '../components/deletePopModal.vue'
import loaderIcon from "../components/loaderIcon.vue"
import { getAllPollsApi } from '@/composables/pollingDetails';
import { voteCounting } from '@/composables/pollingDetails';
const router = useRouter();
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
const deletePopUp = ref(false);
const resultPopUp = ref(false);
const store = useStore()
const user = computed(() => {
  return store.state.user
})
onMounted(() => {
  store.commit('setUserDetails')
})
const updateTitle = ((id) => {
  router.push(`/updatepoll/${id}`)
})
const openSinglePoll = ((id) => {
  router.push(`/singlepoll/${id}`)
})
const pollId = ref(null);
const pollOptionId = ref(null);
const voteOptionPollId = ref(null);
const barChartPollId = ref(null);
const openDeleteModal = (id) => {
  deletePopUp.value = !deletePopUp.value;
  pollId.value = id;
};
const showResult = (id) => {
  resultPopUp.value = !resultPopUp.value;
  barChartPollId.value = id;
  console.log(id)
};
const selectedOption = (optionId, pollId) => {
  pollOptionId.value = optionId
  voteOptionPollId.value = pollId
}
const confirmDelete = async () => {
  await deletePoll(pollId.value);
  deletePopUp.value = false
}
const increaseVote = async () => {
  await voteButton(pollOptionId.value, voteOptionPollId.value);
  voteOptionPollId.value = null
}
const isOptionDisabled = (pollId) => {
  const storedPollIds = JSON.parse(localStorage.getItem('voteOptionPollIds')) || [];
  return storedPollIds.includes(pollId);
};
const votedOption = (optionId) => {
  const storedPollOptionId = JSON.parse(localStorage.getItem('voteOptionIds')) || [];
  return storedPollOptionId.includes(optionId);
};
const {
  polls,
  getMorePolls,
  isLoading,
  deletePoll,
  showMoreButtonDisable
} = getAllPollsApi();

const {
  voteButton
} = voteCounting();
</script>