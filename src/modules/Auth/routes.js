import firebase from '@/fire';
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
                name: 'auth.register',
                path: '/register',
                component: Register,
                beforeEnter: (to, from, next) => {
                    firebase.auth().onAuthStateChanged(user => {
                        if (!user) {
                            next();
                        } else {
                            console.log(user);
                            next({ name: 'dashboard' });
                        }
                    })
                },
            },
            {
                name: 'auth.login',
                path: '/login',
                component: Login,
                beforeEnter: (to, from, next) => {
                    firebase.auth().onAuthStateChanged( user => {
                        if (!user) {
                            next();
                        } else {
                            next({ name: 'dashboard' });
                        }
                    })
                },
            },
            {
                name: 'auth.signout',
                path: '/signout',
                component: Signout,
                beforeEnter: (to, from, next) => {
                    firebase.auth().onAuthStateChanged(user => {
                        if (user) {
                            next();
                        } else {
                            next({ name: 'auth.login' });
                        }
                    })
                },
            },
        ]
    },
]