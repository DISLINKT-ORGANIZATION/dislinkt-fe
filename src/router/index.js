import Vue from "vue";
import VueRouter from "vue-router";

import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import HomeView from "@/views/HomeView.vue";
import AccountView from "@/views/user/AccountView.vue";
import ResumeView from "@/views/user/ResumeView.vue";

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
  {
    component: HomeView,
    name: "HomeView",
    path: "/home",
    children: [
      {
        component: AccountView,
        name: "AccountView",
        path: "/account"
      },
      {
        component: ResumeView,
        name: "ResumeView",
        path: "/resume"
      }
    ]
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
