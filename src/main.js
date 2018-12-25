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

new Vue({
	router,
	iconfont: 'fa',
	render: h => h(App)
}).$mount('#app')
