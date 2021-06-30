<template>
    <div class="content">
    <h2>My Liked Videos</h2>
        <div class="liked">
            <div v-for="video in likedVideos" :key="video" @click="showVideo(video.id)">
                <img :src='require(`../assets/VIDEOS/${video.thumbnail}`)' class="thumbnail"/><br>
                <p>{{video.title}}</p><br>
                <p>Views: {{video.views}}</p>
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
            likedVideos: [],
            user_id:  store.state.key
        }
    },
    methods: {
        getLikedVideos: function getLikedVideos(id){
            axios.post("http://localhost:3000/likedVideos", {
                id
            }).then((Response) => {
                console.log(Response.data)
                Response.data.forEach(element => {
                    this.likedVideos.push({"thumbnail": element.thumbnail, "id": element.videos_id, "views": element.views, "length":  parseInt(element.length)})
                })
                console.log(this.likedVideos)
            }).catch((err) => {
                console.log(err)
            })
        },
        showVideo: function showVideo(id){
            console.log("here")
            console.log(id)
            axios.post("http://localhost:3000/getVideo", {
                id
            }).then((Response) => {
                console.log(Response.data)
                store.commit('showVideo',  {video: Response.data[0].path, title: Response.data[0].title, watch: true, video_id: id})
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    beforeMount(){
        this.getLikedVideos(this.user_id)
    }

}
</script>

<style>
    .thumbnail{
        width: 300px;
        height: 200px;
        cursor: pointer;
        display: flex;
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
    .liked{
        display: flex;
        flex-direction: row;
        flex-flow: row wrap;
        gap: 69px;
    }
    .title{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
</style>