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
import NotificationsView from "@/views/NotificationsView.vue";
import FeedView from "@/views/FeedView.vue";
import ExploreJobOffersView from "@/views/job-offers/ExploreJobOffersView.vue";
import JobOfferView from "@/views/job-offers/JobOfferView";
import GuestView from "@/views/GuestView.vue";
import PublicProfileView from "@/views/PublicProfileView.vue";

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
    children: [
      {
        component: AccountView,
        name: "AccountView",
        beforeEnter: guardRouteLoggedIn,
        path: "/account",
      },
      {
        component: SkillsView,
        name: "SkillsView",
        beforeEnter: guardRouteLoggedIn,
        path: "/skills",
      },
      {
        component: WorkingExperienceView,
        name: "WorkingExperienceView",
        beforeEnter: guardRouteLoggedIn,
        path: "/working-experience",
      },
      {
        component: EducationView,
        name: "EducationView",
        beforeEnter: guardRouteLoggedIn,
        path: "/education",
      },
      {
        component: BiographyView,
        name: "BiographyView",
        beforeEnter: guardRouteLoggedIn,
        path: "/biography",
      },
      {
        component: ProfileView,
        name: "ProfileView",
        beforeEnter: guardRouteLoggedIn,
        path: "/profile/:id",
        props: true,
      },
      {
        component: ExploreConnectionsView,
        name: "ExploreConnectionsView",
        beforeEnter: guardRouteLoggedIn,
        path: "/explore-connections",
      },
      {
        component: MyConnectionsView,
        name: "MyConnectionsView",
        beforeEnter: guardRouteLoggedIn,
        path: "/my-connections",
      },
      {
        component: BlockedConnectionsView,
        name: "BlockedConnectionsView",
        beforeEnter: guardRouteLoggedIn,
        path: "/blocked-accounts",
      },
      {
        component: ConnectionRequestsView,
        name: "ConnectionRequestsView",
        beforeEnter: guardRouteLoggedIn,
        path: "/connection-requests",
      },
      {
        component: ChatView,
        name: "ChatView",
        beforeEnter: guardRouteLoggedIn,
        path: "/chat",
        children: [
          {
            component: ChatRoom,
            name: "ChatRoom",
            props: true,
            path: "/chat/:recipientId",
          },
        ],
      },
      {
        component: NotificationsView,
        name: "NotificationsView",
        beforeEnter: guardRouteLoggedIn,
        path: "/notifications",
      },
      {
        component: ExploreJobOffersView,
        name: "ExploreJobOffersView",
        beforeEnter: guardRouteLoggedIn,
        path: "/offers",
      },
      {
        component: JobOfferView,
        name: "JobOfferView",
        path: "/offer/:offerId",
        beforeEnter: guardRouteLoggedIn,
        props: true,
      },
      {
        component: FeedView,
        name: "FeedView",
        beforeEnter: guardRouteLoggedIn,
        path: "/feed",
      },
      {
        component: PublicProfileView,
        name: "PublicProfileView",
        props: true,
        path: "/posts/:id",
      },
      {
        component: GuestView,
        name: "GuestView",
        path: "/",
      },
    ],
  },
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
