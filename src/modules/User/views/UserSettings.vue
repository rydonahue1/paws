<template>
  <v-container>
        <h1 class="font-weight-light text-uppercase">Settings</h1>
        <h3 class="text-uppercase primary--text text--darken-2">
            Tell us about yourself
        </h3>
        <v-row>
            <v-col>
                <v-form>
                    <v-row row wrap>
                        <v-col>
                            <v-text-field
                                v-model.trim="form.firstName"
                                label="First Name"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model.trim="form.lastName"
                                label="Last Name"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model.lazy.trim="form.address.streetOne"
                                label="Street 1"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model.lazy.trim="form.address.streetTwo"
                                label="Street 2"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model.lazy.trim="form.address.city"
                                label="City"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select
                                v-model.lazy.trim="form.address.state"
                                :items="states"
                                clearable
                                label="State"
                            ></v-select>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model.lazy.trim="form.address.postal_code"
                                label="Zipcode"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model.trim="user.email"
                                label="Email"
                                clearable
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
        <v-bottom-navigation
            class="actions"
            horizontal
            background-color="grey darken-1"
            dark
            fixed
            bottom
            grow
            width="100%"
            min-height="75px"
        >
            <v-btn text min-height="75px">
                CLEAR <v-icon left>mdi-undo</v-icon>
            </v-btn>
            <v-btn tile depressed color="cyan darken-2" min-height="75px">
                SAVE <v-icon left>mdi-content-save-outline</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-container>
</template>

<script>
export default {
    name: "UserSettings",
    data: () => ({
        form: {
            place_id: "",
            name: "",
            address: {
                streetOne: "",
                streetTwo: "",
                city: "",
                state: "",
                postal_code: ""
            },
            phone: "",
            geometry: {}
        },
    }),
    computed: {
        states() {
            return this.$store.state.globals.states;
        },
        user() {
            return this.$store.state.auth.user;
        }
    },  
};
</script>

<style scoped></style>
