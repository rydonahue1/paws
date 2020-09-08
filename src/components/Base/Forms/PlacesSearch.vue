<template>
    <div>
        <v-autocomplete
            v-model="selection"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            color="blue"
            hide-no-data
            hide-selected
            item-text="description"
            item-value="place_id"
            label="Find Organization"
            placeholder="Start typing to Search"
            prepend-icon="mdi-pin-outline"
            return-object
            clearable
        />
        <div id="results" ref="results"></div>
    </div>
</template>

<script>
//import axios from 'axios'
import gmapsInit from "@/utils/gmaps";

export default {
    name: "PlacesSearch",
    data: () => ({
        isLoading: false, // loading status
        search: null, // search term
        items: [], // items set by searching api
        selection: {}, // selected place
        GoogleAutocomplete: {}, // autocomplete service
        GooglePlaces: {}, // places service
        GoogleToken: null // session token
    }),
    watch: {
        selection(val) {
            if (!val) return;
            this.GooglePlaces.getDetails(
                {
                    placeId: val.place_id,
                    sessionToken: this.GoogleToken
                },
                (res, status) => {
                    if (res) {
                        this.$emit("set-place", res);
                    } else if (status !== "OK" || !res[0]) {
                        console.warn(status);
                    }
                }
            );
        },
        search(val) {
            if (!val) return;
            if (val.length < 5) return;

            // Items have already been requested
            if (this.isLoading) return;

            this.getPredictions(val);
        }
    },
    methods: {
        getPredictions(term) {
            this.isLoading = true;
            this.GoogleAutocomplete.getPlacePredictions(
                {
                    input: term,
                    sessionToken: this.GoogleToken
                },
                (res, status) => {
                    if (res) {
                        this.items = res;
                        this.isLoading = false;
                    } else if (status !== "OK" || !res[0]) {
                        console.warn(status);
                        this.isLoading = false;
                    }
                }
            );
        }
    },
    async mounted() {
        try {
            const google = await gmapsInit();
            this.GoogleToken = new google.maps.places.AutocompleteSessionToken();
            this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
            this.GooglePlaces = new google.maps.places.PlacesService(
                this.$refs.results
            );
        } catch (error) {
            console.error(error);
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
