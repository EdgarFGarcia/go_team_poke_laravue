// Composables
import { createRouter, createWebHistory } from 'vue-router'

import LandingRoute from '../modules/Landing/router/LandingRoute.js'
// import ProductPageRoute from '@/views/Product/router/ProductRoute.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...LandingRoute,
    // ...ProductPageRoute
  ]
})

export default router