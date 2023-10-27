<template>
  <div class=" inset-0 bg-black h-full  fixed bg-opacity-50" @click="$emit('openDeleteModal')">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" @click.stop>
      <div class="bg-green-500 p-4 md:p-8 relative text-center justify-center">
        <div class="border-2 border-black p-4 md:p-8 text-white text-lg md:text-2xl">
          <slot name="title"></slot>
          <div class="flex justify-evenly">
            <button class="mt-4 text-lg md:text-xl px-4 py-2 rounded bg-white text-black cursor-pointer"
              @click="$emit('confirmDelete')">
              Yes
            </button>
            <button class="mt-4 text-lg md:text-xl px-4 py-2 rounded bg-white text-black cursor-pointer"
              @click="$emit('openDeleteModal')">
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';
defineEmits(['openDeleteModal', 'confirmDelete']);
</script>

