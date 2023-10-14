<template>
    <div class="bg-green-700 p-4 md:p-8">
        <div class="border-2 border-black p-4 md:p-8 text-white text-lg md:text-2xl">
            <slot name="content"></slot>
            <div>
                <button @click="sucessfullSignup"
                    class="mt-4 text-lg md:text-xl px-4 py-2 rounded bg-white text-black cursor-pointer">
                    OK
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { signupApi } from '../composables/loginSignup.js';
const { sucessfullSignup } = signupApi();
</script>

