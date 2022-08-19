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
    path: "/login",
  },
  {
    component: RegisterView,
    name: "RegisterView",
    path: "/register",
  },
  {
    component: HomeView,
    name: "HomeView",
    path: "/",
    beforeEnter: guardRouteLoggedIn,
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

function guardRouteLoggedIn(to, from, next) {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user || user["token"] === undefined) next("/login");
  else next(); // allow to enter the route
}

// function guardRouteAdmin(to, from, next) {
//   let user = JSON.parse(localStorage.getItem("user"));
//   if (user["role"] === "ROLE_ADMIN") next();
// }

// function guardRouteUser(to, from, next) {
//   let user = JSON.parse(localStorage.getItem("user"));
//   if (user["role"] === "ROLE_USER") next();
// }

// function guardNotFound(to, from, next) {
//   let user = JSON.parse(localStorage.getItem("user"));
//   if (!user || user["token"] === undefined) next("/");
//   else {
//     if (user["role"] === "ROLE_USER") next({ name: "HomeUserView" });
//     else next({ name: "HomeAdminView" });
//   }
// }

export default router;
