<template>
    <v-container>
        <h1 class="font-weight-light text-uppercase">Rescue</h1>
        <h3 class="text-uppercase primary--text text--darken-2">Tell us about your organization</h3>
        <v-row>
            <v-col>
                <v-card class="mt-3 pa-3">
                    <v-form>
                        <v-row row wrap>
                            <v-col>
                                <PlacesSearch @set-place="setPlace" />
                            </v-col>
                        </v-row>
                        <v-row row wrap>
                            <v-col>
                                <v-text-field v-model.trim="group.name" label="Rescue Organization's Name" clearable required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select v-model="group.type" :items="types" label="Type of Organization" clearable></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field v-model.lazy.trim="group.address.streetOne" label="Street 1" clearable required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field v-model.lazy.trim="group.address.streetTwo" label="Street 2" clearable required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field v-model.lazy.trim="group.address.city" label="City" clearable required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-select v-model.lazy.trim="group.address.state" :items="states" clearable label="State" ></v-select>
                            </v-col>
                            <v-col>
                                <v-text-field v-model.lazy.trim="group.address.postal_code" label="Zipcode" clearable required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field v-model.trim="group.website" prefix="http://" label="Website" clearable required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model.trim="group.donation" prefix="http://" label="Donation URL" clearable></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card>
            </v-col>
            <v-col>
                <div v-show="showMap" class="mt-3" ref="map" style="height: 100%">
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import gmapsInit from '@/utils/gmaps';
    import PlacesSearch from './PlacesSearch';
    import _ from 'lodash';

    export default {
        name: "EditGroup",
        components: { 
            PlacesSearch
        },
        data: () => ({
            group: {
                id: null,
                name: '',
                type: '',
                address: {
                    streetOne: '',
                    streetTwo: '',
                    city: '',
                    state: '',
                    postal_code: '',
                },
                phone: null,
                website: '',
                geo: null,
            },
            showMap: false,
            geocoder: null,
            marker: null,
            map: null,
        }),
        computed: {
            states() {
                return this.$store.state.globals.states
            },
            types() {
                return this.$store.state.globals.organizationTypes
            },
            fullTextAddress() {
                const street      = this.group.address.streetOne ? this.group.address.streetOne : '';
                const city        = this.group.address.city ? this.group.address.city : '';
                const state       = this.group.address.state ? this.group.address.state : '';
                const zip         = this.group.address.zip ? this.group.address.zip : '';
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
                const google = await gmapsInit();
                console.log(google);
                const places = google.maps.places;

                console.log(places);
                this.geocoder = new google.maps.Geocoder();
                this.map = new google.maps.Map(this.$refs.map, {
                    zoom: 16
                });

                this.marker = new google.maps.Marker({
                    map: this.map,
                });     
            } catch (error) {
                console.error(error);
            }
        },
        methods: {
            mapAddress: _.debounce(function(address) {   
                this.geocoder.geocode({ address: address }, (results, status) => {
                    console.log(results);
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
            setPlace(place) {
                console.log(place)
                this.group.id = place.place_id;
                this.group.name = place.name;
                this.group.address.streetOne = place.address_components[0].long_name + ' ' +place.address_components[1].long_name;
                this.group.address.city = place.address_components[3].long_name;
                this.group.address.state = place.address_components[5].short_name;
                this.group.address.postal_code = place.address_components[7].short_name;
                this.group.website = place.website;
                this.group.geo = place.geometry.location.toJSON();
                this.group.rating = place.rating;
                this.group.phone = place.formatted_phone_number;
            }
        }
    };
</script>

<style scoped>

</style>
