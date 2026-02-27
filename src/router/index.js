import {createRouter, createWebHistory} from "vue-router";
import Index from "../views/Index.vue";
import Intro from "../views/Intro.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Index,
    }, {
        path: "/intro",
        name: "Intro",
        component: Intro,
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


export default router;
