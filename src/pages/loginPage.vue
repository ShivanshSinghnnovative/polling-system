<template>
    <form class="loginContainer" @submit.prevent="loginAccount">
        <div class="loginDiv">
            <h2>Login Now</h2>
            <div class="loginDetails">
                <input type="email" placeholder="Enter Your Email" v-model="loginUser.email" required><br>
                <input type="text" placeholder="Enter Your password" v-model="loginUser.password" required>
                <span class="errors">{{ loginError }} </span>
                <button id='btn'>Login</button>
                <div>
                    <p>Don't have an account ?</p>
                    <router-link to="/signup"><a>create an account</a></router-link>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import { useStore } from 'vuex';
import { loginApi } from '../composables/signup.js';
const store = useStore();

const { loginAccount, loginUser, loginError } = loginApi(store)

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
    .loginDiv {
        height: 40%;
    }

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
</style>