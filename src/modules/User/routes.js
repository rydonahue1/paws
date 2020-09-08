import _ from "lodash";
import store from "@/store/store";

import UserModule from "./UserModule.vue";
import UserSettings from "./views/UserSettings.vue";

export default [
    {
        path: '/user/:id',
        name: 'user',
        component: UserModule,
        beforeEnter: (to, from, next) => {
            if (!_.isEmpty(store.state.auth.user)) next()
            else next({ name: 'login' })
        },
        children: [
            {
                path: 'settings',
                name: 'settings',
                component: UserSettings,
            },
        ]
    },
]