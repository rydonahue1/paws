<template>
    <div>
        <div
            class="drop-zone"
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="drop"
        >
            <input
                type="file"
                multiple
                name="fields[imageHandler][]"
                id="imageHandler"
                class="d-none"
                @change="change"
                ref="file"
                accept=".pdf,.jpg,.jpeg,.png"
            />
            <label for="imageHandler" class="imageHandler">
                <v-btn
                    @click="$refs.file.click()"
                    class="ma-2"
                    color="cyan"
                    tile
                    dark
                    >Select Image</v-btn
                >
                <div>
                    Explain to our users they can drop files in here or
                </div>
            </label>
        </div>

        <div class="image-list">
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

import { mapState, mapActions } from 'vuex'

export default {
    name: "ImageDropZone",
    data: () => ({
        defaultImage: '/sunrisesunsettime.jpg',
        files: [],
        images: [],
    }),
    computed: {
        ...mapState('images', ['pending'])
    },
    watch: {
        imageBeingCropped: function() {
            this.cropper.replace(this.imageBeingCropped);
        }
    },
    methods: {
        change() {
            this.files = [...this.$refs.file.files];
            this.readImages(this.$refs.file.files);
        },
        remove(i) {
            this.removeImage(i);
        },
        dragover(event) {
            event.preventDefault();
            // Add some visual fluff to show the user can drop its files
            if (!event.currentTarget.classList.contains("is-drag-over")) {
                event.currentTarget.classList.add("is-drag-over");
            }
        },
        dragleave(event) {
            // Clean up
            event.currentTarget.classList.remove("is-drag-over");
        },
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.files = [...this.$refs.file.files]
            this.readImages(this.$refs.file.files);
            //this.onChange(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.remove("is-drag-over");
        },
        ...mapActions('images', ['readImages', 'removeImage'])
    },
};
</script>

<style lang="scss" scoped>

.drop-zone {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    height: 50vh;
    border: 4px dashed #ddd;

    &.is-drag-over {
        background: #e0e0e0;
    }

    .imageHandler {
        text-align: center;
    }
}

.cropper-container {
    img {
         display: block;
        /* This rule is very important, please don't ignore this */
        max-width: 100%;
    }
}
</style>
