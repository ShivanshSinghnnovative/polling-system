<template>
    <div class="bg-gray-300 w-2/5 pt-1 left-1 absolute p-3">
        <div v-for="item in routesArr" :key="item.id">
            <button @click="navigateRoute(item.id, item.href)"
                class="rounded-md text-center text-white mv:text-xx sm:text-xy text-md mr-5 mt-1 mb-2 font-serif p-2 pr-3 pl-3"
                :class="activeButton === item.id ? 'bg-blue-900' : 'bg-green-900'">
                {{ item.name }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const routesArr = [
    {
        id: '1',
        name: 'Add Poll',
        href: '/addpoll'
    },
    {
        id: '2',
        name: 'Polls',
        href: '/polling'
    },
    {
        id: '3',
        name: 'Create User',
        href: '/'
    },
    {
        id: '4',
        name: 'List User',
        href: '/'
    }
]
const activeButton = ref(null);
const navigateRoute = (id, href) => {
    router.push(`${href}`)
    activeButton.value = id
}
</script>
