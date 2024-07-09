import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@src/views/Home/HomeView.vue'
import CategoryView from '@src/views/Category/CategoryView.vue'
import ProductView from '@src/views/Products/ProductView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category/:uuid',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/product/:uuid',
      name: 'product',
      component: ProductView
    }
  ]
})

export default router
