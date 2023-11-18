<template>
    <v-container fluid>
        <v-row>
            <v-col
                cols="2"
                v-for="(pokemon, pokemonindex) in getPokemonList"
                :key="pokemonindex"
            >
                <v-card>
                    <v-card-title>
                        <label
                            style="font-family: Nunito Sans; font-size: 14px; font-weight: 900;"
                        >
                            {{ pokemon.name }}
                        </label>
                        <v-spacer/>
                        <label
                            style="font-family: Nunito Sans; font-size: 12px; font-weight: 300; text-decoration: underline; cursor: pointer;"
                            @click="showDetails(pokemon)"
                        >
                           show more details
                        </label>
                    </v-card-title>
                    <v-card-title>
                        <v-col
                            cols="12"
                        >
                            <v-img
                                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonindex+1}.png`"
                            />
                        </v-col>
                    </v-card-title>
                    <v-card-actions>
                        <v-container>
                            <v-row justify="center" align="center">
                                <v-btn
                                    text
                                    size="small"
                                    @click="addToHate(pokemon, pokemonindex+1)"
                                >
                                    hate
                                </v-btn>
                                <v-btn
                                    text
                                    size="small"
                                    @click="addToLike(pokemon, pokemonindex+1)"
                                >
                                    like
                                </v-btn>
                            </v-row>
                        </v-container>
                    </v-card-actions>
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
import { pokeDexStore } from './states/states';
import { landingPageStore } from '../Landing/states/state'

/**
 * component
 */
import pokemonDetail from './PokemonDetailComponent.vue'

export default {
    components: {
        pokemonDetail
    },
    data: () => ({
        showDetailsBool: false
    }),
    async mounted(){
        await this.getPokemonListFn()
    },
    computed: {
        ...mapState(pokeDexStore, {
            getPokemonList:         'getPokemonListGetter'
        }),
        ...mapState(landingPageStore, {
            getUser:                'getUser'
        })
    },
    methods: {
        ...mapActions(pokeDexStore, {
            get_pokemon_list:       'getPokemonList',
            getHatedPokemon:        'getHatedPokemon',
            setPokeList:            'setPokeList',
            addToLikeAction:        'addToLike',
            getLikedPokemon:        'getLikedPokemon',
            setLikedPokemon:        'setLikedPokemon',
            getPokemonDetail:       'getPokemonDetail',
            setPokemonDetail:       'setPokemonDetail',
            addTohateAction:        'addTohate',
            setHatedPokemon:        'setHatedPokemon'
        }),
        async showDetails(url){
            const dd = await this.getPokemonDetail(url.name)
            this.setPokemonDetail(dd.data)
            alert('please wait')
            this.showDetailsBool = true
        },
        close_dialog(){
            this.showDetailsBool = false
        },
        async getPokemonListFn(){
            const pokemon_list = await this.get_pokemon_list()
            this.setPokeList(pokemon_list.data.data)
        },
        async addToLike(data, index){
            let pass = {
                user_id: this.getUser.id,
                index:  index,
                name:   data.name,
                url:    data.url
            }
            const like = await this.addToLikeAction(pass)
            if(like.status === 200){
                alert('added a liked pokemon')
            }
            const dataa = await this.getLikedPokemon(this.getUser.id)
            await this.setLikedPokemon(dataa.data.data)
        },
        async addToHate(data, index){
            let pass = {
                user_id: this.getUser.id,
                index:  index,
                name:   data.name,
                url:    data.url
            }
            const like = await this.addTohateAction(pass)
            if(like.status === 200){
                alert('added a hated pokemon')
            }
            const dataa = await this.getHatedPokemon(this.getUser.id)
            await this.setHatedPokemon(dataa.data.data)
        }
    }
}
</script>