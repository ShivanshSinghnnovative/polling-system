<template>
    <div class=" inset-0 bg-black h-full  absolute bg-opacity-50" @click="closeMenu">
        <div class="bg-gray-200  bg-opacity-.5 absolute mt-20 right-2" @click.stop>
            <button
                class="border-black  text-xl bg-green-400 text-center flex  m-5 justify-center lg:text-2xl sm:text-base  md:text-xl text-black mv:text-xs text-md rounded-md pl-4 p-1 font-medium pr-4"
                @click="logoutUser">
                Logout
            </button>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
import { useStore } from 'vuex';
const store = useStore()

const logoutUser = async () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    await store.commit('setUserDetails')
    router.push('/')
}
const closeMenu = () => {
    const backdrop = document.querySelector('.bg-opacity-50');
    backdrop.parentNode.removeChild(backdrop);
};
</script>
