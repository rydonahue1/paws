<template>
    <v-app>
        <Toolbar></Toolbar>
        <Drawer></Drawer>
        <router-view/>
    </v-app>
</template>

<script>
    import Toolbar from "./components/global/Toolbar";
    import Drawer from "./components/global/Drawer";
    
    export default {
        name: 'App',
        components: {
            Toolbar,
            Drawer,
        },
        data: () => ({
            //
        }),
    };
</script>
