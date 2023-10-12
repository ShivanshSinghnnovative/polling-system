<template>
    <div class="w-full h-screen flex justify-center  bg-gray-200">
        <form class="m-auto  flex flex-col w-2/5 bg-white   p-4">
            <label class="text-2xl m-2 ">Title:</label>
            <input type="text" placeholder="enter title" v-model="newPoll.title" class="border-black border-2 p-2 m-2 text-2xl ">

            <label class="text-2xl m-2">Options:</label>
            <div  class="border-black flex border-2 p-2 m-2 justify-between text-2xl ">
                <input v-model="option" class="outline-none w-4/5" placeholder="Enter options">
                <div @click="addOptions" class="cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                </div>
            </div>
           
            <div v-for="option in newPoll.options" :key="option" >
                <span class="text-xl p-2">{{ option }}</span>
                <span class="p-2 cursor-pointer" @click="updateOption(option)">
                    <font-awesome-icon icon="fa-solid fa-pen" /></span>
                <span class="p-2 cursor-pointer" @click="deleteOption(option)" >
                    <font-awesome-icon icon="fa-solid fa-trash" /></span>
            </div>
            <h4 class=" text-sm text-red-500">{{ addError }}</h4>

            <div>
                <button class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 mt-8 font-bold text-lg "
                    @click="addNewPoll" type="submit">Submit</button>
                <button class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 mt-8 font-bold text-lg "
                    @click="goBack">Back</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';


import { addPolling } from "../composables/pollingdetails.js";
const {
    addNewPoll,
    newPoll,
    addOptions,
    addError,
    option,
    updateOption,
    deleteOption
} = addPolling();


const router = useRouter();

const goBack = (() => {
    router.push('/polling')
})



</script>