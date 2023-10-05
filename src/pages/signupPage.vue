<template>
   <div class="div">

    <form class="signupDetails">
        <h1>Sign Up</h1>
        <div class="signupBox">
        <input type="text" placeholder="Enter First Name" v-model="signUser.firstName" required>
        
        <input type="text" placeholder="Enter Last Name" v-model="signUser.lastName" required>

        <input type="email" placeholder="Enter Your Email" v-model="signUser.email" required>
        
        <input type="text" placeholder="Enter Password" v-model="signUser.password" required>
      
        <select class="formRole" v-model="signUser.roleId" required>
            <option>Select A Role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>

        <button id="btn" @click="createAccount">Create account </button>
        <div>
            <p>Already a Member ?</p>
            <router-link to="/"><a>Log In</a></router-link>
        </div>
   
         
    </div>
</form>
   </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import {signupApi } from '../composables/signup.js';
const store = useStore();
const roles = ref([]);

onMounted(() => {
  store.dispatch('fetchRoles').then(() => {
    roles.value = store.getters.getRoles; 
  });
});


const {createAccount , signUser } =signupApi();


</script>

<style scoped>
*{
    font-family: sans-serif;
}
.div {
    width: 101%;
    height: 100.5vh;
    background-color: rgb(235, 235, 235);
    text-align: center;
    margin: -7px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}


.signupDetails {
    background-color: white;
    padding: .6rem;
    width: 30%;
    border-radius: .4rem;
    box-shadow: 5px 5px grey;
    margin-left: 35%;
    margin-right: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.signupBox {
    display: flex;
    flex-direction: column;
}
.signupBox input {
    padding: .7rem;
    margin: .4rem .7rem;
    font-size: 1.4rem;
    border-radius: .4rem;
}
select{
    padding: .7rem;
    margin: .4rem .7rem;
    font-size: 1.4rem;
    border-radius: .4rem;
}
option{
    padding: .7rem;
    margin: .4rem .7rem;
    font-size: 1.4rem;
    border-radius: .4rem;
}
#btn{
    margin: 1rem;
    border-radius: .4rem;
    padding: .5rem;
    background-color: rgb(59, 97, 59);
    color: white;
    font-size: 24px;
    cursor: pointer;
    border: none;
}

a{
    color: green;
    cursor: pointer;
}
</style>