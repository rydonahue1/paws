<template>
    <v-main>
        <v-layout align-start row fill-height wrap>
            <v-flex xs12 fill-height>
                <router-view></router-view>
            </v-flex>
        </v-layout>
    </v-main>
</template>

<script>
export default {
    name: "Frontend"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
