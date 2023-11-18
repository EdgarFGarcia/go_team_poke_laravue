import './bootstrap';
import {createApp} from 'vue'
// import App from './App.vue'
import App from './layouts/Default.vue'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Plugins
import { registerPlugins } from '@/plugins'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

registerPlugins(app)

app.use(vuetify)
app.mount("#app")