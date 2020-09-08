<template>
    <v-app>
        <Toolbar></Toolbar>
        <Drawer></Drawer>
        <router-view />
        <notifications position="bottom center" />
    </v-app>
</template>

<script>
import Toolbar from "./components/global/Toolbar";
import Drawer from "./components/global/Drawer";

export default {
    name: "App",
    components: {
        Toolbar,
        Drawer
    },
    data: () => ({
        //
    })
};
</script>

<style>
html {
    overflow-y: auto;
}
</style>
