<template>
    <div class="content">
        <div class="component">
            <register v-if="register_computed"/>
            <login v-if="login_computed"/><br>
            <button @click="loginCheck()" v-if="!loginIn" class="switcher">Login Page</button>
            <button @click="registerCheck()" v-if="!registering" class="switcher">Register Page</button>
        </div>
    </div>
</template>

<script>
import register from './register.vue'
import login from "./login.vue" 

export default {
    components: {
        register,
        login
    },
    computed: {
        register_computed: function (){
            return this.registering
        },
        login_computed: function (){
            return this.loginIn
        }
    },
    data() {
        return {
            registering: false,
            loginIn: true
        }
    },
    methods: {
        loginCheck: function login(){
            this.loginIn = true
            this.registering = false
        },
        registerCheck: function registerCheck(){
            this.loginIn = false
            this.registering = true
        }
    },
}
</script>

<style>
    .switcher{
        background-color: black;
        color: rgb(167, 167, 167);
        border: none;
        border-radius: 4px;
        transition: 0.7s;
        width: 200px;
        height: 35px;
    }
    .switcher:hover{
        color: rgb(221, 221, 221);
        background-color: rgb(43, 66, 129);
    }
</style>