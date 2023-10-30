<template>
    <div class="bg-green-700 p-3 w-full flex justify-between pt-0 pb-0 pl-3 pr-3 mv:p-2 sm:p-3 md:p-3  ">
        <div class="md:hidden text-white text-base text-bold " v-if="user.roleId === 1" @click="toggleMobileMenu">Menu
            <div v-if="showMenu">
                <navbarMenu />
            </div>
        </div>
        <div class="hidden md:flex " v-if="user.roleId === 1">
            <div class="text-xl text-white xl:text-xl mv:text-xs sm:text-base md:text-xl lg:text-2xl "
                v-for="item in routesArr" :key="item.id">
                <button @click="navigateRoute(item.id, item.href)"
                    class="rounded-md text-center text-white mv:text-xx sm:text-xy text-md mr-5 mt-1 mb-2 font-serif p-2 pr-3 pl-3"
                    :class="currentRoute === item.name ? 'bg-blue-950' : 'bg-green-900'">
                    {{ item.title }}
                </button>
            </div>

        </div>
        <div v-else>
            <button @click="openAllPoll"
                class=" bg-green-900 rounded-md text-right text-white mv:text-xs sm:text-base text-md mr-5 mt-1 mb-0 font-serif p-2 pr-3 pl-3">
                Polls
            </button>
        </div>
        <div class="text-2xl text-white mv:text-xs md:text-xl sm:text-base lg:text-2xl ">
        </div>
        <div>
            <button
                class="border-black flex text-xs mb-0 lg:text-2xl sm:text-base  md:text-xl text-black mv:text-xs text-md  rounded-full pl-4  font-medium pr-4">
                <div class="flex flex-col text-base text-white mb-0 ">
                    <div> {{ user.firstName }} {{ user.lastName }} </div>
                    {{ user.email }}
                </div>
                <div class=" bg-blue-300 pl-4 pr-4 pt-2.5 pb-2.5 mt-0 ml-2 mb-0 rounded-full " @click="toggleLogoutModal">
                    <font-awesome-icon :icon="['fas', 'user']" />
                </div>
            </button>
            <div v-if="toggleLogout">
                <logoutModal :user="user" @closeModal="toggleLogoutModal" />
            </div>
        </div>
    </div>
</template>
<script setup>
import logoutModal from './logoutModal.vue'
import navbarMenu from './navbarMenu.vue'
import { routesArr } from '../navMenuDetails/config.js';
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore()
const user = computed(() => {
    return store.state.user
})
onMounted(() => {
    store.commit('setUserDetails')
})
const router = useRouter();
const showMenu = ref(false);
const activeButton = ref(null);

const openAllPoll = (() => {
    router.push('/polling')
})
const navigateRoute = (id, href) => {
    router.push(`${href}`)
    activeButton.value = id
}

const currentRoute = computed(() => {
    return (router.currentRoute.value.name)
})

const toggleMobileMenu = () => {
    showMenu.value = !showMenu.value;
};
const toggleLogout = ref(false);
const toggleLogoutModal = () => {
    toggleLogout.value = !toggleLogout.value;
}
</script>