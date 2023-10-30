<template>
    <div class="flex mt-4 absolute right-6">
        <button @click="$emit('getPreviousUsers')" class="bg-gray-900 text-white cursor justify-end p-3 pt-4 flex">
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
        </button>
        <div class="border-2 border-black p-3">page {{ userPageNo }}</div>
        <button @click="$emit('getNextUsers')" class="text-center bg-gray-900 text-white cursor justify-end p-3 pt-4 flex">
            <font-awesome-icon icon="fa-solid fa-arrow-right" />
        </button>
    </div>
    <select class="border-black border-2 md:mb-1 md:p-2 mv:p-1 mv:text-base md:m-4 mv:m-2 rounded-md cursor"
        v-model="limits" @change="$emit('onLimitChange', limits)">
        <option v-for="option in limitOptions" :key="option.value" :value="option.value"
            :selected="option.value === limits">
            {{ option.label }}
        </option>
    </select>
</template>

<script setup>
import { usersList } from "../composables/userListandCreateUser.js";
import { defineEmits, defineProps } from "vue";
defineProps(["userPageNo"])
defineEmits(["getNextUsers", "getPreviousUsers", "onLimitChange"]);
const limitOptions = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "30", value: 30 },
];
const { limits } = usersList();
</script>
