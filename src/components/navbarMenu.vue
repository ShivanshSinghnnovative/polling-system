<template>
    <div class="bg-gray-300 w-2/5 pt-1 left-1 absolute p-3">
        <button @click="createPoll"
            class=" bg-green-900 rounded-md text-center text-white mv:text-xx sm:text-xy text-md mr-5 mt-1 mb-2 font-serif p-2 pr-3 pl-3">
            Add Poll
        </button>
        <button @click="openAllPoll"
            class=" bg-green-900 rounded-md text-center text-white mv:text-xx sm:text-xy text-md mr-5 mt-1 mb-2 font-serif p-2 pr-3 pl-3">
            Polls
        </button>
        <button
            class=" bg-green-900 rounded-md text-center text-white mv:text-xx sm:text-xy text-md mr-5 mt-1 mb-2 font-serif p-2 pr-3 pl-3">
            Create User
        </button>
        <button
            class=" bg-green-900 rounded-md text-center text-white mv:text-xx sm:text-xy text-md mr-5 mt-1 mb-0 font-serif p-2 pr-3 pl-3">
            List User
        </button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const createPoll = (() => {
    router.push('/addpoll')
})
const openAllPoll = (() => {
    router.push('/polling')
})
</script>
