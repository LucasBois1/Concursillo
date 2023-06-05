import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import UI from '../views/UI.vue'
import Controller from '../views/Controller.vue'
import Home from '../views/Home.vue'

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

    // Error
    /* { 
      path: '/:pathMatch(.*)*', 
      component: PageNotFound 
    } */
  ]
})

export default router
