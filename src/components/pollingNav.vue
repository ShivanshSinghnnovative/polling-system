<template>
    <div class="bg-green-700 p-3 w-full flex justify-between pl-3 pr-3">
        <div class="text-xl text-white"> Welcome
            {{ user.firstName }} {{ user.lastName }}
        </div>

        <div class="text-xl text-white">
            POLLING
        </div>
        <div class="border-black bg-white p-1 mr-4">
            <button class="  border-black text-xl  text-black" @click="logoutUser">
                <router-link to="/">Logout</router-link>
            </button>
        </div>
    </div>
</template>
<script setup>
import {defineProps} from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
defineProps({
    user : {
        type: Object
    }
})
const store = useStore()
const router  = useRouter()
const logoutUser = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    store.commit('setUser')
    router.push('/')
}

</script>