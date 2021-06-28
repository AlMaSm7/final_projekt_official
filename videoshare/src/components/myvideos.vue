<template>
    <div class="container">
        <h1>My Videos</h1>
        <div v-for="video in my_videos" :key="video" @click="showVideo(video.id)">
            <img :src='require(`../assets/VIDEOS/${video.thumbnail}`)' class="thumbnail"/><br>
            <p>{{video.title}}</p><br>
            <p>Views: {{video.views}}</p>
            <p>{{video.title}}</p>
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

</style>