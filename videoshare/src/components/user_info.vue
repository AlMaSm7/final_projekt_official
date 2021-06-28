<template>
    <div class="user_container">
        <h1>Username: {{infos[0].username}}</h1>
        <p>Firstname: {{infos[0].firstname}}</p>
        <p>Lastname: {{infos[0].lastname}}</p>
        <p>Email: {{infos[0].email}}</p>
    </div>
</template>

<script>
import axios from 'axios'
import store from "../store";

export default {
    data() {
        return {
            infos: [],
            user_id: store.state.key
        }
    },
    methods: {
        
    },
    mounted() {
        const { user_id } = this;
        axios.post("http://localhost:3000/users", {
            user_id
        }).then((Response) => {
            console.log(Response.data)
            Response.data.forEach(element => {
                console.log(element)
            this.infos.push(
                {"username": store.state.username, "firstname": element.firstname, "lastname": element.lastname, "email": element.email},
            )
            })
            console.log(this.infos[0].username)
        }).catch((err) => {
            console.log(err)
        })
    },
}
</script>
<style>
    .user_container{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>