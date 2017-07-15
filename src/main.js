import Vue from 'vue'
import App from './App.vue'
import Vuetify from '../node_modules/vuetify'

Vue.use(Vuetify);

new Vue({
  el: '#app',
  render: h => h(App)
})
