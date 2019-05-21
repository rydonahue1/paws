<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center row fill-height>
                <v-flex xs12 md4>
                    <v-card class="pa-5">
                        <h1>Login</h1>
                        <v-form v-model="valid" ref="form">
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                            <v-text-field v-model="password" :counter="20" label="Password" required></v-text-field>
                            <v-btn @click="submit" class="primary" depressed>submit</v-btn>
                            <v-btn @click="reset" flat>clear</v-btn>
                        </v-form>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            valid: true,
            email: "",
            password: "",
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
            ]
        }),
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    console.log('dasd');
                }
            },
            reset() {
                this.$refs.form.reset();
            },
        }
    };
</script>

<style scoped>
</style>
