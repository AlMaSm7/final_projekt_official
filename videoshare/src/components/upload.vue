<template>
  <div class="container">
      <label for="file">Thumbnail</label>
      <input
        type="file"
        id="thumbnail"
        ref="thumbnail"
        name="thumbnail"
        v-on:change="handleFile()"
        required
      />
      <label for="video">Video</label>
      <input
        type="file"
        name="video"
        id="video"
        ref="video"
        v-on:change="handleFile()"
        required
      />
      <input
      type="text"
      placeholder="Title..."
      v-model="title"
      required
    />

      <button type="submit" v-on:click="upload()">Submit</button>
    </div>
</template>
<script>
import axios from "axios";
import store from '../store';

export default {
  data() {
    return {
      thumbnail: "",
      video: "",
      title:""
    };
  },
  methods: {
    handleFile: async function handleFile() {
      console.log(this.$refs);
      this.thumbnail = this.$refs.thumbnail.files[0];
      this.video = this.$refs.video.files[0];
    },
    upload: async function upload() {

      let formdata = new FormData();

      formdata.append("video", this.video)
      formdata.append("thumbnail", this.thumbnail)
      formdata.append("title", this.title)
      formdata.append("user_id", store.state.key)

      for (var key of formdata.entries()) {
        console.log(key[0] + ", " + key[1]);
      }
      const headers = {
        "Content-Type": "multipart/form-data",
      };

      console.log(formdata);
      axios
        .post("http://localhost:3000/upload", formdata, {
          headers: headers,
        })
        .then(function () {
          console.log("Nodejs working now");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
