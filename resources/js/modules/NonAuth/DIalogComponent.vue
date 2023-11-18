<template>
    <v-dialog width="500" :modelValue="value">
        <v-card
            v-if="!is_register"
        >
            <v-toolbar
                dark
                color="secondary"
            >
                <v-toolbar-title>
                    <label
                        style="font-family: 'Nunito Sans', sans-serif; font-size: 18px; font-weight: 700;"
                    >
                        Login
                    </label>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        icon="mdi-close"
                        @click="close_dialog()"
                    ></v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-text-field
                    variant="outlined"
                    label="username or email"
                    density="comfortable"
                    prepend-inner-icon="mdi-account"
                    type="text"
                    v-model="l.email"
                >
                </v-text-field>
                <v-text-field
                    variant="outlined"
                    label="username or email"
                    density="comfortable"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="login_show_password ? 'mdi-eye-lock-open' : 'mdi-eye-lock'"
                    @click:append-inner="login_show_password = !login_show_password"
                    :type="login_show_password ? 'text' : 'password'"
                    v-model="l.password"
                >
                </v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    class="text-none"
                    @click="is_register = !is_register"
                >
                    Register
                </v-btn>
                <v-btn
                    color="primary"
                    class="text-none pl-10 pr-10"
                    variant="flat"
                    @click="loginFn()"
                >
                    Login
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card
            v-else
        >
            <v-toolbar
                dark
                color="secondary"
            >
                <v-toolbar-title>
                    <label
                        style="font-family: 'Nunito Sans', sans-serif; font-size: 18px; font-weight: 700;"
                    >
                        Register
                    </label>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        icon="mdi-close"
                        @click="close_dialog()"
                    ></v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <v-text-field
                    v-model="r.name"
                    type="text"
                    prepend-inner-icon="mdi-account"
                    outlined
                    dense
                    label="Name"
                >
                </v-text-field>
                <v-text-field
                    v-model="r.email"
                    type="email"
                    prepend-inner-icon="mdi-at"
                    outlined
                    dense
                    label="Email"
                >
                </v-text-field>
                <v-text-field
                    v-model="r.password"
                    :type="show_password_r_1 ? 'text' : 'password'"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="show_password_r_1 ? 'mdi-eye-lock' : 'mdi-eye-lock-open'"
                    outlined
                    dense
                    label="Password"
                    @click:append-inner="show_password_r_1 = !show_password_r_1"
                >
                </v-text-field>
                <v-text-field
                    v-model="r.rpassword"
                    :type="show_password_r_2 ? 'text' : 'password'"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="show_password_r_2 ? 'mdi-eye-lock' : 'mdi-eye-lock-open'"
                    outlined
                    dense
                    label="Re-type Password"
                    @click:append-inner="show_password_r_2 = !show_password_r_2"
                >
                </v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    class="text-none"
                    @click="is_register = !is_register"
                >
                    Login
                </v-btn>
                <v-btn
                    color="primary"
                    class="text-none pl-10 pr-10"
                    variant="flat"
                    @click="registerUserFn()"
                >
                    Register
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>

import { mapActions } from 'pinia'
import { landingPageStore } from '../Landing/states/state.js'

export default {
    props: [
        'value'
    ],
    data: () => ({
        is_register: false,
        login_show_password: false,
        l: {
            email: null,
            password: null
        },
        r: {
            name: null,
            email: null,
            password: null,
            rpassword: null
        },
        show_password_r_1: false,
        show_password_r_2: false
    }),
    methods: {
        ...mapActions(landingPageStore, {
            register_user:          'registerUser',
            login_user:             'loginUser',
            put_user_information:   'putUserInformation'
        }),
        close_dialog(){
            this.$emit('close_dialog')
            this.is_register = false
            this.l = {}
            this.r = {}
            this.show_password_r_1 = false
            this.show_password_r_2 = false
        },
        async registerUserFn(){
            const register = await this.register_user(this.r)
            if(register.data.response){
                alert('You may now login')
            }
            this.r = {}
            this.is_register = false
        },
        async loginFn(){
            const login = await this.login_user(this.l)
            if(login.data.response){
                let tp = {
                    user: login.data.data,
                    token: login.data.token
                }
                this.put_user_information(tp)
                alert('Login successful!')
                this.close_dialog()
                location.reload()
            }
        }
    }
}
</script>