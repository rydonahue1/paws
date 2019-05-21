<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center row fill-height>
                <v-flex xs12 md4>
                    <v-alert v-model="alert.show" :color="alert.type" icon="warning" transition="scale-transition" outline dismissible>{{ alert.message }}</v-alert>
                    <v-card class="pa-5">
                        <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
                        <h1>Register</h1>
                        <v-form v-model="valid" ref="form">
                            <v-card-text>
                                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                <v-text-field v-model="password" :counter="20" label="Password" required></v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn @click="register" class="primary" depressed>register</v-btn>
                                <v-btn @click="reset" flat>clear</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: "Register",
        data: () => ({
            valid: true,
            email: "",
            password: "",
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
            ],
            loading: false,
            alert: {
                show: false,
                message: '',
                type: ''
            }
        }),
        methods: {
            register() {
                if (this.$refs.form.validate()) {
                    this.loading    = true;
                    firebase.auth()
                        .createUserWithEmailAndPassword(this.email, this.password)
                        .then(response => {
                            console.log(response);
                            this.loading = false;
                            this.$router.push({ path: '/dashboard' });
                        })
                        .catch(error => {
                            this.alert.message = error.message;
                            this.alert.type    = 'error';
                            this.alert.show    = true;
                            this.loading       = false;
                        });
                }
            },
            reset() {
                this.$refs.form.reset();
            }
        }
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
