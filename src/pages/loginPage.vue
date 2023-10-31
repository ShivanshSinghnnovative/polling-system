<template>
    <form class="bg-gray-200 w-full justify-center h-screen text-center flex flex-col" @submit.prevent="loginAccount">
        <div class="bg-white mv:p-1 m-auto lg:w-2/5 md:w-3/5 sm:w-4/5 mv:w-4/5 xl:w-2/6 rounded-md shadow-md">
            <h2 class="md:text-3xl font-bold pt-4 mv:pt-2 mv:text-lg">Login Now</h2>
            <div class="md:p-4 flex flex-col justify-center text-center">
                <input type="email" placeholder="Enter Your Email" v-model="loginUserDetails.email"
                    class="border-black border-2 md:p-2 xll:text-3xl mv:p-1 md:m-4 mv:m-2 md:mb-2 mv:mb-0 md:text-2xl mv:text-base rounded-md w-5/5"
                    required />
                <div
                    class="border-black border-2 md:mt-4 md:p-2 md:text-2xl mv:text-base mv:p-1 md:m-4 mv:m-2 mv:mt-0 xll:text-3xl text-xl flex justify-between rounded-md w-5/5">
                    <input :type="hidePassword ? 'text' : 'password'" placeholder="Enter Your Password"
                        class="outline-none w-4/5" v-model="loginUserDetails.password" required />
                    <font-awesome-icon :icon="hidePassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                        class="cursor-pointer m-1 mt-1" @click="togglePassword" />
                </div>
                <span class="text-red-500 text-left text-lg pl-2">{{ loginErr }} </span>
                <button
                    class="md:m-4 mv:m-2 mv:mt-3 rounded-md md:p-2 mv:p-1 bg-green-700 text-white md:text-3xl mv:text-base cursor-pointer border-none">
                    <span v-if="isLoading"> <loaderIcon /></span>
                    <span v-else>Login</span>
                </button>
                <div>
                    <p class="md:text-xl mv:text-xs">Don't have an account ?</p>
                    <router-link to="/register">
                        <a class="text-green-700 md:text-xl mv:text-xs cursor-pointer mt-4">create an account</a>
                    </router-link>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { loginApi } from "../composables/loginSignup.js";
import loaderIcon from "../components/loaderIcon.vue"
const {
    loginAccount,
    loginUserDetails,
    loginErr,
    isLoading,
    togglePassword,
    hidePassword,
} = loginApi();
import { useStore } from "vuex";
import { onMounted } from "vue";
const store = useStore();
const clearLoginError = async () => {
    await store.commit("clearLoginError");
};
onMounted(() => {
    clearLoginError();
});
</script>
