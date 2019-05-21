<template>
    <v-content>
        <Toolbar></Toolbar>
        <Drawer></Drawer>
            <v-container>
                <router-view></router-view>
            </v-container>
    </v-content>
</template>

<script>
    import Toolbar from "./Toolbar";
    import Drawer from "./Drawer";

    export default {
        name: "Frontend",
        components: {
            Toolbar,
            Drawer,
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
