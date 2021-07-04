<template>
    <div class="container">
        <div class="logo">
            <img src="../assets/logo_white_large.png" @click="goToAcc()" class="user">
            
        </div>
        <h1>TheTube</h1><br>
        <div class="thumbnails">
            
            <div v-for="foto in thumbnails" :key="foto" @click="showVideo(foto.id)">
                <figure>
                    <img :src='require(`../assets/VIDEOS/${foto.thumbnail}`)' class="thumbnail"/><br>
                    <figcaption>{{foto.title}}</figcaption>
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import store from '../store'

export default {
    data() {
        return {
            thumbnails: [],
            watch: store.state.watch_video,
            video: store.state.video,
            title: store.state.title
        }
    },
    methods: {
        showVideo: function showVideo(id){
            console.log(id)
            axios.post("http://localhost:3000/getVideo", {
                id
            }).then((Response) => {
                console.log(Response.data)
                this.watch = true
                store.commit('showVideo',  {video: Response.data[0].path, title: Response.data[0].title, watch: true, video_id: id})
            }).catch((err) => {
                console.log(err)
            })
        },
        goToAcc: function goToAcc(){
            store.commit('goToAcc')
        }
    },
    beforeMount() {
        axios.get('http://localhost:3000/videos')
        .then((response) => {
        // handle success
        console.log(response)
        console.log(this.thumbnails)
        response.data.forEach(element => {
            console.log(element.thumbnail)
            this.thumbnails.push(
                {"thumbnail": element.thumbnail, "title": element.title, "id": element.videos_id}, 
            )
            })
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
    },
}
</script>

<style>
    .thumbnail{
        width: 250px;
        height: 200px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-flow: row wrap;
    }
    .user:hover{
        cursor: pointer;
    }
    .logo{
        display: flex;
        margin-bottom: 50px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .logo > img{
        height: 155px;
        width: 140px;
    }
    .thumbnails{
        display: flex;
        flex-direction: row;
        flex-flow: row wrap;
        gap: 69px;
    }
</style>