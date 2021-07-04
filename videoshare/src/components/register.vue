<template>
  <div class="content_register">
    <div class="register">
      <h2>Register</h2>
      <h4>PLEASE ACTIVATE COOKIES</h4>
      <form v-on:submit.prevent="register">
        <input
          type="text"
          placeholder="*Username..."
          v-model="username"
          required
        />
        <input
          type="text"
          placeholder="*Firstname..."
          v-model="firstname"
          required
        />
        <input
          type="text"
          placeholder="*Lastname..."
          v-model="lastname"
          required
        />
        <input type="email" placeholder="*Email..." v-model="email" required />
        <input
          type="password"
          placeholder="*Password..."
          v-model="password"
          required
        />
        <button @click="register()" type="submit" value="submit">Submit</button>
      </form>
      <p v-if="error">{{ message }}</p>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import store from "../store";

export default {
  name: "register",
  store,
  data() {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      age: "",
      address: "",
      error: false,
      message: null,
    };
  },
  methods: {
    register: async function register() {
      const { username, password, firstname, lastname, email } = this;
      if(this.password != "" && this.username != ""){
      axios
        .post("http://localhost:3000/register", {
          username,
          password,
          firstname,
          lastname,
          email,
        })
        .then((Response) => {
          console.log(Response.data.insertId);
          //console.log("no error");
          this.error = false;
          Vue.$cookies.set(
            username,
            "97410df8-c866-11eb-b8bc-0242ac130003",
            "1d"
          );
          /*Vue.prototype.$userId = Response.data.insertId
          Vue.prototype.$username = username*/
          let uid = Response.data.insertId;
          console.log(Response.data.insertId);
          store.commit("login", { username: username, uid: uid });

          //store.state.user_id = Response.data.insertId
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
          this.message = "Something went wrong, please try again";
        })
      } else {
        this.error = true;
          this.message = "Something went wrong, please try again";
      }
    },
  },
};
</script>
<style>
.register > h2 {
  font-size: 60px;
}
.content_register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 65vh;
}
.register > form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
}
.register > form > button {
  background-color: black;
  color: rgb(167, 167, 167);
  border: none;
  border-radius: 4px;
  transition: 0.7s;
  width: 200px;
  height: 35px;
}
.register > form > input {
  background-color: rgb(31, 31, 31);
  border-radius: 5px;
  border: none;
  margin-left: 100px;
  margin-right: 100px;
  width: 500px;
  height: 40px;
  color: rgb(167, 167, 167);
}
.register > form > input:focus {
  color: rgb(167, 167, 167);
  outline: none !important;
  border: 1px solid rgb(46, 129, 43);
  box-shadow: 0 0 10px #719ece;
}
.register > form > button:hover {
  color: rgb(221, 221, 221);
  background-color: rgb(46, 129, 43);
}
</style>
