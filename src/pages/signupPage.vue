<template>
    <div class="div">

        <form class="signupDetails" @submit.prevent="createAccount">
            <h1>Sign Up</h1>
            <div class="signupBox">
                <input type="text" placeholder="Enter First Name" v-model="signUser.firstName" required>
                <div class="errors" v-if="(signUser.firstName.trim().length < 5) && signUpErr.length > 0">Firstname length
                    should be greater than 5</div>
                <input type="text" placeholder="Enter Last Name" v-model="signUser.lastName" required>
                <div class="errors" v-if="(signUser.lastName.trim().length < 5) && signUpErr.length > 0">Lastname length should
                    be greater than 5</div>
                <input type="email" placeholder="Enter Your Email" v-model="signUser.email" required>
                <div class="errors" v-if="(signUser.email.trim().length < 5) && emailCheck.length != 0">Email is invalid </div>
                <input type="password" placeholder="Enter Password" v-model="signUser.password" required>
                <div class="errors" v-if="(signUser.password.trim().length < 8) && signUpErr.length > 0">Password length should
                    be greater than 8</div>
                <div class="errors" v-if="(signUser.password.trim().length > 8) && passwordCheck.length != 0">Password must
                    contain at least one digit, one lowercase letter, and one uppercase letter</div>

                <select class="formRole" v-model="signUser.roleId" required>
                    <option>Select A Role</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                </select>

                <div class="errors" v-if="userExit.length !=0" >User already exist</div>
                <button id="btn">
                    <span v-if="isLoading"><i class="fa fa-spinner fa-spin"></i></span>
                    <span v-if="!isLoading">Create account</span>
                </button>
                <div v-if="isSubmitted" class="modal">
                    <div class="modal-content">
                <sucessSignup >
                    <template v-slot:content>You have successfully registered</template>
                </sucessSignup>
                </div>
                </div>
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
import { signupApi } from '../composables/signup.js';
import sucessSignup from '../components/sucessSignupModal.vue'

const store = useStore();
const roles = ref([]);

onMounted(() => {
    store.dispatch('fetchRoles').then(() => {
        roles.value = store.getters.getRoles;
    });
});


const { createAccount, signUser, signUpErr, isLoading, passwordCheck, emailCheck, isSubmitted ,userExit} = signupApi(store);



</script>

<style scoped>
* {
    font-family: sans-serif;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    text-align: center;
  }
.errors {
    color: red;
    font-size: 10px;
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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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

select {
    padding: .7rem;
    margin: .4rem .7rem;
    font-size: 1.4rem;
    border-radius: .4rem;
}

option {
    padding: .7rem;
    margin: .4rem .7rem;
    font-size: 1.4rem;
    border-radius: .4rem;
}

#btn {
    margin: 1rem;
    border-radius: .4rem;
    padding: .5rem;
    background-color: rgb(59, 97, 59);
    color: white;
    font-size: 24px;
    cursor: pointer;
    border: none;
}

a {
    color: green;
    cursor: pointer;
}</style>