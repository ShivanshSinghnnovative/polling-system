<template>
    <div class="bg-green-700 p-3 w-full flex justify-between pt-0 pb-0 pl-3 pr-3 mv:p-2 sm:p-3 md:p-3  ">
        <div class="md:hidden" v-if="user.roleId === 1" @click="toggleMobileMenu">Menu
            <div v-if="showMenu">
                <navbarMenu />
            </div>
        </div>
        <div class="hidden md:flex " v-if="user.roleId === 1">
            <div class="text-xl text-white mv:text-xs sm:text-base md:text-xl lg:text-2xl ">
                <button @click="createPoll" v-if="user.roleId === 1"
                    class=" bg-green-900 rounded-md text-right text-white mv:text-xs sm:text-base text-md mr-5 mt-1 mb-0 font-serif p-2 pr-3 pl-3">
                    Add Poll
                </button>
                <button @click="openAllPoll"
                    class=" bg-green-900 rounded-md text-right text-white mv:text-xs sm:text-base text-md mr-5 mt-1 mb-0 font-serif p-2 pr-3 pl-3">
                    Polls
                </button>
                <button v-if="user.roleId === 1"
                    class=" bg-green-900 rounded-md text-right text-white mv:text-xs sm:text-base text-md mr-5 mt-1 mb-0 font-serif p-2 pr-3 pl-3">
                    Create User
                </button>
                <button v-if="user.roleId === 1"
                    class=" bg-green-900 rounded-md text-right text-white mv:text-xs sm:text-base text-md mr-5 mt-1 mb-0 font-serif p-2 pr-3 pl-3">
                    List User
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
                <div class=" bg-blue-300 pl-4 pr-4 pt-2.5 pb-2.5 mt-0 ml-2 mb-0 rounded-full ">
                    <font-awesome-icon :icon="['fas', 'user']" @click="toggleLogoutModal" />
                </div>
            </button>
            <div v-if="toggleLogout">
                <logoutModal :user="user" />
            </div>
        </div>
    </div>
</template>
<script setup>
import logoutModal from './logoutModal.vue'
import navbarMenu from './navbarMenu.vue'
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
const store = useStore()
const user = computed(() => {
    return store.state.user
})
onMounted(() => {
    store.commit('setUserDetails')
})
import { useRouter } from 'vue-router';
const router = useRouter();
const createPoll = (() => {
    router.push('/addpoll')
})
const openAllPoll = (() => {
    router.push('/polling')
})
const showMenu = ref(false);

const toggleMobileMenu = () => {
    showMenu.value = !showMenu.value;
};
const toggleLogout = ref(false);
const toggleLogoutModal = () => {
    toggleLogout.value = !toggleLogout.value;
    console.log(toggleLogout.value)
    console.log(user.value)
}
</script>