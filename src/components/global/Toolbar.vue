<template>
    <v-app-bar text app>
        <v-btn text icon @click="toggleDrawer()">
            <v-icon>menu</v-icon>
        </v-btn>
        <v-toolbar-title class="headline text-uppercase">
            <span class="font-weight-bold">Shelter</span>
            <span class="font-weight-light">Suite</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text href="/login" v-if="!user">
            <span>Sign In</span>
            <v-icon right>exit_to_app</v-icon>
        </v-btn>
        <v-btn text href="/register" v-if="!user">
            <span>Register</span>
            <v-icon right>exit_to_app</v-icon>
        </v-btn>
        <v-toolbar-items v-if="user">
            <v-menu offset-y elevation-1>
                <template v-slot:activator="{ on }">
                    <v-btn color="secondary" text dark v-on="on">
                        <div v-if="user.displayName" class="user">
                            <v-avatar size="36px">
                                <img
                                    v-if="user.photoURL"
                                    :src="user.photoURL"
                                    alt="Avatar"
                                />
                            </v-avatar>
                            <span>{{ user.displayName }}</span>
                        </div>
                        <v-icon right>arrow_drop_down</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-subheader>Settings</v-subheader>
                    <v-list-item
                        v-for="(item, index) in settingsMenu"
                        :key="index"
                        router
                        :to="item.route"
                    >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        <v-list-item-action>
                            <v-icon right>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
import _ from "lodash";

export default {
    name: "Toolbar",
    data: () => ({
        drawer: true,
        loading: false,
        settingsMenu: [
            { title: "Find Rescue", icon: "group", route: "/group/find" },
            { title: "Rescue", icon: "group", route: "/group/edit" },
            { title: "Sign Out", icon: "exit_to_app", route: "/logout" }
        ]
    }),
    computed: {
        user() {
            return _.isEmpty(this.$store.state.auth.user)
                ? null
                : this.$store.state.auth.user;
        }
    },
    methods: {
        toggleDrawer() {
            this.$store.dispatch({
                type: "toggleDrawer"
            });
        }
    }
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
