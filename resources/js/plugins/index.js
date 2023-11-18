/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
// import vuetify from './vuetify'
import pinia from '../store/index.js'
import router from '../router'
import axios from 'axios'
import VueAxios from 'vue-axios'

export function registerPlugins (app) {
  app
    // .use(vuetify)
    .use(router)
    .use(pinia)
    .use(VueAxios, axios)
}
