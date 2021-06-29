<template>
  <div class="container">
      <label for="thumbnail"><span><span class="file"><font-awesome-icon :icon="['fas', 'upload']" size="2x" class="upload"/></span><span>Choose Thumbnail...</span></span></label> <span v-if="thumbnail">{{this.thumbnail}}</span>
      <input
        type="file"
        id="thumbnail"
        ref="thumbnail"
        name="thumbnail"
        v-on:change="handleFile()"
        required
      /><br>
      <label for="video"><span><span class="file"><font-awesome-icon :icon="['fas', 'upload']" size="2x" class="upload"/></span><span>Choose video...</span></span></label> <span v-if="video">{{this.video}}</span>
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
import store from "../store";

export default {
  data() {
    return {
      thumbnail: "",
      video: "",
      title: "",
    };
  },
  methods: {
    handleFile: async function handleFile() {
      console.log(this.$refs)
      this.thumbnail = this.$refs.thumbnail.files[0]
      this.video = this.$refs.video.files[0]
    },
    upload: async function upload() {
      let formdata = new FormData()

      formdata.append("video", this.video)
      formdata.append("thumbnail", this.thumbnail)
      formdata.append("title", this.title)
      formdata.append("user_id", store.state.key)

      for (var key of formdata.entries()) {
        console.log(key[0] + ", " + key[1])
      }
      const headers = {
        "Content-Type": "multipart/form-data",
      }

      console.log(formdata);
      axios
        .post("http://localhost:3000/upload", formdata, {
          headers: headers,
        })
        .then(function () {
          console.log("Nodejs working now");
        })
        .catch((error) => {
          console.log(error)
        });
    },
  },
}
</script>

<style>
.container > input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.container > input:focus {
  color: rgb(167, 167, 167);
  outline: none !important;
  border: 1px solid rgb(46, 129, 43);
  box-shadow: 0 0 10px #719ece;
}
.container > label {
  font-size: 15px;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;
  transition: 0.7s;
  border-radius: 5px;
}
.container > label:hover {
  background-color: rgb(46, 129, 43);
  cursor: pointer;
}
.upload {
  color: rgb(167, 167, 167);
}
</style>
