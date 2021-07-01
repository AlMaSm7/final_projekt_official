<template>
    <div class="container">
        <h2>My Videos</h2>
        <div class="myvids">
            <div v-for="video in my_videos" :key="video" @click="showVideo(video.id)">
                <img :src='require(`../assets/VIDEOS/${video.thumbnail}`)' class="thumbnail"/><br>
                <p>{{video.title}}</p><br>
                <p>Views: {{video.views}}</p>
                <p>{{video.title}}</p>
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
            user_id: 0,
            my_videos: []
        }
    },
    methods: {
        //Gets the videos the User uploaded
        getmyVideos: function getMyVideos(user_id){
            axios.post("http://localhost:3000/getUserVideos", {
                user_id
            }).then((Response) => {
                Response.data.forEach(element => {
                    this.my_videos.push({"thumbnail": element.thumbnail, "video_src": element.path, "title": element.title, "id": element.videos_id, "views":element.views})
                })
                console.log(this.my_videos)
            })
        },
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
        }
    }, 
    mounted(){
        this.user_id = store.state.key
        this.getmyVideos(this.user_id)
    }
}
</script>

<style>
    .thumbnail{
        width: 300px;
        height: 200px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-flow: row wrap;
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
    .myvids{
        display: flex;
        flex-direction: row;
        flex-flow: row wrap;
        justify-content: space-around;
        gap: 69px;
    }
</style>