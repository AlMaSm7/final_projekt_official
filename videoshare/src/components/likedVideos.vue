<template>
    <div class="content">
        <div v-for="video in likedVideos" :key="video" @click="showVideo(video.id)">
            <img :src='require(`../assets/VIDEOS/${video.thumbnail}`)' class="thumbnail"/><br>
            <p>{{video.title}}</p><br>
            <p>Views: {{video.views}}</p>
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
                    this.likedVideos.push({"thumbnail": element.thumbnail, "id": element.video_id, "views": element.views, "length":  parseInt(element.length)})
                });
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

</style>