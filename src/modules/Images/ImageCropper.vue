<template>
    <div>
        <div class="cropper-container">
            <img :src="imageBeingCropped" ref="image" id="image-crop" />
        </div>
        <div class="image-list">
            <v-item-group>
                <v-container>
                    <v-row>
                        <v-col
                            v-for="(image, index) in pending.images"
                            :key="index"
                            cols="12"
                            md="2"
                        >
                            <v-item v-slot:default="{ active, toggle }">
                                <v-card
                                    :color="active ? 'primary' : ''"
                                    class="d-flex align-center pa-2"
                                    dark
                                    @click="toggle"
                                >
                                    <v-img
                                        :src="image"
                                        aspect-ratio="1"
                                        max-width="200"
                                    ></v-img>
                                </v-card>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-container>
            </v-item-group>
            <ul>
                <li v-for="(image, index) in pending.images" :key="index">
                    <v-img
                        :src="image"
                        aspect-ratio="1"
                        max-width="200"
                    ></v-img>
                    <button
                        type="button"
                        @click="remove(images.indexOf(image))"
                        title="Remove file"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { mapState } from "vuex";

export default {
    name: "ImageDropZone",
    data: () => ({
        defaultImage: "/sunrisesunsettime.jpg",
        images: [],
        cropper: {},
        image: {}
    }),
    computed: {
        ...mapState("images", ["pending"]),
        imageBeingCropped: function() {
            if (this.images.length > 0) return this.images[0];
            return this.defaultImage;
        }
    },
    watch: {
        imageBeingCropped: function() {
            this.cropper.replace(this.imageBeingCropped);
        }
    },
    mounted() {
        this.image = this.$refs.image;
        this.cropper = new Cropper(this.image, {
            scalable: false,
            zoomable: false,
            minCropBoxWidth: 300,
            minCropBoxHeight: 300,
            aspectRatio: 1
        });
    }
};
</script>

<style lang="scss" scoped>
.cropper-container {
    img {
        display: block;
        /* This rule is very important, please don't ignore this */
        max-width: 100%;
    }
}
</style>
