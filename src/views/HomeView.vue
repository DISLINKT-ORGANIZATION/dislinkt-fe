<template>
  <v-container class="container" fluid>
    <v-navigation-drawer v-model="drawer" app v-if="isLoggedIn()">
      <navigation-bar v-bind:user="user"></navigation-bar>
    </v-navigation-drawer>

    <v-app-bar color="indigo accent-1" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="description" style="font-size: 25px"
        >DISLINKT</v-toolbar-title
      >
      <v-spacer />
      <template v-if="isLoggedIn()">
        <v-btn class="ml-3" icon @click="checkRequests()">
          <v-icon>mdi-account-outline</v-icon>
        </v-btn>
        <router-link :to="{ name: 'ChatView' }" v-slot="{ navigate }">
          <v-btn class="ml-3" icon @click="navigate">
            <v-icon>mdi-message-outline</v-icon>
          </v-btn>
        </router-link>
        <router-link :to="{ name: 'NotificationsView' }" v-slot="{ navigate }">
          <v-btn class="ml-3" icon @click="navigate">
            <v-icon>mdi-bell-outline</v-icon>
          </v-btn>
        </router-link>
        <v-btn class="ml-3" icon @click="logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn class="ml-3" icon @click="redirectToLogin()">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-main class="blue-grey lighten-5 content">
      <v-container fluid class="main-container">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-container>
</template>

<script>
import VueSocketIO from "vue-socket.io";
import NavigationBar from "@/components/nav/NavigationBar.vue";
const apiURL = "auth-service/authentication/users/";

export default {
  name: "HomeView",
  components: {
    NavigationBar,
  },
  data() {
    return {
      drawer: true,
      user: {
        firstName: String,
        lastName: String,
        username: String,
      },
      socket: undefined,
    };
  },
  mounted() {
    if (!this.isLoggedIn()) {
      return;
    }
    this.getLoggedInUser();
    this.socket = new VueSocketIO({
      debug: true,
      connection:
        "http://localhost:8187/notification?room=" + localStorage.getItem("id"),
    });
    this.socket.emitter.addListener(
      "notification",
      function (data) {
        console.log(data);
        switch (data.notificationType) {
          case "MESSAGE_SENT":
            this.$root.snackbar.notification_message(function () {
              this.$router.push({
                name: "ChatRoom",
                params: { recipientId: data.senderId },
              });
            });
            break;
          case "NEW_POST":
            this.$root.snackbar.notification_new_post(function () {
              this.$router.push({
                name: "ProfileView",
                params: { id: data.senderId },
              });
            });
            break;
          case "LIKE":
            this.$root.snackbar.notification_post_like(function () {
              this.$router.push({
                name: "ProfileView",
                params: { id: data.recipientId },
              });
            });
            break;
          case "COMMENT":
            this.$root.snackbar.notification_post_comment(function () {
              this.$router.push({
                name: "ProfileView",
                params: { id: data.recipientId },
              });
            });
            break;
          case "NEW_CONNECTION":
            this.$root.snackbar.notification_follow(function () {
              this.$router.push({
                name: "ProfileView",
                params: { id: data.senderId },
              });
            });
            break;
          case "CONNECTION_REQUEST":
            this.$root.snackbar.notification_connection_request(function () {
              this.$router.push({
                name: "ConnectionRequestsView",
              });
            });
            break;
        }
      },
      this
    );
  },
  methods: {
    isLoggedIn() {
      return localStorage.getItem("id") !== null;
    },
    logout() {
      localStorage.clear();
      this.socket.io.disconnect();
      this.$router.push({ name: "GuestView" });
    },
    checkRequests() {
      this.$router.push({ name: "ConnectionRequestsView" });
    },
    getLoggedInUser() {
      let userId = localStorage.getItem("id");
      console.log(userId);
      this.axios
        .get(apiURL + userId)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          this.$root.snackbar.error(error.response.data.message);
        });
    },
    redirectToLogin() {
      this.$router.push({ name: "LoginView" });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}

.content {
  height: 100%;
}

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.description {
  font-family: "Baloo2", Helvetica, Arial;
}
</style>
