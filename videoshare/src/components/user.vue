<template>
    <div>
    <div class="logo">
        <img src="../assets/logo_white_large.png" @click="goHome()" height="100px" width="100px" class="user">
    </div>
        <nav class="navigation">
            <ul @click="change()">User Info</ul>
            <ul @click="myVids()">My Videos</ul>
            <ul @click="showLikedVideos()">Liked Videos</ul>
        </nav>
        <div class="info_users">
            <user_info v-if="here_computed"/>
            <myvideosVue v-if="myvids"/>
            <liked-videos v-if="likedvids_computed"/>
        </div>
    </div>
</template>

<script>
import myvideosVue from './myvideos.vue'
import user_info from "./user_info.vue"
import likedVideos from './likedVideos.vue'
import store from '../store'


export default {
    components: {
        user_info,
        myvideosVue,
        likedVideos
    },
    data() {
        return {
            here: true, 
            myvids_user: false,
            likedvids: false
        }
    },
    computed: {
        myvids: function () {
            return this.myvids_user;
        },
        likedvids_computed: function () {
            return this.likedvids
        },
        here_computed: function (){
            return this.here
        }
    },
    methods: {
        change: function change(){
            this.here = true
            this.myvids_user = false
            this.likedvids = false
        },
        myVids: function myVids(){
            this.here = false
            this.myvids_user = true
            this.likedvids = false
        },
        showLikedVideos: function showLikedVideos(){
            this.here = false
            this.myvids_user = false
            this.likedvids = true
        },
        goHome: function goHome(){
            store.commit('navigateHome')
        }

    }
}
</script>

<style>
    .navigation{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

</style>