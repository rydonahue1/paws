<template>
    <div>
        <v-tabs v-model="tab">
            <v-tab> Upload </v-tab>
            <v-tab> Gallery </v-tab>
            <v-tabs-slider color="cyan"></v-tabs-slider>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <v-card flat>
                    <v-card-text></v-card-text>
                    <image-drop-zone collection="users" :document="user.uid"> </image-drop-zone>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text></v-card-text>
                    <image-cropper> </image-cropper>
                </v-card>
            </v-tab-item>
        </v-tabs-items>

    </div>
</template>

<script>

import ImageDropZone from "./ImageDropZone";
import ImageCropper from "./ImageCropper";
import { mapState } from "vuex";


export default {
    components: {
        "image-drop-zone": ImageDropZone,
        "image-cropper": ImageCropper,
    },
    data: () => ({
        tab: null
    }),
    computed: {
        ...mapState('auth', ['user']),
    }
};
</script>

<style></style>
