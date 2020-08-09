import { auth } from '@/fire';
import FacilityModule from "./FacilityModule.vue";
import EditRescue from "./views/EditRescue.vue";
import FindRescue from "./views/FindRescue.vue";

export default [
    {
        path: '/facility',
        name: 'facility',
        component: FacilityModule,
        beforeEnter: (to, from, next) => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    next();
                } else {
                    next({ name: 'auth.login' });
                }
            })
        },
        children: [
            {
                name: 'facility.edit',
                path: 'edit',
                component: EditRescue
            },
            {
                name: 'facility.find',
                path: 'find',
                component: FindRescue
            },
        ]
    },
]