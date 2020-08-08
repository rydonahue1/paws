<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center row fill-height>
            <v-flex xs12 md4>
                <v-alert v-model="alert.show" :color="alert.type" icon="warning" transition="scale-transition" outlined dismissible>{{ alert.message }}</v-alert>
                <v-card class="pa-3">
                    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
                    <v-form v-model="valid" ref="form">
                        <v-card-title>
                            <h1>Login</h1>
                        </v-card-title>
                        <v-card-text>
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                            <v-text-field v-model="password" :counter="20" label="Password" required></v-text-field>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn @click="reset" text>Reset</v-btn>
                            <v-btn @click="signinUserWithEmail" class="primary" depressed>Sign In</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
                <v-layout justify-center mt-3>
                    <v-btn @click="signinUserWithGoogle" class="secondary justify-center" depressed>Sign in with Google</v-btn>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
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
            ],
            loading: false,
            alert: {
                show: false,
                message: '',
                type: ''
            }
        }),
        methods: {
            login() {
                if (this.$refs.form.validate()) {
                    console.log('dasd');
                }
            },
            reset() {
                this.$refs.form.reset();
            },
            signinUserWithEmail() {
                if (this.$refs.form.validate()) {
                    this.loading = true;
                    
                    this.$store.dispatch({
                        type: 'signinUserWithEmail',
                        email: this.email,
                        password: this.password,
                    }).then(() => {
                        this.loading = false;
                        this.$router.push({ path: '/dashboard' });
                    }).catch(error => {
                        this.alert.message = error.message;
                        this.alert.type    = 'error';
                        this.alert.show    = true;
                        this.loading       = false;
                    });
                }
            },
            signinUserWithGoogle() {
                this.loading = true; 
                this.$store.dispatch({
                    type: 'signinUserWithGoogle',
                }).then(() => {
                    this.loading = false;
                    this.$router.push({ path: '/dashboard' });
                }).catch(error => {
                    this.alert.message = error.message;
                    this.alert.type    = 'error';
                    this.alert.show    = true;
                    this.loading       = false;
                });
            },
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
