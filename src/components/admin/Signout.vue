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
                    .dispatch({
                        type: "signOut"
                    })
                    .then(() => {
                        this.$router.push({ path: "/login" });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    };
</script>

<style scoped>
</style>
