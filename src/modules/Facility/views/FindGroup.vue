<template>
    <v-container fluid fill-height>
        <h1 class="font-weight-light text-uppercase">Find Your Rescue</h1>
        <h3 class="text-uppercase primary--text text--darken-2">Search for...</h3>

        <v-layout align-start justify-start row fill-height wrap>
            <div class="map" ref="map">
            </div>
            <v-flex sm8>
                <v-card class="mt-3 pa-3">
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    //import axios from 'axios'
    import gmapsInit from '@/utils/gmaps';

    export default {
        name: "FindGroup",
        data: () => ({
            info: null,
            locations: []
        }),
        computed: {
            states() {
                return this.$store.state.globals.states
            },
            types() {
                return this.$store.state.globals.organizationTypes
            }
        },
        async mounted() {
            try {
                const google = await gmapsInit();
                const geocoder = new google.maps.Geocoder();
                const map = new google.maps.Map(this.$refs.map, {
                    zoom: 16
                });

                geocoder.geocode({ address: 'Tao Plantation FL' }, (results, status) => {
                    if (status !== 'OK' || !results[0]) {
                        throw new Error(status);
                    }
                    console.log(results[0].geometry);
                    map.setCenter(results[0].geometry.location);
                    //map.fitBounds(results[0].geometry.viewport);
                    new google.maps.Marker({
                        position: results[0].geometry.location, map,
                        maps: map,
                    });
                });

                
            } catch (error) {
                console.error(error);
            }
        },
        methods: {
            searchPlaces() {
                this.$store
                    .dispatch({
                        type: "searchPlace"
                    })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    };
</script>

<style scoped>
    .map {
        width: 100vw;
        height: 100vh;
    }
</style>
