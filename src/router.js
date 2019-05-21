import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Frontend from '@/components/frontend/Frontend.vue'
import Home from '@/components/frontend/Home.vue'
import Page from '@/components/frontend/Page.vue'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

import Admin from '@/components/admin/Admin.vue'
import Dashboard from '@/components/admin/Dashboard.vue'

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
                if (firebase.auth().currentUser) {
                    next();
                } else {
                    next({ name: 'login' });
                }
            },
            children: [
                {
                    path: '/dashboard',
                    component: Dashboard
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
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
