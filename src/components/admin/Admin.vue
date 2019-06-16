<template>
    <v-content>
        <Toolbar></Toolbar>
        <v-layout align-start row fill-height wrap>
            <v-flex xs12 fill-height>
            <router-view></router-view>
            </v-flex>
        </v-layout>
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
