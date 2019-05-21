<template>
    <nav>
        <v-toolbar flat app>
            <v-btn flat fab small @click="drawer = !drawer">
                <v-icon>menu</v-icon>
            </v-btn>
            <v-toolbar-title class="headline text-uppercase">
                <span class="font-weight-bold">Shelter</span>
                <span class="font-weight-light">Suite</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn flat href="/login">
                <span>Sign In</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
            <v-btn flat href="/register">
                <span>Register</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>
        <Drawer :drawer="drawer"></Drawer>
    </nav>
</template>

<script>
    import Drawer from './Drawer'
    export default {
        name: "Toolbar",
        components: {
            Drawer,
        },
        data: () => ({
            drawer: false,
        })
    };
</script>

<style scoped>
</style>
