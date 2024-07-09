import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@src/views/Home/HomeView.vue'
import IndexView  from "@src/views/Category/IndexView.vue";
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
            component: IndexView
        },
    ]
})

export default router
