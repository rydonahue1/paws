import Vue from 'vue'
import Router from 'vue-router'
import firebase from '@/fire'
import Frontend from '@/components/frontend/Frontend.vue'
import Home from '@/components/frontend/Home.vue'
import Page from '@/components/frontend/Page.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

import Admin from '@/components/admin/Admin.vue'
import Signout from '@/components/admin/Signout.vue'
import Dashboard from '@/components/admin/Dashboard.vue'
import FindRescue from '@/components/admin/rescue/FindRescue.vue'
import EditRescue from '@/components/admin/rescue/EditRescue.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Frontend,
            children: [
                {
                    path: '/',
                    component: Home
                },
                {
                    path: '/page',
                    component: Page
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            beforeEnter: (to, from, next) => {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        next();
                    } else {
                        next({ name: 'login' });
                    }
                })
            },
            children: [
                {
                    name: 'dashboard',
                    path: '/dashboard',
                    component: Dashboard
                },
                {
                    name: 'signout',
                    path: '/signout',
                    component: Signout
                },
                {
                    name: 'findRescue',
                    path: '/rescue/find',
                    component: FindRescue
                },
                {
                    name: 'editRescue',
                    path: '/rescue/edit',
                    component: EditRescue
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
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
            path: '/register',
            name: 'register',
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
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        }
    ]
})
