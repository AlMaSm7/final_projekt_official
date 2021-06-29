<template>
    <div class="container">
        <div class="logo">
            <img src="../assets/logo_white_large.png" @click="goHome()" height="140px" width="100px" class="user">
        </div>
        <div class="logout">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" size="3x" class="logout" @click="logout()"/>
        </div>
        <div class="nav">
            <nav class="navigation">
                <ul @click="change()">User Info</ul>
                <ul @click="myVids()">My Videos</ul>
                <ul @click="showLikedVideos()">Liked Videos</ul>
                <ul @click="upload_videos()">Upload Video</ul>
            </nav>
        </div>
        <div class="info_users">
            <user_info v-if="here_computed"/>
            <myvideosVue v-if="myvids && !watching_computed"/>
            <liked-videos v-if="likedvids_computed && !watching_computed"/>
            <upload v-if="upload_computed"/>
        </div>
    </div>
</template>

<script>
import myvideosVue from './myvideos.vue'
import user_info from "./user_info.vue"
import likedVideos from './likedVideos.vue'
import store from '../store'
import upload from './upload.vue'
import Vue from 'vue'

export default {
    components: {
        user_info,
        myvideosVue,
        likedVideos,
        upload
    },
    data() {
        return {
            here: true, 
            myvids_user: false,
            likedvids: false,
            upload_vid: false
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
        }, 
        upload_computed: function () {
            return this.upload_vid
        },
        watching_computed: function (){
            return store.state.watch_video
        }
    },
    methods: {
        change: function change(){
            this.here = true
            this.myvids_user = false
            this.likedvids = false
            this.upload_vid = false
        },
        myVids: function myVids(){
            this.here = false
            this.myvids_user = true
            this.likedvids = false
            this.upload_vid = false
        },
        showLikedVideos: function showLikedVideos(){
            this.here = false
            this.myvids_user = false
            this.likedvids = true
            this.upload_vid = false
        },
        upload_videos: function upload_videos(){
            this.here = false
            this.myvids_user = false
            this.likedvids = false
            this.upload_vid = true
        },
        goHome: function goHome(){
            store.commit('navigateHome')
        },
        logout: function logout(){
            Vue.$cookies.remove(store.state.username)
            store.commit('logout')
        }
    }
}
</script>

<style>
    .user{
        cursor: pointer;
    }
    .navigation{
        cursor: pointer;
    }
    .nav{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 75px;
    }
    .navigation > ul{
        cursor: pointer;
        color: rgb(226, 224, 224);
    }
    .logo{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
    }
    .logout{
        color: rgb(122, 122, 122);
        transition: 0.7s;
    }
    .logout:hover{
        color: rgb(151, 59, 59);
    }

</style>