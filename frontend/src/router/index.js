import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import UI from '../views/UI.vue'
import Controller from '../views/Controller.vue'
import Stats from '../views/Stats.vue'
import Configuration from '../views/Configuration.vue'

// import PageNotFound from '../views/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/ui',
      name: 'main',
      component: UI
    },

    {
      path: '/controller',
      name: 'controller',
      component: Controller
    },
    {
      path: '/stats',
      name: 'stats',
      component: Stats
    },
    {
      path: '/config',
      name: 'config',
      component: Configuration
    },

    // Error
    /* { 
      path: '/:pathMatch(.*)*', 
      component: PageNotFound 
    } */
  ]
})

export default router
