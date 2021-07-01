import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import UUID from "vue-uuid";
import AsyncComputed from 'vue-async-computed'
//vue plugins
import Vuex from 'vuex'
// import vueCrypt from 'vue-crypt'
//Font-awsome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//All the font awesome icons
library.add(faSignOutAlt)
library.add(faThumbsUp)
library.add(faPaperPlane)
library.add(faUpload)

Vue.prototype.$key = '265f1a45-aa30-452b-a9de-a761f08d4a1a'

Vue.component('font-awesome-icon', FontAwesomeIcon)

library
FontAwesomeIcon


//Import all vue librarys/modules
Vue.use(Vuex)

Vue.use(AsyncComputed)

Vue.use(UUID);

Vue.use(VueCookies)

Vue.config.productionTip = false

export const bus = new Vue();
//Instance of Vuejs
new Vue({
  render: h => h(App),
}).$mount('#app')
