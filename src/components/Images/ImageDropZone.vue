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
        <div class="cropper">
            <ul>
                <li v-for="(image, index) in images" :key="index">                   
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

//import Cropper from 'cropperjs';

export default {
    name: "ImageDropZone",
    data: () => ({
        files: [],
        images: [],
        test: '',
    }),
    methods: {
        change() {
            this.files = [...this.$refs.file.files];
            this.getImagePaths(this.$refs.file.files);
            //event.target.value = '';
        },
        remove(i) {
            this.images.splice(i, 1);
            // this.$refs.file.files.splice(i, 1);
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
            //this.getUrls(event.dataTransfer.files);
            this.$refs.file.files = event.dataTransfer.files;
            this.files = [...this.$refs.file.files]
            this.getImagePaths(this.$refs.file.files);
            //this.onChange(); // Trigger the onChange event manually
            // Clean up
            event.currentTarget.classList.remove("is-drag-over");
        },
        getImagePaths(files) {
            files.forEach(async file => {
                const path = await this.readFile(file);
                this.images.push(path);
            })
        },
        readFile(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = () => reject (new Error ('Unable to read..'));
                reader.readAsDataURL(file);
            });
        }
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
</style>
