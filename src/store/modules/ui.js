export default {
    state: {
        drawer: false,
    },
    getters: {
        drawerState: state => state.drawer,
    },
    mutations: {
        toggleDrawer(state) {
            state.drawer = !state.drawer
        },
    },
    actions: {
        toggleDrawer(context) {
            context.commit({
                type: 'toggleDrawer',
            });
        },
    }
}