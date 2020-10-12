import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import auth from '@/modules/Auth/store'
import orgs from '@/modules/Orgs/store'
import images from '@/modules/Images/store'
import globals from './modules/globals'
import ui from './modules/ui'
import places from './modules/places'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({
        paths: ['auth.user'],
    })],
    modules: {
        auth,
        orgs,
        globals,
        ui,
        places,
        images
    }
})
