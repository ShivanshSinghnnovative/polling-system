<template>
    <div class="bg-green-700 p-3 w-full flex justify-between pl-3 pr-3 mv:p-2 sm:p-3 md:p-3  ">
        <div class="text-xl text-white mv:text-xs sm:text-base md:text-xl lg:text-2xl "> Welcome
            {{ user.firstName }} {{ user.lastName }}
        </div>
        <div class="text-2xl text-white mv:text-xs md:text-xl sm:text-base lg:text-2xl ">
            POLLING
        </div>
        <div>
            <button class="border-black text-xl bg-gray-200 lg:text-2xl sm:text-base  md:text-xl text-black mv:text-xs text-md rounded-md pl-4 p-1 font-medium pr-4"
                @click="logoutUser">
                <router-link to="/">Logout</router-link>
            </button>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
defineProps({
    user: {
        type: Object
    }
})
const store = useStore()
const router = useRouter()
const logoutUser = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    store.commit('setUser')
    router.push('/')
}
</script>