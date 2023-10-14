<template>
    <div class="w-full h-screen flex justify-center  bg-gray-200">
        <form class="m-auto  flex flex-col lg:w-2/5 md:w-3/5 bg-white   p-4 mv:w-4/5 ">
            <label class=" xl:text-2xl m-2 mv:text-lg md:text-2xl ">Title:</label>
            <input type="text" placeholder="enter title" v-model="newPoll.title"
                class="border-black border-2 md:text-2xl  rounded p-2 mv:text-lg m-2 xl:text-2xl ">
            <label class=" xl:text-2xl md:text-2xl  mv:text-lg m-2">Options:</label>
            <div class="border-black flex border-2 rounded p-2 m-2 mv:text-lg justify-between text-2xl ">
                <input v-model="option" class="outline-none md:text-2xl  mv:text-lg w-4/5" placeholder="Enter options">
                <div @click="addOptions" v-if="option.trim().length > 0" class="cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                </div>
            </div>
            <div>
                <div class="flex flex-wrap rounded m-2 w-5/5">
                    <span v-for="(option, index) in newPoll.options " :key="index">
                        <div class="border-black border-2 m-2 rounded p-1 md:text-2xl  mv:text-lg bg-gray-200 ">
                            <span class="text-xl p-2">{{ option }}</span>
                            <span class="p-2 cursor-pointer" @click="updateOption(option, index)">
                                <font-awesome-icon icon="fa-solid fa-pen" /></span>
                            <span class="p-2 cursor-pointer" @click="deleteOption(index)">
                                <font-awesome-icon icon="fa-solid fa-trash" /></span>
                        </div>

                    </span>
                </div>
            </div>
            <h4 class=" text-sm text-red-500">{{ addError }}</h4>
            <div>
                <button
                    class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 md:mt-6 font-bold md:text-lg  mv:text-xs mv:p-2 mv:mt-1 "
                    @click="addNewPoll" type="submit">Submit</button>
                <button
                    class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 md:mt-6 font-bold md:text-lg mv:text-xs mv:p-2 mv:mt-1 "
                    @click="goBack">Back</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { createNewPollApi } from "../composables/pollingDetails.js";
const {
    addNewPoll,
    newPoll,
    addOptions,
    addError,
    option,
    updateOption,
    deleteOption
} = createNewPollApi();
const router = useRouter();
const goBack = (() => {
    router.go(-1);
})
</script>