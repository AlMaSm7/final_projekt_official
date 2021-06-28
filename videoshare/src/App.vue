<template>
  <div id="app">
    <login v-if="!user_here" />
    <register v-if="!user_here" />
    <home v-if="user_here && !watchvideo && !acc" />
    <player v-if="watchvideo" />
    <userInfo v-if="acc"/>
    <upload/>
  </div>
</template>

<script>
import Vue from "vue";

import Register from "./components/register.vue";
import login from "./components/login.vue";
import home from "./components/home.vue";
import player from "./components/player.vue";
import userInfo from "./components/user.vue"
import upload from './components/upload.vue'

import { uuid } from "vue-uuid";
import store from "./store";
import "es6-promise/auto";

Vue.use(uuid);

export default {
  name: "App",
  components: {
    login,
    Register,
    home,
    player,
    userInfo,
    upload
  },
  data() {
    return {
      user_here: false,
      user: store.state.key, // this.CryptoJS.AES.decrypt(store.state.key, this.$key),
      username: store.state.username,
      watching: store.state.watch_video,
    };
  },
  computed: {
    watchvideo: function () {
      return store.state.watch_video;
    },
    acc: function (){
      return store.state.acc
    }
  },
  methods: {
    logged_in: function () {
      return new Promise((resolve, reject) => {
        let cookie = Vue.$cookies.get(store.state.username);
        console.log(cookie);
        if (cookie != null) {
          resolve("Session Found");
        } else {
          reject("No Session Found");
        }
      });
    },
  },
  asyncComputed: {
    created() {
      console.log(this.user);
      console.log(this.username);
      this.logged_in()
        .then((result) => {
          console.log(result);
          this.user_here = true;
          //store.commit('setNull')
        })
        .catch((err) => {
          console.log(err);
          this.user_here = false;
          store.commit("logout");
          store.commit("setNull");
        });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(225, 225, 225);
  margin-top: 60px;
}
body {
  background-color: rgb(50, 50, 50);
}
</style>
