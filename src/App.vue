<template>
  <div v-if="user">
    <navBar :user="user" />
  </div>
  <router-view />
</template>

<script setup>

import navBar from './components/pollingNav.vue'
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
const store = useStore()
const user = computed(() => {
  return store.state.user
})

onMounted(() => {
  store.commit('setUserDetails')
})

</script>

