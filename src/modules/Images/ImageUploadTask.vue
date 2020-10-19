<template>
    <v-card class="mx-auto" max-width="150">
        <v-overlay v-if="snapshot.state === 'running'" :absolute="true" :value="true">
            <v-progress-circular
                :rotate="360"
                :size="50"
                :width="15"
                :value="percentage"
                color="cyan"
            >
                {{ Math.ceil(percentage) }}
            </v-progress-circular>
        </v-overlay>
        <v-img :src="result.downloadUrl" :lazy-src="result.downloadUrl" aspect-ratio="1" max-width="150">
            <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                    <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                    ></v-progress-circular>
                </v-row>
            </template>
        </v-img>
        <!-- <v-card-actions>
            <v-btn color="lighten-2" text>
                <v-icon>mdi-delete</v-icon> Delete
            </v-btn>
            <v-btn color="cyan lighten-2" text>
                Set As Default
            </v-btn>
        </v-card-actions> -->
    </v-card>
</template>

<script>
import { storage } from "@/fire";
//import { mapActions } from 'vuex'

export default {
    name: "ImageUploadTask",
    props: {
        image: File,
        path: String
    },
    data: () => ({
        percentage: 0,
        url: "",
        snapshot: {},
        result: {
            status: null
        }
    }),
    methods: {
        upload: function() {
            try {
                const ref = storage.ref(`${this.path}/${this.image.name}`);
                const task = ref.put(this.image);

                task.on(
                    "state_changed",
                    snapshot => {
                        this.snapshot = snapshot;
                        this.percentage =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                    },
                    err => {
                        this.$notify({
                            type: "error",
                            text: err.message
                        });
                    },
                    async () => {
                        this.snapshot = task.snapshot;
                        this.result = {
                            ...task.snapshot.ref.location,
                            downloadUrl: await task.snapshot.ref.getDownloadURL()
                        };
                        console.log(this.result)
                        //var downloadURL = task.snapshot.downloadURL;
                    }
                );
            } 
            catch (err) {
                this.$notify({
                    type: "error",
                    text: err.message
                });
            }
            finally {
                console.log(this.result)
                this.$emit('result', this.result);

            }
        }
    },
    mounted() {
        this.upload();
    }
};
</script>

<style lang="scss" scoped></style>
