<template>
    <div class="bigBoxx">
        <div class="centerDiv">
            <slot name="content"></slot>

            <div> <button @click="go">ok </button> </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { signupApi } from '../composables/signup.js';
const store = useStore();

const { go } = signupApi(store);

</script>

<style scoped>
.centerDiv {
    border: 2px solid black;
    padding: 4rem 7rem;
    color: white;
    font-size: 1.3rem;

    background-color: rgb(46, 77, 43);
}

button {
    margin-top: 1rem;
    font-size: 20px;
    padding: 0.4rem 1rem;
    border-radius: 5px;
    font-size: 1rem;
    background-color: white;
}

@media screen and (min-width:320px) and (max-width:426px) {
    .centerDiv {
        width: 50%;
        padding: 1.5rem 3rem;
        font-size: 13px;
        margin-left: 10%;
    }

    button {
        font-size: 13px;
        padding: .3rem .5rem;
    }
}
</style>
