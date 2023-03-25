import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import SuccessPage from "@/views/SuccessPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/success-page",
    name: "success-page",
    component: SuccessPage,
  },
];

const router = createRouter({ history: createWebHistory(), routes });
export default router;
