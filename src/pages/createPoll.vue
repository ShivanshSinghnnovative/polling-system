<template>
    <div class="w-full h-screen flex justify-center  bg-gray-200">
        <form class="m-auto  flex flex-col w-2/5 bg-white   p-4">
            <label class="text-2xl m-2 ">Title:</label>
            <input type="text" v-model="title" class="border-black border-2 p-2 m-2 text-2xl ">

            <label class="text-2xl m-2">Options:</label>
            <input v-model="newSkill" class="border-black border-2 p-2 m-2 text-2xl " @keyup.enter="addSkill"
                placeholder="Enter skills">

            <div id="addSkill">
                <p v-for="(skill, index) in skills" :key="index">
                    <span>{{ skill }}</span>
                    <button class="delete" @click="removeSkill(index)">x</button>
                </p>
            </div>
            <div>
                <button class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 mt-8 font-bold text-lg "
                 @click="addPoll"    type="submit">Submit</button>
                <button class="bg-green-600 rounded shadow px-3 text-white m-2 py-3 mt-8 font-bold text-lg "
                    @click="goBack">Back</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { addPolling } from "../composables/pollingdetails.js";
const {
   addPoll
} = addPolling();


let  newSkill = ref('');
const title=ref('')

const router = useRouter();
let skills = [];
const goBack = (() => {
    router.push('/polling')
})


const addSkill = (() => {
    const skillText = newSkill.value;
    if (skillText !== "") {
        skills.push(skillText);
        newSkill.value = '';
    }
})
const removeSkill = ((index) => {
    skills.splice(index, 1);
})
</script>