// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import VueDragDrop from 'vue-drag-drop'

Vue.use(Vuetify)
Vue.use(VueDragDrop)

Vue.config.productionTip = false

/* eslint-disable no-new */
var vm = new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App />',
	iconfont: 'fa'
})
window.vm = vm
