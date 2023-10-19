<template>
    <div class="w-full justify-center h-screen flex flex-col bg-gray-300 text-center  m-auto ">
        <h3 class="text-2xl pb-6 font-bold ">Update the Existing title</h3>
        <div class=" ">
            <input class="text-3xl border-black border-2 p-3 w-2/5  " v-model="title" type="text">
        </div>
        <div>
            <button
                class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 md:mt-6 font-bold md:text-lg  mv:text-xs mv:p-2 mv:mt-1 "
                @click="updateTitle(title, id)" type="submit">Update</button>
            <button
                class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 md:mt-6 font-bold md:text-lg mv:text-xs mv:p-2 mv:mt-1 "
                @click="goBack">Back</button>
        </div>
    </div>
</template>

<script setup>
import { openSingleApi } from '@/composables/pollingDetails';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.id
const title = ref('')
const { singlePoll, getPollById, goBack, updateTitle } = openSingleApi()
onMounted(async () => {
    await getPollById(id)
    if (singlePoll) {
        console.log(singlePoll.value)
        title.value = singlePoll.value.title
    }
})


</script>