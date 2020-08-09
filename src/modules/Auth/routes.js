//import { auth } from '@/fire';
import _ from "lodash";
import AuthModule from "./AuthModule.vue";
import store from "@/store/store";
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
                name: 'auth.register',
                path: '/register',
                component: Register,
                beforeEnter: (to, from, next) => {
                    if (_.isEmpty(store.state.auth.user)) {
                        next();
                    } else {
                        next({ name: 'dashboard' });
                    }
                },
            },
            {
                name: 'auth.login',
                path: '/login',
                component: Login,
                beforeEnter: (to, from, next) => {
                    if (_.isEmpty(store.state.auth.user)) {
                        next();
                    } else {
                        next({ name: 'dashboard' });
                    }
                },
            },
            {
                name: 'auth.signout',
                path: '/signout',
                component: Signout,
                beforeEnter: (to, from, next) => {
                    if (!_.isEmpty(store.state.auth.user)) {
                        next();
                    } else {
                        next({ name: 'auth.login' });
                    }
                },
            },
        ]
    },
]