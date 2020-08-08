import Vue from 'vue'
import Router from 'vue-router'
import firebase from '@/fire'
import Frontend from '@/components/frontend/Frontend.vue'
import Home from '@/components/frontend/Home.vue'
import Page from '@/components/frontend/Page.vue'

import Admin from '@/components/admin/Admin.vue'

import AuthRoutes from '@/modules/Auth/routes.js';
import FacilityRoutes from '@/modules/Facility/routes.js';

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
            path: '/dashboard',
            name: 'dashboard',
            component: Admin,
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
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        ...FacilityRoutes,
        ...AuthRoutes,
    ]
})
