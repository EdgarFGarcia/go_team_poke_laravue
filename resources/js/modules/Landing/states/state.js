import { defineStore } from 'pinia'
import axios from '../../../plugins/axios'

export const landingPageStore = defineStore('landing', {
    id: 'landing',
    state: () => ({
        user: {},
        token: null
    }),
    getters: {
        getUser: (state) => state.user
    },
    actions: {
        async registerUser(payload){
            const emit = await axios.post('/api/unauth/register', payload)
            return emit
        },
        async loginUser(payload){
            const emit = await axios.post('/api/unauth/login', payload)
            return emit
        },
        putUserInformation(payload){
            this.user = payload.user
            this.token = payload.token
        }
    },
    persist: true
})