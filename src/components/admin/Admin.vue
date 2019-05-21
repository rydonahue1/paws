<template>
    <v-content>
        <Toolbar></Toolbar>
        <Drawer></Drawer>
            <v-container fluid fill-height>
                <router-view></router-view>
            </v-container>
    </v-content>
</template>

<script>
    import Toolbar from "./Toolbar";
    import Drawer from "./Drawer";

    export default {
        name: "Admin",
        components: {
            Toolbar,
            Drawer,
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
