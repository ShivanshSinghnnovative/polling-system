<template>
    <div class="div">
        <div class="loginDiv">
            <h2>Login Now</h2>
            <div class="loginDetails">
                <input type="email" placeholder="Enter Your Email" ><br>
                <input type="text" placeholder="Enter Your password"  >
                <button id='btn'>Login</button>
                <div>
                    <p>Don't have an account ?</p>
                    <router-link to="/signup"><a>create an account</a></router-link>
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

.loginDiv {
    background-color: white;
    padding: 1rem;
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