import { createWebHistory, createRouter } from "vue-router"
import Home from "../views/Home.vue"
import Form from "../views/Form.vue"
import Download from "../views/Download.vue"
import Filters from "../views/Filters.vue"

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/form",
        component: Form
    },
    {
        path: "/filters",
        component: Filters
    },
    {
        path: "/download",
        component: Download
    },
];

const router = new createRouter({
    routes,
    history: createWebHistory()
})

export default router;