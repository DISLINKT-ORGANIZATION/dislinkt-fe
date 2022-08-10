import Vue from "vue";
import VueRouter from "vue-router";

import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";

Vue.use(VueRouter);

const routes = [
  {
    component: LoginView,
    name: "LoginView",
    path: "/",
  },
  {
    component: RegisterView,
    name: "RegisterView",
    path: "/register",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
