<template>
    <div class="signupContainer">

        <form class="signupDetails" @submit.prevent="createAccount">
            <h1>Sign Up</h1>
            <div class="signupBox">
                <input type="text" placeholder="Enter First Name" v-model="signUser.firstName" required>
                <div class="errors" v-if="(signUser.firstName.trim().length < 5) && signUpErr.length > 0">Firstname length
                    should be greater than 5</div>
                <input type="text" placeholder="Enter Last Name" v-model="signUser.lastName" required>
                <div class="errors" v-if="(signUser.lastName.trim().length < 5) && signUpErr.length > 0">Lastname length
                    should be greater than 5</div>
                <input type="email" placeholder="Enter Your Email" v-model="signUser.email" required>
                <div class="errors" v-if="(signUser.email.trim().length < 5) && emailCheck.length != 0">
                    {{ emailCheck }}
                </div>

                <div class="passwordInput">
                    <input id="passBorder" :type="hidePassword ? 'text' : 'password'" placeholder="Enter Password"
                        v-model="signUser.password" required>
                    <font-awesome-icon :icon="hidePassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" id="eye"
                        @click="togglePassword" />
                </div>

                <div class="errors" v-if="(signUser.password.trim().length < 8) && signUpErr.length > 0">
                    Password length should be greater than 8</div>
                <div class="errors" v-if="(signUser.password.trim().length >= 8) && passwordCheck.length != 0">
                    {{ passwordCheck }}</div>

                <select class="formRole" v-model="signUser.roleId" required>
                    <option>Select A Role</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                </select>

                <div class="errors" v-if="userExist.length != 0">{{ userExist }}</div>
                <button id="btn">
                    <span v-if="isLoading">
                        <font-awesome-icon icon="fa-solid fa-spinner" /></span>
                    <span v-if="!isLoading">Create account</span>
                </button>
                <div v-if="isSubmitted" class="modal">
                    <div class="modal-content">
                        <sucessSignup>
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
import { signupApi } from '../composables/loginsignup.js';
import sucessSignup from '../components/sucessSignupModal.vue'



const { createAccount, signUser, roles, signUpErr, isLoading, passwordCheck, emailCheck, isSubmitted, userExist, togglePassword, hidePassword } = signupApi();



</script>

<style scoped>
* {
    font-family: sans-serif;
}

select {

    background-color: white;
    border: thin solid rgb(0, 0, 0);
    border-radius: 4px;
    display: inline-block;
    font: inherit;
    line-height: 1.5em;
    padding: 0.5em 3.5em 0.5em 1em;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: none;
}

select.formRole {
    background-image:
        linear-gradient(45deg, transparent 50%, black 50%),
        linear-gradient(135deg, black 50%, transparent 50%),
        linear-gradient(to right, lightgray, lightgray);
    background-position:
        calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px),
        100% 0;
    background-size:
        5px 5px,
        5px 5px,
        2.5em 2.5em;
    background-repeat: no-repeat;
}

#eye {
    cursor: pointer;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.2rem .7rem;

}

#passBorder {
    border: none;
    padding-left: 0;
}

input:focus {
    outline: none;
}

.passwordInput {
    border: 2px solid black;
    text-align: left;

    margin: 0rem .7rem;
    display: flex;
    justify-content: space-between;
    border-radius: .4rem;
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
    font-size: 19px;
    text-align: left;
    padding-left: .8rem;
}

.signupContainer {
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
    margin: .6rem .7rem;
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

}

@media screen and (min-width:1600px) and (max-width:2561px) {

    p {
        font-size: 1.5rem;
    }

    a {
        font-size: 1.2rem;
    }
}

@media screen and (min-width:769px) and (max-width:1024px) {
    .passwordInput {
        width: 92%;
    }

    #passBorder {
        width: 80%;

    }

}

@media screen and (min-width:426px) and (max-width:769px) {
    .passwordInput {
        width: 94%;
    }

    .signupBox input {
        font-size: 16px;
    }

    #passBorder {
        width: 80%;

    }

    #btn {
        font-size: 16px;
    }

    p {
        font-size: 1rem;
    }

    a {
        font-size: 1rem;
    }

    .signupDetails {
        width: 60%;
        margin-left: 20%;

    }

    .div {
        width: 102%;
    }

}

@media screen and (min-width:320px) and (max-width:426px) {
    .passwordInput {
        width: 92%;
        padding: 0;
    }

    .div {
        width: 103%;
    }

    .signupBox input {
        padding: .5rem;
        font-size: 16px;
    }

    #passBorder {
        width: 80%;

    }

    #btn {
        font-size: 16px;
    }

    p {
        font-size: .7rem;
    }

    a {
        font-size: .7rem;
    }

    .signupDetails {

        width: 78%;
        margin-left: 9%;

    }

    .errors {
        font-size: 10px;
        text-align: left;
        padding-left: .8rem;
    }

}
</style>