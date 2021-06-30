<template>
  <div class="container">
  <form v-on:submit.prevent="upload" ref="files">
      <label for="thumbnail"><span><span class="file"><font-awesome-icon :icon="['fas', 'upload']" size="2x" class="upload"/></span><span>Choose Thumbnail...</span></span></label> <span v-if="thumbnail">{{this.thumbnail}}</span>
      <input
        class="file"
        type="file"
        id="thumbnail"
        ref="thumbnail"
        name="thumbnail"
        v-on:change="handleFile()"
        required
      /><br>
      <label for="video"><span><span class="file"><font-awesome-icon :icon="['fas', 'upload']" size="2x" class="upload"/></span><span>Choose video...</span></span></label> <span v-if="video">{{this.video}}</span>
      <input
        class="file"
        type="file"
        name="video"
        id="video"
        ref="video"
        v-on:change="handleFile()"
        required
      />
      <input
      class="titleInput"
      type="text"
      placeholder="Title..."
      v-model="title"
      required
      />

      <button type="submit" v-on:click="upload()">Submit</button>
    </form>
    <p v-if="error">{{error}}</p>
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
      error: null
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

      this.$refs.files.reset()
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
          this.$refs.thumbnail.reset()
          this.$refs.video.reset()
          this.title = ""
          this.error = null
        })
        .catch((error) => {
          console.log(error)
          this.error = "Something went wrong, please try again"
        });
    },
  },
}
</script>

<style>
.file {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.container > form > input:focus {
  color: rgb(167, 167, 167);
  outline: none !important;
  border: 1px solid rgb(46, 129, 43);
  box-shadow: 0 0 10px #719ece;
}
.container > form > label {
  font-size: 15px;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;
  transition: 0.7s;
  border-radius: 5px;
  cursor: pointer;
}
.container > from > label:hover {
  background-color: rgb(46, 129, 43);
  
}
.upload {
  color: rgb(167, 167, 167);
}
.container > form {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.container > form > button {
  background-color: black;
  color: rgb(167, 167, 167);
  border: none;
  border-radius: 4px;
  transition: 0.7s;
  width: 200px;
  height: 35px;
}
.titleInput {
  background-color: rgb(31, 31, 31);
  border-radius: 5px;
  border: none;
  margin-left: 100px;
  margin-right: 100px;
  width: 500px;
  height: 40px;
  color: rgb(167, 167, 167);
}
.container > form > button:hover {
  color: rgb(221, 221, 221);
  background-color: rgb(46, 129, 43);
}
</style>
