import { createRouter, createWebHistory } from "vue-router";
import path from "@/router/path.js";

const routes = [...path];
  
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: to => {
    if (to.hash) {
      return { el: to.hash };
    } else {
      return { top: 0 };
    }
  },
});


export default router;