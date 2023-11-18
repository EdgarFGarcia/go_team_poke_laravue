<template>
    <v-container
        fluid
    >
        <v-row>
            <v-col
                cols="2"
            >
                <v-card>
                    <v-toolbar
                        dark
                        color="secondary"
                    >
                        <v-toolbar-title>
                            <label
                                style="font-family: 'Nunito Sans', sans-serif; font-size: 18px; font-weight: 700;"
                            >
                                {{ getUser.name }}
                            </label>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn
                                icon="mdi-logout"
                                @click="logoutFn()"
                            ></v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px; font-weight: 900;"
                        >
                            Top 3 Liked Pokemon
                        </label>
                        <v-card
                            v-for="(hated, hatedindex) in getLikedPokemon"
                            :key="hatedindex"
                        >
                            <v-card-title>
                                <label
                                    style="font-family: Nunito Sans; font-size: 14px; font-weight: 700;"
                                >
                                    {{ hated.name }}
                                </label>
                                <v-spacer/>
                                <label
                                    style="font-family: Nunito Sans; font-size: 12px; font-weight: 300; text-decoration: underline; cursor: pointer;"
                                    @click="showDetails(hated)"
                                >
                                    show more details
                                </label>
                            </v-card-title>
                        </v-card>
                    </v-card-text>
                    <v-card-text>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px; font-weight: 900;"
                        >
                            Top 3 Hated Pokemon
                        </label>
                        <v-card
                            v-for="(hated, hatedindex) in getHatedPokemon"
                            :key="hatedindex"
                        >
                            <v-card-title>
                                <label
                                    style="font-family: Nunito Sans; font-size: 14px; font-weight: 700;"
                                >
                                    {{ hated.name }}
                                </label>
                                <v-spacer/>
                                <label
                                    style="font-family: Nunito Sans; font-size: 12px; font-weight: 300; text-decoration: underline; cursor: pointer;"
                                    @click="showDetails(hated)"
                                >
                                    show more details
                                </label>
                            </v-card-title>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col
                cols="8"
            >
                <pokeList></pokeList>
            </v-col>
            <v-col
                cols="2"
            >
                <v-card
                    v-for="(other, otherindex) in getOtherUsers"
                    :key="otherindex"
                    class="mt-5"
                >
                    <v-card-title>
                        <label
                            style="font-family: Nunito Sans; font-size: 16px; font-weight: 700;"
                        >
                            {{ other.name }}
                        </label>
                    </v-card-title>
                    <v-card-subtitle>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px;"
                        >
                            {{ other.email }}
                        </label>
                    </v-card-subtitle>
                    <v-card-text>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px; font-weight: 900;"
                        >
                            Top 3 Liked Pokemon
                        </label>
                        <v-card
                            v-for="(hated, hatedindex) in other.get_like_pokemon"
                            :key="hatedindex"
                        >
                            <v-card-title>
                                <label
                                    style="font-family: Nunito Sans; font-size: 14px; font-weight: 700;"
                                >
                                    {{ hated.name }}
                                </label>
                                <v-spacer/>
                                <label
                                    style="font-family: Nunito Sans; font-size: 12px; font-weight: 300; text-decoration: underline; cursor: pointer;"
                                    @click="showDetails(hated)"
                                >
                                    show more details
                                </label>
                            </v-card-title>
                        </v-card>
                    </v-card-text>
                    <v-card-text>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px; font-weight: 900;"
                        >
                            Top 3 Hated Pokemon
                        </label>
                        <v-card
                            v-for="(hated, hatedindex) in other.get_hate_pokemon"
                            :key="hatedindex"
                        >
                            <v-card-title>
                                <label
                                    style="font-family: Nunito Sans; font-size: 14px; font-weight: 700;"
                                >
                                    {{ hated.name }}
                                </label>
                                <v-spacer/>
                                <label
                                    style="font-family: Nunito Sans; font-size: 12px; font-weight: 300; text-decoration: underline; cursor: pointer;"
                                    @click="showDetails(hated)"
                                >
                                    show more details
                                </label>
                            </v-card-title>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <pokemonDetail
            :value="showDetailsBool"
            @close_dialog="close_dialog"
        />
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { landingPageStore } from '../Landing/states/state.js'
import { pokeDexStore } from './states/states.js'
import axios from '../../plugins/axios.js'

/**
 * components
 */
import pokeList from './PokeListComponent.vue'
import pokemonDetail from './PokemonDetailComponent.vue'

export default {
    components: {
        pokeList,
        pokemonDetail
    },
    data: () => ({
        showDetailsBool: false
    }),
    async mounted() {
        await this.othersFn()
        await this.getHatedPokemonFn()
        await this.getLikedPokemonFn()
    },
    computed:{
        ...mapState(landingPageStore, {
            getUser:           'getUser'
        }),
        ...mapState(pokeDexStore, {
            getHatedPokemon:          'getHatedPokemonGetter',
            getLikedPokemon:          'getLikedPokemonGetter',
            getOtherUsers:            'getOtherUsersGetter'
        })
    },
    methods: {
        ...mapActions(pokeDexStore, {
            getPokemonDetail:               'getPokemonDetail',
            setPokemonDetail:               'setPokemonDetail',
            getOtherUserAction:             'getOtherUser',
            setOtherUsersAction:            'setOtherUsers',
            getHatedPokemonAction:          'getHatedPokemon',
            setHatedPokemonAction:          'setHatedPokemon',
            getLikedPokemonAction:          'getLikedPokemon',
            setLikedPokemonAction:          'setLikedPokemon'
        }),
        async logoutFn(){
            await axios.post('/api/logout')
            localStorage.clear()
            location.reload()
        },
        async showDetails(url){
            const dd = await this.getPokemonDetail(url.name)
            this.setPokemonDetail(dd.data)
            alert('please wait')
            this.showDetailsBool = true
        },
        close_dialog(){
            this.showDetailsBool = false
        },
        async othersFn(){
            const users = await this.getOtherUserAction()
            this.setOtherUsersAction(users.data.data)
        },
        async getHatedPokemonFn(){
            const hated = await this.getHatedPokemonAction(this.getUser.id)
            this.setHatedPokemonAction(hated.data.data)
        },
        async getLikedPokemonFn(){
            const liked = await this.getLikedPokemonAction(this.getUser.id)
            this.setLikedPokemonAction(liked.data.data)
        }
    }
}
</script>