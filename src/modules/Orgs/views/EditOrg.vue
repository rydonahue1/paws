<template>
    <v-container>
        <h1 class="font-weight-light text-uppercase">Rescue</h1>
        <h3 class="text-uppercase primary--text text--darken-2">
            Tell us about your organization
        </h3>
        <v-row>
            <v-col>
                <v-form>
                    <v-row row wrap>
                        <v-col>
                            <PlacesSearch @set-place="setPlace" />
                        </v-col>
                    </v-row>
                    <v-row row wrap>
                        <v-col>
                            <v-text-field
                                v-model.trim="group.name"
                                label="Rescue Organization's Name"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-select
                                v-model="group.type"
                                :items="types"
                                label="Type of Organization"
                                clearable
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model.lazy.trim="group.address.streetOne"
                                label="Street 1"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model.lazy.trim="group.address.streetTwo"
                                label="Street 2"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model.lazy.trim="group.address.city"
                                label="City"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-select
                                v-model.lazy.trim="group.address.state"
                                :items="states"
                                clearable
                                label="State"
                            ></v-select>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model.lazy.trim="group.address.postal_code"
                                label="Zipcode"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field
                                v-model.trim="group.website"
                                label="Website"
                                clearable
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field
                                v-model.trim="group.donation"
                                label="Donation URL"
                                clearable
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col>
                <div
                    v-show="showMap"
                    class="mt-3"
                    ref="map"
                    style="height: 100%"
                ></div>
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
import gmapsInit from "@/utils/gmaps";
import PlacesSearch from "@/components/Base/Forms/PlacesSearch";
import { debounce } from "lodash";
import { db } from "@/fire";

export default {
    name: "EditGroup",
    components: {
        PlacesSearch
    },
    data: () => ({
        group: {
            place_id: "",
            name: "",
            type: "",
            address: {
                streetOne: "",
                streetTwo: "",
                city: "",
                state: "",
                postal_code: ""
            },
            phone: "",
            website: "",
            geometry: {}
        },
        showMap: false,
        geocoder: null,
        marker: null,
        map: null,
        address_components: {},
        firebaseData: null, 
    }),
    computed: {
        states() {
            return this.$store.state.globals.states;
        },
        types() {
            return this.$store.state.globals.organizationTypes;
        },
        fullTextAddress() {
            const { streetOne, city, state, postal_code } = this.group.address;
            const fullTextAddress = `${streetOne} ${city} ${state} ${postal_code}`;

            return fullTextAddress.trim();
        }
    },
    watch: {
        // First we setup an array with the address type as keys, 
        // then we use the keys to assign values to our address obj
        address_components(address_components) {
            const address = {};
            for (const entry of address_components) {
                address[entry.types[0]] = entry.long_name;
            }

            Object.assign(this.group.address, {
                streetOne: `${address.street_number} ${address.route}`,
                city: address.locality,
                state: address.administrative_area_level_1,
                postal_code: address.postal_code
            });
        },
        fullTextAddress: function() {
            if (this.fullTextAddress.length > 0) {
                this.mapAddress(this.fullTextAddress);
                this.showMap = true;
            } else {
                this.showMap = false;
            }
        }
    },
    async mounted() {
        try {
            const google = await gmapsInit();
            //const places = google.maps.places;

            this.geocoder = new google.maps.Geocoder();
            this.map = new google.maps.Map(this.$refs.map, { zoom: 16 });
            this.marker = new google.maps.Marker({ map: this.map });
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        mapAddress: debounce(function(address) {
            this.geocoder.geocode({ address: address }, (results, status) => {
                if (results.length > 0) {
                    this.map.setCenter(results[0].geometry.location);
                    this.marker.setPosition(results[0].geometry.location);
                    //this.map.fitBounds(results[0].geometry.viewport);
                } else if (status !== "OK" || !results[0]) {
                    this.showMap = false;
                }
            });
        }, 500),
        setPlace(place) {
            console.log(place);
            ({
                place_id: this.group.place_id,
                name: this.group.name,
                address_components: this.address_components,
                formatted_phone_number: this.group.phone,
                geometry: this.group.geometry,
                website: this.group.website
            } = place);
        }
    },
    firestore() {
        return {
            firebaseData: db.doc('orgs/test')
        }
    }
};
</script>

<style scoped>
.actions {
    justify-content: flex-end;
}
</style>
