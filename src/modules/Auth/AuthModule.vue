<template>
    <v-main>
        <v-container fluid fill-height>
            <v-layout align-center justify-center row fill-height>
                <v-flex xs12 md4>
                    <v-card class="pa-3">
                        <v-progress-linear
                            v-if="loading"
                            :indeterminate="true"
                        ></v-progress-linear>
                        <v-form v-model="valid" ref="form">
                            <v-card-title>
                                <h1>{{ $route.name }}</h1>
                            </v-card-title>
                            <v-card-text>
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    v-model="password"
                                    :counter="20"
                                    label="Password"
                                    required
                                ></v-text-field>
                            </v-card-text>
                            <router-view
                                @reset="reset"
                                @register-user-with-email="
                                    registerUserWithEmail
                                "
                                @signinUserWithEmail="signinUserWithEmail"
                            />
                        </v-form>
                    </v-card>
                    <v-layout justify-center mt-3>
                        <v-btn
                            @click="signinUserWithGoogle"
                            class="secondary justify-center"
                            depressed
                            >Sign in with Google</v-btn
                        >
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-container>
    </v-main>
</template>

<script>
import { firebase, auth } from "@/fire";
//import { pick } from 'lodash'

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
        loading: false
    }),
    methods: {
        async registerUserWithEmail() {
            if (this.$refs.form.validate()) {
                this.toggleLoading();

                try {
                    const signIn = await auth.createUserWithEmailAndPassword(this.email, this.password);
                    console.log(signIn)
                    await this.$store.dispatch('saveUser', signIn);
                    this.$router.push(
                        { path: `user/${signIn.user.uid}/settings` }
                    );
                }
                catch (err) {
                    this.throwError(err);
                }
                finally {
                    this.toggleLoading();
                }


                // this.$store
                //     .dispatch({
                //         type: "registerUserWithEmail",
                //         email: this.email,
                //         password: this.password
                //     })
                //     .then(() => {
                //         this.firebaseAddUser();
                //         this.toggleLoading();
                //         this.$router.push({ name: "dashboard" });
                //     })
                //     .catch(err => this.throwError(err));
            }
        },
        async signinUserWithEmail() {
            if (this.$refs.form.validate()) {
                this.toggleLoading();
                // this.$store
                //     .dispatch({
                //         type: "signinUserWithEmail",
                //         email: this.email,
                //         password: this.password
                //     })
                //     .then(() => {
                //         this.$router.push({ name: "dashboard" });
                //         this.toggleLoading();
                //     })
                //     .catch(err => this.throwError(err));
            }


            // registerUserWithEmail(context, payload) {
            //     return new Promise((resolve, reject) => {
            //         auth.createUserWithEmailAndPassword(payload.email, payload.password)
            //             .then(response => {
            //                 context.commit({
            //                     type: 'setUser',
        //                     user: response.user,
        //                     token: null,
        //                 });
        //                 resolve(response);
        //             }).catch(error => {
        //                 reject(error);
        //             });
        //     });
        // },
        // setUser(context, user) {
        //     context.commit({
        //         type: 'setUser',
        //         user: user,
        //     });
        // },
        },
        async signinUserWithGoogle() {
            this.toggleLoading();

            const provider = new firebase.auth.GoogleAuthProvider();

            try {
                const signIn = await auth.signInWithPopup(provider);
                console.log(signIn, "can push router now");

                if (signIn.additionalUserInfo.isNewUser) {
                    await this.$store.dispatch("saveUser", signIn);
                } else {
                    await this.$store.dispatch("getUser");
                }
                this.$router.push({ name: "dashboard" });
            } catch (err) {
                this.throwError(err);
            } finally {
                this.toggleLoading();
            }
        },
        reset() {
            this.$refs.form.reset();
        },
        throwError(err) {
            this.$notify({
                type: "error",
                text: err.message
            });
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
