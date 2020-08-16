import _ from "lodash";
import store from "@/store/store";

import AuthModule from "./AuthModule.vue";
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Signout from './views/Signout.vue';

export default [
    {
        path: '/admin',
        name: 'admin',
        component: AuthModule,
        children: [
            {
                name: 'register',
                path: '/register',
                component: Register,
                beforeEnter: (to, from, next) => {
                    if (_.isEmpty(store.state.auth.user)) next()
                    else next({ name: 'dashboard' })
                },
            },
            {
                name: 'login',
                path: '/login',
                component: Login,
                beforeEnter: (to, from, next) => {
                    if (_.isEmpty(store.state.auth.user)) next()
                    else next({ name: 'dashboard' })
                },
            },
            {
                name: 'logout',
                path: '/logout',
                component: Signout,
                beforeEnter: (to, from, next) => {
                    if (!_.isEmpty(store.state.auth.user)) next()
                    else next({ name: 'login' })
                },
            },
        ]
    },
]