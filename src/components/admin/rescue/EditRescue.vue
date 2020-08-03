<template>
    <v-container fluid grid-list-lg>
        <h1 class="font-weight-light text-uppercase">Rescue</h1>
        <h3 class="text-uppercase primary--text text--darken-2">Tell us about your organization</h3>
        <v-layout row wrap>
            <v-flex sm8>
                <v-card class="mt-3 pa-3">
                    <v-container fluid grid-list-lg>
                        <v-form>
                            <v-layout row wrap>
                                <v-flex sm6>
                                    <v-text-field v-model.trim="rescue.name" label="Rescue Organization's Name" clearable required></v-text-field>
                                </v-flex>
                                <v-flex sm6>
                                    <v-select v-model="rescue.type" :items="types" label="Type of Organization" clearable></v-select>
                                </v-flex>
                                <v-flex sm12>
                                    <v-text-field v-model.lazy.trim="rescue.address.streetOne" label="Street 1" clearable required></v-text-field>
                                </v-flex>
                                <v-flex sm12>
                                    <v-text-field v-model.lazy.trim="rescue.address.streetTwo" label="Street 2" clearable required></v-text-field>
                                </v-flex>
                                <v-flex sm12>
                                    <v-text-field v-model.lazy.trim="rescue.address.city" label="City" clearable required></v-text-field>
                                </v-flex>
                                <v-flex sm6>
                                    <v-select v-model.lazy.trim="rescue.address.state" :items="states" clearable label="State" ></v-select>
                                </v-flex>
                                <v-flex sm6>
                                    <v-text-field v-model.lazy.trim="rescue.address.zip" label="Zipcode" clearable required></v-text-field>
                                </v-flex>
                                <v-flex sm6>
                                    <v-text-field v-model.trim="rescue.website" prefix="http://" label="Website" clearable required></v-text-field>
                                </v-flex>
                                <v-flex sm6>
                                    <v-text-field v-model.trim="rescue.donation" prefix="http://" label="Donation URL" clearable></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex sm4 d-flex>
                <div  v-show="showMap" class="mt-3" ref="map" fill-height>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import gmapsInit from '@/utils/gmaps';
    import _ from 'lodash';

    export default {
        name: "EditRescue",
        data: () => ({
            rescue: {
                name: '',
                type: '',
                address: {
                    streetOne: '',
                    streetTwo: '',
                    city: '',
                    state: '',
                    zip: '',
                },
                website: '',
            },
            showMap: false,
            google: null,
            geocoder: null,
            map: null,
            marker: null,
        }),
        computed: {
            states() {
                return this.$store.state.globals.states
            },
            types() {
                return this.$store.state.globals.organizationTypes
            },
            fullTextAddress() {
                const street      = this.rescue.address.streetOne ? this.rescue.address.streetOne : '';
                const city        = this.rescue.address.city ? this.rescue.address.city : '';
                const state       = this.rescue.address.state ? this.rescue.address.state : '';
                const zip         = this.rescue.address.zip ? this.rescue.address.zip : '';
                const textAddress = street + ' ' + city + ' ' + state + ' ' + zip
                return textAddress.trim();
            }
        },
        watch: {
            fullTextAddress: function () {
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
                this.google = await gmapsInit();
                this.geocoder = new this.google.maps.Geocoder();
                this.map = new this.google.maps.Map(this.$refs.map, {
                    zoom: 16
                });

                this.marker = new this.google.maps.Marker({
                    map: this.map,
                });     
            } catch (error) {
                console.error(error);
            }
        },
        methods: {
            mapAddress: _.debounce(function(address) {   
                this.geocoder.geocode({ address: address }, (results, status) => {
                    if (results.length > 0) {
                        this.map.setCenter(results[0].geometry.location);
                        this.marker.setPosition(results[0].geometry.location);
                        //this.map.fitBounds(results[0].geometry.viewport);
                    } else if (status !== 'OK' || !results[0]) {
                        console.error(status);
                        this.showMap = false;
                    }
                });
            }, 500),
        }
    };
</script>

<style scoped>

</style>
