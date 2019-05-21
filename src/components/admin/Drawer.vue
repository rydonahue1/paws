<template>
    <v-navigation-drawer app permanent dark class="secondary">
        <v-list class="pa-1">
            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <img src="https://randomuser.me/api/portraits/men/86.jpg">
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>John Leider</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-list>
            <v-list-tile v-for="item in items" :key="item.title">
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
        data () {
            return {
                items: [
                    { title: 'Dashboard', icon: 'dashboard' },
                    { title: 'Account', icon: 'account_box' },
                    { title: 'Admin', icon: 'gavel' }
                ]
            }
        }
    }
</script>

<style scoped>
</style>
