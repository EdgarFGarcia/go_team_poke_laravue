<template>
    <v-container
        fluid
    >
        <v-row
            v-if="Object.keys(g_user).length === 0"
            justify="center"
        >
            <label
                style="font-family: Nunito Sans; font-size: 24px; font-weigth: large"
                class="mt-15"
            >
                Please <label
                    style="text-decoration: underline; cursor: pointer;"
                    @click="showLogin = !showLogin"
                >Login</label> to continue
            </label>
            <NonAuth
                :value="showLogin"
                @close_dialog="close_dialog"
            />
        </v-row>
        <PokeDex v-else></PokeDex>
    </v-container>
</template>
<script>
    import { mapState, mapActions } from 'pinia'
    import { landingPageStore } from './states/state.js'

    /**
     * components
     * - non auth
     */
    import NonAuth from '../NonAuth/DIalogComponent.vue'

    /**
     * components
     * - Auth User
     */
    import PokeDex from '../Auth/PokeDex.vue'

    export default{
        components: {
            NonAuth,
            PokeDex
        },
        data : () => ({
            showLogin: false
        }),
        computed : {
            ...mapState(landingPageStore, {
                g_user:         'getUser'
            })
        },
        mounted(){
        },
        methods: {
            close_dialog(){
                this.showLogin = false
            }
        }
    }
</script>