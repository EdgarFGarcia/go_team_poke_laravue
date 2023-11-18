<template>
    <v-app-bar
        color="primary"
        dark
        flat
    >
        <v-app-bar-title>
            <label
                style="font-family: 'Nunito Sans' sans-serif; font-size: 16px; font-weight: 900;"
            >
                Go Team Pokedex
            </label>
        </v-app-bar-title>
        <template
            v-slot:append
        >
            <v-btn 
                v-if="Object.keys(g_user).length == 0" 
                icon="mdi-account"
                @click="showLogin = !showLogin"
            >
            </v-btn>
            <label
                v-else
                style="font-family: 'Nunito Sans', sans-serif; font-size: 14px;"
            >Welcome Back, {{ g_user.name }}</label>
        </template>
        <NonAuth
            :value="showLogin"
            @close_dialog="close_dialog"
        />
    </v-app-bar>
</template>

<script>

import { mapState, mapActions } from 'pinia'
import { landingPageStore } from '../modules/Landing/states/state.js'

/**
 * components
 * - non auth
 */
import NonAuth from '../modules/NonAuth/DIalogComponent.vue'

export default {
    components: {
        NonAuth
    },
    data: () => ({
        showLogin: false
    }),
    computed : {
        ...mapState(landingPageStore, {
            g_user:         'getUser'
        })
    },
    methods: {
        close_dialog(){
            this.showLogin = false
        }
    }
}

</script>