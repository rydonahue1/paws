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
                                    signUpUserWithEmail
                                "
                                @signinUserWithEmail="signInUserWithEmail"
                            />
                        </v-form>
                    </v-card>
                    <v-layout justify-center mt-3>
                        <v-btn
                            @click="signInUserWithGoogle"
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
//import { auth } from "@/fire";
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
        async signUpUserWithEmail() {
            if (this.$refs.form.validate()) {
                this.toggleLoading();

                try {
                    const user = await this.$store.dispatch({ 
                        type: "signUpUserWithEmail",
                        email: this.email,
                        password: this.password
                    });
                    this.$router.push(
                        { path: `user/${user.uid}/settings` }
                    );
                } 
                catch (err) {
                    this.throwError(err);
                } 
                finally {
                    this.toggleLoading();
                }
            }
        },
        async signInUserWithEmail() {
            if (this.$refs.form.validate()) {
                this.toggleLoading();

                try {
                    await this.$store.dispatch({ 
                        type: "signInUserWithEmail",
                        email: this.email,
                        password: this.password
                    });
                    this.$router.push({ name: "dashboard" });

                } 
                catch (err) {
                    this.throwError(err);
                } 
                finally {
                    this.toggleLoading();
                }
            }
        },
        async signInUserWithGoogle() {
            this.toggleLoading();

            try {
                await this.$store.dispatch({ type: "signInUserWithGoogle" });
                this.$router.push({ name: "dashboard" });
            } 
            catch (err) {
                this.throwError(err);
            } 
            finally {
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
