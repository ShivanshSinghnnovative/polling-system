<template>
    <span class=" text-7xl flex justify-center " v-if="isLoading">
        <loaderIcon />
    </span>
    <div v-else class="w-full h-screen flex justify-center  bg-gray-200">
        <div class="m-auto  flex flex-col lg:w-2/5 md:w-3/5 bg-white   p-4 mv:w-4/5 ">
            <label class=" xl:text-2xl m-2 mv:text-lg md:text-2xl ">Title:</label>
            <input type="text" placeholder="enter title" v-model="newPoll.title"
                class="border-black border-2 md:text-2xl  rounded p-2 mv:text-lg m-2 xl:text-2xl ">
            <label class=" xl:text-2xl md:text-2xl  mv:text-lg m-2">Options:</label>
            <div v-if="id !== undefined && id !== null">
                <div v-if="option.optionTitle"
                    class="border-black flex border-2 rounded p-2 m-2 mv:text-lg justify-between text-2xl ">
                    <input v-model="option.optionTitle" class="outline-none md:text-2xl  mv:text-lg w-4/5"
                        placeholder="Enter options">
                    <div @click="updateExistingOption(option.optionTitle, option.id, id)"
                        v-if="option.optionTitle && option.optionTitle.trim().length > 0" class="cursor-pointer">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                    </div>
                </div>
                <div v-else class="border-black flex border-2 rounded p-2 m-2 mv:text-lg justify-between text-2xl ">
                    <input v-model="option" @keyup.enter="addOptionInExistingPoll(option, id)"
                        class="outline-none md:text-2xl  mv:text-lg w-4/5" placeholder="Enter options">
                    <div @click="addOptionInExistingPoll(option, id)" v-if="option.trim().length > 0"
                        class="cursor-pointer">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                    </div>
                </div>
            </div>
            <div v-else class="border-black flex border-2 rounded p-2 m-2 mv:text-lg justify-between text-2xl ">
                <input v-model="option" @keyup.enter="addOptions" class="outline-none md:text-2xl  mv:text-lg w-4/5"
                    placeholder="Enter options">
                <div @click="addOptions" v-if="option.trim().length > 0" class="cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                </div>
            </div>
            <div>
                <div class="flex flex-wrap rounded m-2 w-5/5">
                    <span v-for="(item, index) in  newPoll.options  " :key="index">
                        <div class="border-black border-2 m-2 rounded p-1 md:text-2xl  mv:text-lg bg-gray-200 "
                            v-if="id !== undefined && id !== null && item.id !== option.id">
                            <span class=" text-xl p-2">{{ item.optionTitle }}</span>
                            <span class="p-2 cursor-pointer" @click="updateExistingPollOption(item, index)">
                                <font-awesome-icon icon="fa-solid fa-pen" /></span>
                            <span class="p-2 cursor-pointer" @click="openDeleteModal(index, item.id)"
                                v-if="newPoll.options.length > 3">
                                <font-awesome-icon icon="fa-solid fa-trash" /></span>
                        </div>
                        <div class="border-black border-2 m-2 rounded p-1 md:text-2xl  mv:text-lg bg-gray-200 "
                            v-if="id == undefined && id == null && item.id == option.id">
                            <span class="text-xl p-2">{{ item }}</span>
                            <span class="p-2 cursor-pointer" @click="updateOption(item, index)">
                                <font-awesome-icon icon="fa-solid fa-pen" /></span>
                            <span class="p-2 cursor-pointer" @click="deleteOption(index)">
                                <font-awesome-icon icon="fa-solid fa-trash" /></span>
                        </div>
                    </span>
                </div>
            </div>
            <div v-if="deletePopUp">
                <deleteModal @confirmDelete="confirmDelete" @openDeleteModal="openDeleteModal">
                    <template v-slot:title>Are you Sure to delete the Poll Option</template>
                </deleteModal>
            </div>
            <h4 class=" text-sm text-red-500">{{ addError }}</h4>
            <div>
                <button
                    class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 md:mt-6 font-bold md:text-lg  mv:text-xs mv:p-2 mv:mt-1 "
                    v-if="id !== undefined && id !== null" @click="updateTitle(newPoll.title, id)"
                    type="submit">Update</button>
                <button
                    class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 md:mt-6 font-bold md:text-lg  mv:text-xs mv:p-2 mv:mt-1 "
                    v-else @click="addNewPoll" type="submit">Submit</button>

                <button
                    class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 md:mt-6 font-bold md:text-lg mv:text-xs mv:p-2 mv:mt-1 "
                    @click="goBack">Back</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { createUpdateandopenSinglePagePollApi } from "../composables/pollingDetails.js";
import loaderIcon from '@/components/loaderIcon.vue';
import deleteModal from '../components/deletePopModal.vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id
onMounted(async () => {
    if (id !== undefined && id !== null && id.trim() !== "") {
        await getPollById(id)
        if (singlePoll) {
            newPoll.title = singlePoll.value.title
            newPoll.options = singlePoll.value.optionList
        }
    }
})
const deletePollId = ref(null);
const deletePopUp = ref(false);
const indexPoll = ref(null);
const openDeleteModal = (deletePollIndex, id) => {
    deletePopUp.value = !deletePopUp.value;
    deletePollId.value = id;
    indexPoll.value = deletePollIndex;
};
const confirmDelete = async () => {
    await deleteExistingOption(indexPoll.value, deletePollId.value);
    deletePopUp.value = false
}
const {
    addNewPoll,
    newPoll,
    addOptions,
    addError,
    option,
    updateOption,
    deleteOption,
    goBack,
    singlePoll,
    getPollById,
    updateTitle,
    deleteExistingOption,
    addOptionInExistingPoll,
    updateExistingPollOption,
    updateExistingOption,
    isLoading
} = createUpdateandopenSinglePagePollApi();
</script>