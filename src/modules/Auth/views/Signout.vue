<template>
    <div></div>
</template>

<script>
export default {
    name: "Signout",
    data: () => ({}),
    created: function() {
        this.signOut();
    },
    methods: {
        signOut() {
            this.$store
                .dispatch({ type: "signOut" })
                .then(() => {
                    this.$router.push({ name: "login" });
                })
                .catch(err => console.log(err));
        }
    }
};
</script>

<style scoped></style>
