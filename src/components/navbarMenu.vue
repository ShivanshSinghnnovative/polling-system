<template>
    <div class=" inset-0 bg-black h-full  absolute bg-opacity-50"></div>
    <div class="bg-gray-300 w-2/5 pt-1 left-1 absolute p-3">
        <div v-for="item in routesArr" :key="item.id">
            <button @click="navigateRoute(item.id, item.href)"
                class="rounded-md text-center text-white mv:text-xx sm:text-xy text-md mr-5 mt-1 mb-2 font-serif p-2 pr-3 pl-3"
                :class="activeButton === item.id ? 'bg-blue-950' : 'bg-green-900'">
                {{ item.title }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { routesArr } from '../navMenuDetails/config.js';
const router = useRouter();
const activeButton = ref(null);
const navigateRoute = (id, href) => {
    router.push(href)
    activeButton.value = id
}
</script>
