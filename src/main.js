import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import Notifications from 'vue-notification'

Vue.use(firestorePlugin)
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
