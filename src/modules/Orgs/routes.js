import _ from "lodash";
import store from "@/store/store";

import OrgsModule from "./OrgsModule.vue";
import EditOrg from "./views/EditOrg.vue";

export default [
    {
        path: '/orgs',
        name: 'orgs',
        component: OrgsModule,
        beforeEnter: (to, from, next) => {
            if (!_.isEmpty(store.state.auth.user)) next()
            else next({ name: 'login' })
        },
        children: [
            {
                name: 'org.edit',
                path: 'edit',
                component: EditOrg
            },
        ]
    },
]