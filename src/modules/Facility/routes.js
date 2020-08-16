import _ from "lodash";
import store from "@/store/store";

import FacilityModule from "./FacilityModule.vue";
import EditRescue from "./views/EditRescue.vue";
import FindRescue from "./views/FindRescue.vue";

export default [
    {
        path: '/facility',
        name: 'facility',
        component: FacilityModule,
        beforeEnter: (to, from, next) => {
            if (!_.isEmpty(store.state.auth.user)) next()
            else next({ name: 'login' })
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