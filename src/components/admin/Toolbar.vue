<template>
    <v-toolbar flat app>
        <v-btn flat fab small>
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
</template>

<script>
    export default {
        name: "Toolbar",
        data: () => ({})
    };
</script>

<style scoped>
</style>
