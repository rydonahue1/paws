<template>
    <v-card-actions class="justify-end">
        <v-btn @click="$emit('reset')" text>Reset</v-btn>
        <v-btn @click="$emit('signinUserWithEmail')" class="primary" depressed
            >Sign In</v-btn
        >
    </v-card-actions>
</template>

<script>
export default {
    name: "Login"
};
</script>

<style scoped>
.v-progress-linear {
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    margin: 0;
}
</style>
