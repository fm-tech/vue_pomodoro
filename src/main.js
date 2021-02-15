import Vue from 'vue'
import Vuesax from 'vuesax'
import VueScreen from 'vue-screen'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import 'vuesax/dist/vuesax.css' //Vuesax styles

Vue.config.productionTip = false

Vue.use(VueScreen, {
  sm: 480, // will be converted to 480px
  md: 768,
  lg: 1024,
  xl: 1200
})
Vue.use(Vuesax, {
  // options here
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
