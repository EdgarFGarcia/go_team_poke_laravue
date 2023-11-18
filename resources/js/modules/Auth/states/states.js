import { defineStore } from 'pinia'
import axios from '../../../plugins/axios'
import axiosraw from "../../../plugins/axiosraw";

export const pokeDexStore = defineStore('pokedex', {
    id: 'pokedex',
    state: () => ({
        pokemon_list: [],
        pokemon_details: {},
        hated_pokemon: [],
        liked_pokemon: [],
        other_users: []
    }),
    getters: {
        getPokemonListGetter : state => state.pokemon_list,
        getPokemonDetailsGetter : state => state.pokemon_details,
        getHatedPokemonGetter : state => state.hated_pokemon,
        getLikedPokemonGetter : state => state.liked_pokemon,
        getOtherUsersGetter : state => state.other_users
    },
    actions: {
        async getPokemonList() {
            return await axios.get('/api/pokemon/getPokemonlist')
        },
        setPokeList(payload) {
            this.pokemon_list = [...payload]
        },
        async getPokemonDetail(payload) {
            return await axios.get(`/api/pokemon/getPokemonDetails/${payload}`)
        },
        setPokemonDetail(payload) {
            this.pokemon_details = payload
        },
        async addTohate(payload) {
            return await axios.post('/api/pokemon/addHate', payload)
        },
        async getHatedPokemon(payload) {
            return await axios.get(`/api/pokemon/getHate/${payload}`)
        },
        async setHatedPokemon(payload) {
            // await commit('setHatedPokemon', payload)
            this.hated_pokemon = [...payload]
        },
        async addToLike(payload) {
            return await axios.post('/api/pokemon/addLike', payload)
        },
        async getLikedPokemon(payload) {
            return await axios.get(`/api/pokemon/getLike/${payload}`)
        },
        async setLikedPokemon(payload) {
            this.liked_pokemon = [...payload]
        },
        async getOtherUser() {
            return await axios.get('/api/pokeUsers/getListUser')
        },
        async setOtherUsers(payload) {
            this.other_users = [...payload]
        }
    },
    persist: true
})