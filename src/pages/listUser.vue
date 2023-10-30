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
    <padination />
  </div>
</template>

<script setup>
import { usersList } from "../composables/userListandCreateUser.js";
import loaderIcon from "../components/loaderIcon.vue";
import padination from "../components/paginationDiv.vue";
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
const { usersListData, isLoading } = usersList();
</script>
