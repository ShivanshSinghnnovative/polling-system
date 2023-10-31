<template>
    <div class="w-full h-screen bg-gray-200 text-center flex flex-col justify-center">
        <form class="bg-white md:p-6 mv:p-1 lg:w-2/5 rounded-md shadow-md m-auto md:w-3/5 sm:w-4/5 mv:w-5/6"
            @submit.prevent="createAccount">
            <h1 class="md:text-3xl font-bold md:pt-1 md:p-2 mv:p-1 mv:text-lg"> {{ route.name === 'signup' ? 'Sign Up' :
                'Create User' }}</h1>
            <div class="flex flex-col">
                <input type="text"
                    class="border-black border-2 xll:text-3xl md:p-2 mv:p-1 md:m-4 mv:m-2 mb-2 md:text-xl md:mb-1 mv:text-base rounded-md w-5/5"
                    placeholder="Enter First Name" v-model="signUser.firstName" required />
                <div class="text-red-500 text-left mv:text-sm md:text-lg pl-2"
                    v-if="signUser.firstName.trim().length < 5 && signUpErr.length > 0">
                    Firstname length should be greater than 5
                </div>
                <input type="text"
                    class="border-black border-2 xll:text-3xl md:mb-1 md:p-2 mv:p-1 md:m-4 mv:m-2 mb-2 md:text-xl mv:text-base rounded-md w-5/5"
                    placeholder="Enter Last Name" v-model="signUser.lastName" required />
                <div class="text-red-500 text-left mv:text-sm md:text-lg pl-2"
                    v-if="signUser.lastName.trim().length < 5 && signUpErr.length > 0">
                    Lastname length should be greater than 5
                </div>
                <input type="email"
                    class="border-black border-2 xll:text-3xl md:mb-1md:p-2 mv:p-1 md:m-4 mv:m-2 md:mb-1 mb-2 md:text-xl mv:text-base rounded-md w-5/5"
                    placeholder="Enter Your Email" v-model="signUser.email" required />
                <div class="text-red-500 text-left mv:text-sm md:text-lg pl-2"
                    v-if="signUser.email.trim().length < 5 && emailCheck.length != 0">
                    {{ emailCheck }}
                </div>
                <div
                    class="border-black border-2 md:p-2 mv:p-1 md:mb-1 md:m-4 mv:m-2 mb-2 md:text-xl xll:text-3xl mv:text-base flex justify-between rounded-md w-5/5">
                    <input :type="hidePassword ? 'text' : 'password'" placeholder="Enter Password"
                        class="outline-none w-4/5" v-model="signUser.password" required />
                    <font-awesome-icon :icon="hidePassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                        class="cursor-pointer m-1 mt-1;" @click="togglePassword" />
                </div>
                <div class="text-red-500 text-left mv:text-sm md:text-lg pl-2"
                    v-if="signUser.password.trim().length < 8 && signUpErr.length > 0">
                    Password length should be greater than 8
                </div>
                <div class="text-red-500 text-left md:text-lg mv:text-xs pl-2"
                    v-if="signUser.password.trim().length >= 8 && passwordCheck.length != 0">
                    {{ passwordCheck }}
                </div>
                <select class="border-black border-2 md:mb-1 md:p-2 mv:p-1 mv:text-base md:m-4 mv:m-2 rounded-md w-5/5"
                    v-model="signUser.roleId" required>
                    <option>Select A Role</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">
                        {{ role.name }}
                    </option>
                </select>
                <div class="text-red-500 text-left text-lg pl-2" v-if="userExist.length != 0">
                    {{ userExist }}
                </div>
                <div v-if="route.name == 'register'">
                    <button
                        class="md:m-4 mv:m-2 xll:text-3xl rounded-md md:mb-1 md:p-2 mv:p-1 bg-green-700 text-white md:text-3xl mv:text-base cursor-pointer border-none">
                        <span v-if="isLoading">
                            <loaderIcon />
                        </span>
                        <span v-else>Create account</span>
                    </button>
                    <div v-if="openSuccesModal"
                        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div class="bg-white p-20 rounded-md shadow-md text-center">
                            <sucessSignup>
                                <template v-slot:content>You have successfully registered</template>
                            </sucessSignup>
                        </div>
                    </div>
                    <div>
                        <p class="mv:text-xs md:text-xl md:mt-2">Already a Member ?</p>
                        <router-link to="/"><a class="text-green-700 cursor-pointer mt-4 mv:text-xs md:text-xl">Log
                                In</a></router-link>
                    </div>
                </div>
                <div v-else>
                    <button
                        class="md:m-4 mv:m-2 xll:text-3xl rounded-md md:mb-1 md:p-2 mv:p-1 bg-green-700 text-white md:text-3xl mv:text-base cursor-pointer border-none">
                        <span v-if="isLoading">
                            <loaderIcon />
                        </span>
                        <span v-else>Create User</span>
                    </button>
                    <div v-if="openSuccesModal"
                        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div class="bg-white p-20 rounded-md shadow-md text-center">
                            <sucessSignup>
                                <template v-slot:content>You have successfully created a user </template>
                            </sucessSignup>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { signupApi } from "../composables/loginSignup.js";
import loaderIcon from "../components/loaderIcon.vue"
import sucessSignup from "../components/sucessSignupModal.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const {
    createAccount,
    signUser,
    roles,
    signUpErr,
    isLoading,
    passwordCheck,
    emailCheck,
    openSuccesModal,
    userExist,
    togglePassword,
    hidePassword,
} = signupApi();
</script>
