<template>
    <nav>
        <v-toolbar flat app>
            <v-btn flat icon @click="drawer = !drawer">
                <v-icon>menu</v-icon>
            </v-btn>
            <v-toolbar-title class="headline text-uppercase">
                <span class="font-weight-bold">Shelter</span>
                <span class="font-weight-light">Suite</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-menu offset-y elevation-1>
                    <template v-slot:activator="{ on }">
                        <v-btn flat color="secondary" dark v-on="on">
                            <div v-if="user.name" class="user">
                                <v-avatar size="36px">
                                    <img v-if="user.avatar" :src="user.avatar" alt="Avatar">
                                </v-avatar>
                                <span>{{ user.name }}</span>
                            </div>
                            <v-icon right>arrow_drop_down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-subheader>Settings</v-subheader>
                        <v-list-tile v-for="(item, index) in settingsMenu" :key="index" router :to="item.route">
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            <v-list-tile-action>
                                <v-icon right>{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
        <Drawer :drawer="drawer"></Drawer>
    </nav>
</template>

<script>
    import Drawer from './Drawer'
    export default {
        name: "Toolbar",
        components: {
            Drawer,
        },
        data: () => ({
            drawer: true,
            loading: false,
            settingsMenu: [
                { title: "Rescue", icon: "group", route: '/rescue/edit' },
                { title: "Sign Out", icon: "exit_to_app", route: '/signout' }
            ]
        }),
        computed: {
            user() {
                return {
                    name: this.$store.state.auth.user.displayName
                        ? this.$store.state.auth.user.displayName
                        : 'Settings',
                    avatar: this.$store.state.auth.user.photoURL
                        ? this.$store.state.auth.user.photoURL
                        : null
                };
            },
            avatar() {
                return this.$store.state.auth.user.displayName
                    ? this.$store.state.auth.user.displayName
                    : null;
            }
        },
    };
</script>

<style scoped lang="scss">
.user {
    font-size: 1rem;
    text-transform: uppercase;

    span {
        margin-left: 1rem;
    }
}
</style>
