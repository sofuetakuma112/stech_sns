import Vue from "vue";
import VueRouter from "vue-router";

import Top from "@/views/Top.vue";
import Register from "@/views/Register.vue";
import Detail from "@/views/Detail.vue"
import Error from "@/views/404.vue"
import RakutenBookSearch from "@/views/RakutenBookSearch.vue"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Top,
  },
  {
    path: "/:lang/:skill/:id",
    component: Detail
  },
  {
    path: "/post-review",
    component: RakutenBookSearch
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/404",
    component: Error
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
