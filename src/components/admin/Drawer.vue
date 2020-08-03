<template>
    <v-navigation-drawer v-model="drawer" app dark class="secondary">
        <v-list>
            <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
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
                { title: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
                { title: 'Page', icon: 'account_box', route: '/page' },
                { title: 'Another Page', icon: 'gavel', route: '/page' }
            ]
        }),
    }
</script>

<style scoped>
</style>
