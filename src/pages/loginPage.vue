<template>
    <form class="bg-gray-200 w-full  justify-center  h-screen   text-center flex flex-col " @submit.prevent="loginAccount">
        <div class="bg-white  p-4 m-auto w-2/5 rounded-md shadow-md ">
            <h2 class=" text-3xl font-bold p-4">Login Now</h2>
            <div class="p-4 flex flex-col justify-center text-center ">
                <input type="email" placeholder="Enter Your Email" v-model="loginUserDetails.email" class="border-black border-2 p-2 m-4 mb-2 text-xl  rounded-md w-5/5 "
                    required><br>
               
                <div class="border-black border-2 p-2 m-4 mt-0 text-xl flex justify-between rounded-md w-5/5 ">
                    <input  :type="hidePassword ? 'text' : 'password'" placeholder="Enter Your Password"
                        v-model="loginUserDetails.password" required>
                    <font-awesome-icon :icon="hidePassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" class="cursor-pointer"
                        @click="togglePassword" />
                </div>

                <span class="text-red-500 text-left text-lg pl-2">{{ loginErr }} </span>
                <button class="m-4 rounded-md p-2 bg-green-700 text-white text-3xl cursor-pointer border-none">
                    <span v-if="isLoading">
                        <font-awesome-icon icon="fa-solid fa-spinner" /></span>
                    <span v-else>Login</span>
                </button>
                <div>
                    <p>Don't have an account ?</p>
                    <router-link to="/signup"><a class="text-green-700 cursor-pointer mt-4">create an account</a></router-link>
                </div>
            </div>
        </div>
    </form>
</template>

 <script setup>
import { loginApi } from '../composables/loginsignup.js';
const { loginAccount, loginUserDetails, loginErr, isLoading, togglePassword, hidePassword } = loginApi()

import { useStore } from 'vuex';
import { onMounted } from 'vue';

const store = useStore();
const clearLoginError = () => {
    store.commit('clearLoginError');
};
onMounted(() => {
    clearLoginError();
})
</script>