<template>
    <v-content>
        <Toolbar></Toolbar>
        <v-container>
            <router-view></router-view>
        </v-container>
    </v-content>
</template>

<script>
    import Toolbar from "./Toolbar";

    export default {
        name: "Admin",
        components: {
            Toolbar,
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
