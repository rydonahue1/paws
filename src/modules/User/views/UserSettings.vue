<template>
    <v-container>
        <h1 class="font-weight-light text-uppercase">Settings</h1>
        <h3 class="text-uppercase primary--text text--darken-2">
            Tell us about yourself
        </h3>
        <v-card max-width="375" class="mx-auto">
            <v-img :src="user.photoURL" height="300px" dark>
                <v-row class="fill-height">
                    <v-card-title>
                        <v-btn dark icon>
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>

                        <v-spacer></v-spacer>

                        <v-btn dark icon class="mr-4">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>

                        <v-btn dark icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </v-card-title>

                    <v-dialog fullscreen>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <v-card elevation="2" tile>
                            <v-card-title>
                                <span class="headline">Save profile image</span>
                            </v-card-title>
                            <v-card-text>
                                <single-image-upload></single-image-upload>
                            </v-card-text>
                        </v-card>
                    </v-dialog>

                    <v-spacer></v-spacer>

                    <v-card-title class="white--text pl-12 pt-12">
                        <div class="display-1 pl-12 pt-12">
                            {{ user.displayName }}
                        </div>
                    </v-card-title>
                </v-row>
            </v-img>

            <v-list two-line>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="cyan">
                            mdi-phone
                        </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{
                            user.phone || "None"
                        }}</v-list-item-title>
                        <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                </v-list-item>
                <v-divider inset></v-divider>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="cyan">
                            mdi-email
                        </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ user.email }}</v-list-item-title>
                        <v-list-item-subtitle>Email</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="cyan">
                            mdi-map-marker
                        </v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>1400 Main Street</v-list-item-title>
                        <v-list-item-subtitle
                            >Orlando, FL 79938</v-list-item-subtitle
                        >
                    </v-list-item-content>

                    <v-list-item-icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-card>
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
import SingleImageUpload from "@/modules/Images/SingleImageUpload";

export default {
    name: "UserSettings",
    components: {
        'single-image-upload': SingleImageUpload
    },
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
        }
    }),
    computed: {
        states() {
            return this.$store.state.globals.states;
        },
        user() {
            return this.$store.state.auth.user;
        }
    }
};
</script>

<style scoped></style>
