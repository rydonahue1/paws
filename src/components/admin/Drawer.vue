<template>
    <v-navigation-drawer v-model="drawer" app dark class="secondary">
        <v-list>
            <v-list-tile v-for="item in items" :key="item.title" router :to="item.route">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Drawer",
        props: {
            drawer: Boolean,
        },
        data: () => ({
            items: [
                { title: 'Home', icon: 'dashboard', route: '/' },
                { title: 'Page', icon: 'account_box', route: '/page' },
                { title: 'Another Page', icon: 'gavel', route: '/page' }
            ]
        }),
    }
</script>

<style scoped>
</style>
