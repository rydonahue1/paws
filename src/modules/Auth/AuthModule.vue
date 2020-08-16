<template>
    <v-main>
        <v-container fluid fill-height>
            <v-layout align-center justify-center row fill-height>
                <v-flex xs12 md4>
                    <v-alert v-model="alert.show" :color="alert.type" icon="warning" transition="scale-transition" outlined dismissible>{{ alert.message }}</v-alert>
                    <v-card class="pa-3">
                        <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
                        <v-form v-model="valid" ref="form">
                            <v-card-title>
                                <h1>Register</h1>
                            </v-card-title>
                            <v-card-text>
                                <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                <v-text-field v-model="password" :counter="20" label="Password" required></v-text-field>
                            </v-card-text>
                            <router-view 
                                @reset="reset" 
                                @registerUserWithEmail="registerUserWithEmail" 
                                @signinUserWithEmail="signinUserWithEmail" 
                            />
                        </v-form>
                    </v-card>
                    <v-layout justify-center mt-3>
                        <v-btn @click="signinUserWithGoogle" class="secondary justify-center" depressed>Sign in with Google</v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-main>
</template>

<script>
    import { auth, db } from '@/fire';

    export default {
        name: "AuthModule",
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
        created() {
            console.log(this.$route)
        },
        methods: {
            registerUserWithEmail() {
                if (this.$refs.form.validate()) {
                    this.toggleLoading();
                    
                    this.$store
                        .dispatch({
                            type: 'registerUserWithEmail',
                            email: this.email,
                            password: this.password,
                        })
                        .then(() => {
                            this.toggleLoading();
                            this.$router.push({ name: 'dashboard' });
                        })
                        .catch(err => {
                            this.throwError(err)
                        })
                    ;
                }
            },
            signinUserWithEmail() {
                if (this.$refs.form.validate()) {
                    this.toggleLoading();
                    
                    this.$store
                        .dispatch({
                            type: 'signinUserWithEmail',
                            email: this.email,
                            password: this.password,
                        })
                        .then(() => {
                            this.$router.push({ name: 'dashboard' });
                            this.toggleLoading();
                        })
                        .catch(err => {
                            this.throwError(err)
                        })
                    ;
                }
            },
            signinUserWithGoogle() {
                this.toggleLoading();
                this.$store
                    .dispatch({
                        type: 'signinUserWithGoogle',
                    })
                    .then(() => {
                        this.firebaseAddUser();
                        this.$router.push({ name: 'dashboard' });
                        this.toggleLoading();
                    })
                    .catch(err => {
                        this.throwError(err)
                    })
                ;
            },
            firebaseAddUser() {
                const user = auth.currentUser;
                const res = db.collection('users')
                    .doc(user.uid)
                    .set({
                        displayName: user.displayName,
                        email: user.email, 
                    })
                ;

                console.log(res);
            },
            reset() {
                this.$refs.form.reset();
            },
            throwError(err) {
                this.alert = {
                    message: err.message,
                    type: 'error',
                    show: true,
                }
                this.toggleLoading();
            },
            toggleLoading() {
                this.loading = !this.loading;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .v-progress-linear {
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        margin: 0;
    }

</style>
