import _ from "lodash";
import store from "@/store/store";

import GroupModule from "./GroupModule.vue";
import EditGroup from "./views/EditGroup.vue";
import PlacesSearch from "./views/PlacesSearch.vue";

export default [
    {
        path: '/group',
        name: 'group',
        component: GroupModule,
        beforeEnter: (to, from, next) => {
            if (!_.isEmpty(store.state.auth.user)) next()
            else next({ name: 'login' })
        },
        children: [
            {
                name: 'group.edit',
                path: 'edit',
                component: EditGroup
            },
            {
                name: 'group.find',
                path: 'find',
                component: PlacesSearch
            },
        ]
    },
]