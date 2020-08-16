<template>
    <v-card-actions class="justify-end">
        <v-btn @click="$emit('reset')" text>Reset</v-btn>
        <v-btn @click="$emit('registerUserWithEmail')" class="primary" depressed>Sign Up</v-btn>
    </v-card-actions>
</template>

<script>
    export default {
        name: "Register",
    };
</script>

<style scoped>

</style>
