import Vue from "vue";
import VueRouter from "vue-router";

import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import HomeView from "@/views/HomeView.vue";
import AccountView from "@/views/user/AccountView.vue";
import SkillsView from "@/views/user/SkillsView.vue";
import WorkingExperienceView from "@/views/user/WorkingExperienceView.vue";
import EducationView from "@/views/user/EducationView.vue";
import BiographyView from "@/views/user/BiographyView.vue";
import ProfileView from "@/views/user/ProfileView.vue";
import ExploreConnectionsView from "@/views/connections/ExploreConnectionsView.vue";
import MyConnectionsView from "@/views/connections/MyConnectionsView.vue";
import BlockedConnectionsView from "@/views/connections/BlockedConnectionsView.vue";
import ConnectionRequestsView from "@/views/connections/ConnectionRequestsView.vue";
import ChatView from "@/views/ChatView.vue";
import ChatRoom from "@/components/chat/ChatRoom.vue";

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
        component: SkillsView,
        name: "SkillsView",
        path: "/skills"
      },
      {
        component: WorkingExperienceView,
        name: "WorkingExperienceView",
        path: "/working-experience"
      },
      {
        component: EducationView,
        name: "EducationView",
        path: "/education"
      },
      {
        component: BiographyView,
        name: "BiographyView",
        path: "/biography"
      },
      {
        component: ProfileView,
        name: "ProfileView",
        path: "/profile/:id",
        props: true,
      },
      {
        component: ExploreConnectionsView,
        name: "ExploreConnectionsView",
        path: "/explore-connections"
      },
      {
        component: MyConnectionsView,
        name: "MyConnectionsView",
        path: "/my-connections",
      },
      {
        component: BlockedConnectionsView,
        name: "BlockedConnectionsView",
        path: "/blocked-accounts",
      },
      {
        component: ConnectionRequestsView,
        name: "ConnectionRequestsView",
        path: "/connection-requests",
      },
      {
        component: ChatView,
        name: "ChatView",
        path: "/chat",
        children: [
          {
            component: ChatRoom,
            name: "ChatRoom",
            props: true,
            path: "/chat/:chatId",
          },
        ],
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

function guardRouteLoggedIn(to, from, next) {
  let userId = localStorage.getItem("id");
  let token = localStorage.getItem("token");
  if (!userId || !token) next("/login");
  else next(); // allow to enter the route
}

// function guardRouteAdmin(to, from, next) {
//   let userRole = localStorage.getItem("role");
//   if (userRole === "ROLE_ADMIN") next();
// }

// function guardRouteUser(to, from, next) {
//   let userRole = localStorage.getItem("role");
//   if (userRole === "ROLE_USER") next();
// }

// function guardNotFound(to, from, next) {
//   let userRole = localStorage.getItem("role");
//   let token = localStorage.getItem("token");
//   if (!userRole || !token) next("/");
//   else {
//     if (userRole === "ROLE_USER") next({ name: "HomeUserView" });
//     else next({ name: "HomeAdminView" });
//   }
// }

// Vue.axios.interceptors.response.use(undefined, function (error) {
//   if (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         localStorage.clear();
//         return router.push('/login');
//     }
//     return Promise.reject(error);
//   }
// })

export default router;