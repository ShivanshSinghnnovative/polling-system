<template>
   <div class="div">

    <div class="signupDetails">
        <h1>Sign Up</h1>
        <div class="signupBox">
        <input type="text" placeholder="Enter First Name"><br>
        <input type="text" placeholder="Enter Last Name"><br>
        <input type="text" placeholder="Enter Your Email"><br>
        <input type="text" placeholder="Enter Password"><br>

        <button id="btn" >Create account </button>
        <div>
            <p>Already a Member  ?</p>
            <router-link to="/"><a>Log In</a></router-link>
        </div>
    </div>
         
    </div>
   </div>
</template>

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