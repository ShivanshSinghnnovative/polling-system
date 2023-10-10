<template>
    <form class="loginContainer" @submit.prevent="loginAccount">
        <div class="loginDiv">
            <h2>Login Now</h2>
            <div class="loginDetails">
                <input type="email" id="emailField" placeholder="Enter Your Email" v-model="loginUserDetails.email"
                    required><br>
                <!-- <input type="password" placeholder="Enter Your password" v-model="loginUserDetails.password" required> -->

                <div class="passwordInput">
                    <input id="passBorder" :type="hidePassword ? 'text' : 'password'" placeholder="Enter Your Password"
                        v-model="loginUserDetails.password" required>
                    <font-awesome-icon :icon="hidePassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" id="eye"
                        @click="togglePassword" />
                </div>

                <span class="errors">{{ loginErr }} </span>
                <button id="btn">
                    <span v-if="isLoading">
                        <font-awesome-icon icon="fa-solid fa-spinner" /></span>
                    <span v-else>Login</span>
                </button>
                <div>
                    <p>Don't have an account ?</p>
                    <router-link to="/signup"><a>create an account</a></router-link>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { loginApi } from '../composables/loginsignup.js';
const { loginAccount, loginUserDetails, loginErr, isLoading, togglePassword, hidePassword } = loginApi()

import { useStore } from 'vuex';
import { onMounted } from 'vue';

const store = useStore();
const clearLoginError = () => {
    store.commit('clearLoginError');
};
onMounted(() => {
    clearLoginError();
})
</script>

<style scoped>
* {
    font-family: sans-serif;
}

.loginContainer {
    width: 101%;
    height: 100.5vh;
    background-color: rgb(235, 235, 235);
    text-align: center;
    margin: -7px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#eye {
    cursor: pointer;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.6rem .7rem;

}

.passwordInput {
    border: 2px solid black;
    text-align: left;

    margin: 0rem .7rem;
    display: flex;
    justify-content: space-between;
    border-radius: .4rem;
}

#passBorder {
    border: none;
    padding-left: 0;
}

input:focus {
    outline: none;
}

.errors {
    color: red;
    font-size: 19px;
    text-align: left;
    padding-left: .8rem;
}


.loginDiv {
    background-color: white;
    padding: 1rem;
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

.loginDetails input {
    padding: 1rem;
    margin: .6rem;
    font-size: 1.4rem;
    border-radius: .4rem;

}

.loginDetails {
    display: flex;
    flex-direction: column;
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

@media screen and (min-width:1600px) and (max-width:2560px) {


    h2 {
        font-size: 3rem;

    }

    .loginDetails input {
        font-size: 2rem;
    }

    #btn {
        font-size: 1.8rem;
        padding: 1rem;
    }

    p {
        font-size: 1.5rem;
    }

    a {
        font-size: 1.5rem;
    }
}

@media screen and (min-width:769px) and (max-width:1025px) {
    .loginDiv {
        width: 60%;
        margin-left: 20%;
    }
}

@media screen and (min-width:426px) and (max-width:768px) {
    .loginDiv {
        width: 60%;
        margin-left: 20%;
    }
}

@media screen and (min-width:100px) and (max-width:426px) {
    .loginDiv {
        width: 80%;
        margin-left: 6%;
    }

    .div {
        width: 104%;
    }

    p {
        font-size: .8rem;
    }

    a {
        font-size: .8rem;
    }

    .loginDetails input {
        font-size: 1.1rem;
        padding: .7rem;
    }

    #btn {
        font-size: 1rem;
    }
}

@media screen and (min-width:321px) and (max-width:376px) {
    .loginDiv {
        width: 86%;
        margin-left: 2%;
    }

    .div {
        width: 108%;
    }
}

@media screen and (min-width:121px) and (max-width:321px) {
    .loginDiv {
        width: 88%;
        margin-left: 2%;
    }

    #passBorder {
        font-size: 14px;
    }

    #emailField {
        font-size: 14px;
    }

    #eye {
        margin: 1rem .7rem;
    }
}
</style>