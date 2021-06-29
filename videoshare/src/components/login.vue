<template>
    <div class="body_div">
        <div class="flex">
            <h2>Login</h2>
            <input type="text" placeholder="Username..." v-model="username"/>
            <input type="password" placeholder="Password..." v-model="password"/>
            <button @click="login()" type="submit" value="submit">Submit</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Vue from "vue";
import { bus } from "../main.js";
import store from '../store.js';
export default {
    name: "login",
    data() {
        return {
            username: "",
            password: ""
        }
    },

    
    methods: {
        login: async function login() {
            const { username, password } = this;
            axios
            .post("http://localhost:3000/login", {
                username,
                password
            })
            .then((Response) => {
                //console.log(Response);
                console.log("no error");
                Vue.$cookies.set(
                    username,
                    "97410df8-c866-11eb-b8bc-0242ac130003",
                    "1d"
                )

                //this.$rsa.setBit(1024)

                //console.log(this.$key)
                //console.log(Response.data[0].user_id)
                let uid = Response.data[0].user_id
                //  console.log(uid)
                //let final_uid = this.$rsa.encrypt(uid)
                //console.log(final_uid)
                let uname = Response.data[0].username
                console.log(uid)
                store.commit('login', { username: uname, uid: uid })
                console.log(store.state)
                bus.$emit("cookieset", username)
            })
            .catch((error) => {
                console.log(error);
            })
        }   
    }
}
</script>

<style>
    .flex{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 25px;
    }
    .body_div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 30vh;
    }
    .flex > button{
        background-color: black;
        color: rgb(167, 167, 167);
        border: none;
        border-radius: 4px;
        transition: 0.7s;
        width: 200px;
        height: 35px;
    }
    .flex > h2 {
        font-size: 60px;
    }
    .flex >input{
        background-color: rgb(31, 31, 31);
        border-radius: 5px;
        border: none;   
        margin-left: 100px;
        margin-right: 100px;
        width: 500px;
        height: 40px;
        color: rgb(167, 167, 167);
    }
    .flex > input:focus{
        color: rgb(167, 167, 167);
        outline: none !important;
        border:1px solid rgb(46, 129, 43);
        box-shadow: 0 0 10px #719ECE;
    }
    .flex > button:hover{
        color: rgb(221, 221, 221);
        background-color: rgb(46, 129, 43);
    }
</style>
