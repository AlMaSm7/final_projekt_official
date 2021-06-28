<template>
  <div id="register">
    <input type="text" placeholder="Username..." v-model="username" required />
    <input
      type="text"
      placeholder="Firstname..."
      v-model="firstname"
      required
    />
    <input type="text" placeholder="Lastname..." v-model="lastname" required />
    <input type="email" placeholder="Email..." v-model="email" required />
    <input
      type="password"
      placeholder="Password..."
      v-model="password"
      required
    />
    <button @click="register()" type="submit" value="submit">Submit</button>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import store from '../store'

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
      address: ""
    }
  },
  methods: {
    register: async function register() {
      const { username, password, firstname, lastname, email } = this;
      axios
        .post("http://localhost:3000/register", {
          username,
          password,
          firstname,
          lastname,
          email
        })
        .then((Response) => {
          console.log(Response.data.insertId)
          console.log("no error")
          Vue.$cookies.set(
            username,
            "97410df8-c866-11eb-b8bc-0242ac130003",
            "1d"
          )
          /*Vue.prototype.$userId = Response.data.insertId
          Vue.prototype.$username = username*/
          let uid = Response.data.insertId
          console.log(Response.data.insertId)
          store.commit('login', {username: username, uid: uid})
          //store.state.user_id = Response.data.insertId
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
