import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueAxios  from 'vue-axios'
import Axios from 'axios'

Vue.config.productionTip = false

const role = Vue.observable({ role: localStorage.getItem('role') })

Object.defineProperty(Vue.prototype, '$role', {
  get () {
    return role.role;
  },
  set (value) {
    role.role = value;
  }
})

// axios config
Vue.use(VueAxios, Axios);
Axios.defaults.baseURL = 'http://localhost:8081/';
Axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
