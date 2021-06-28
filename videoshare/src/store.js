
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import SecureLS from "secure-ls";
var ls = new SecureLS({isCompression: false, encodingType: 'aes'});

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        key: "",
        username: "",
        watch_video: false,
        video: "",
        title: "",
        video_id: 0,
        acc: false
    },
    plugins: [createPersistedState({
        storage: {
        //getItem: key => ls.get(key),
        //setItem: (key, value) => ls.set(key, value)
            getItem: key => ls.get(key),
            removeItem: key => ls.remove(key),
            setItem: (key, value) => ls.set(key, value)
        }
    })],
    mutations: {
        login(state, data) {
            console.log(data.username)
            console.log(data.uid)
            state.key = data.uid
            state.username = data.username
            console.log(state)
        },
        logout(state) {
            console.log(state)
            state.key = null
            state.username = null
        },
        showVideo(state, data) {
            console.log(data.video)
            console.log(data.title)
            console.log(data.watch)
            state.watch_video = data.watch
            state.video = data.video
            state.title = data.title
            state.video_id = data.video_id
            console.log(state)
        },
        setNull(state) {
            console.log(state)
            state.watch_video = null
            state.video = null
            state.title = null
            state.acc = null
        },
        goToAcc(state) {
            state.acc = true
        },
        navigateHome(state) {
            state.acc = false
        }
    },
    getters: {
        getVideo: function getVideo(state) {
            console.log(state)
            return state.video
        },
        getWatch: function getWatch(state) {
            return state.watch_video
        }
    }
})