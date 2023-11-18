import Layout from "@/layouts/index.vue";
import Home from "@/pages/Home.vue";
import Cart from "@/pages/Cart.vue";

const path = [
    {
        path: "/",
        component: Layout,
        children: [
            {
                path: "",
                name: "HomeView",
                component: Home,
            },
            {
                path: "/cart",
                name: "CartView",
                component: Cart,
            },
            { path: "/:pathMatch(.*)*", redirect: "/404", hidden: true },
        ],
    },
    {
        path: "/404",
        name: "404",
        component: () => import("@/components/404.vue"),
    },
];
export default path;
