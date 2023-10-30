<template>
  <span class="h-5/5 mt-2/4 text-center text-7xl flex justify-center" v-if="isLoading">
    <loaderIcon />
  </span>
  <div v-else class="h-screen p-6">
    <div class="bg-green-900 text-white border-2 border-gray-400 text-xl flex justify-between">
      <h1 class="p-3 ml-4">Name</h1>
      <h1 class="p-3">Email</h1>
      <h1 class="p-3 mr-4">Role</h1>
    </div>
    <div v-for="users in usersListData" :key="users.id" class="flex justify-between text-xl border-2 border-gray-200">
      <h1 class="p-3 ml-4">
        <font-awesome-icon :icon="['fas', 'user']" />
        {{ users.firstName }} {{ users.lastName }}
      </h1>
      <h1 class="p-3">
        {{ users.email }}
      </h1>
      <h1 class="p-3 mr-4">
        {{ getRole(users.roleId) }}
      </h1>
    </div>
    <div class="flex mt-4 absolute right-6">
      <button @click="getPreviousUsers" class="bg-gray-900 text-white cursor justify-end p-3 pt-4 flex">
        <font-awesome-icon icon="fa-solid fa-arrow-left" />
      </button>
      <div class="border-2 border-black p-3">page {{ store.state.userPageNo }}</div>
      <button @click="getNextUsers" :disabled="!stopPageIncrement"
        class="text-center bg-gray-900 text-white cursor justify-end p-3 pt-4 flex">
        <font-awesome-icon icon="fa-solid fa-arrow-right" />
      </button>
    </div>
    <select class="border-black border-2 md:mb-1 md:p-2 mv:p-1 mv:text-base md:m-4 mv:m-2 rounded-md cursor"
      v-model="limits" @click="onLimitChange">
      <option v-for="option in limitOptions" :key="option.value" :value="option.value"
        :selected="option.value === limits">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { usersList } from "../composables/userListandCreateUser.js";
import loaderIcon from "../components/loaderIcon.vue";
import { useStore } from "vuex";
const store = useStore();
const getRole = (roleId) => {
  switch (roleId) {
    case 1:
      return "Admin";
    case 2:
      return "User";
    case 3:
      return "HR";
    default:
      return "Unknown";
  }
};
const limitOptions = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
];
const onLimitChange = (async () => {
  await store.dispatch("fetchUsers", {
    userPageNo: store.state.userPageNo,
    limits: limits,
  });
});
const {
  usersListData,
  getNextUsers,
  getPreviousUsers,
  stopPageIncrement,
  isLoading,
  limits,
} = usersList();


</script>
