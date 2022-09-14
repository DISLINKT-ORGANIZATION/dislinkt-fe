<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="6">
          <v-card class="mt-6">
            <div class="description ml-11 pt-5">Notifications</div>
            <v-card-text>
              <notification-list
                class="ml-3"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import NotificationList from "@/components/NotificationList.vue";
  const accountApi = "account-service/connections/";
  const usersApi = "auth-service/authentication/users/ids";
  
  export default {
    name: "NotificationsView",
    components: {
        NotificationList,
    },
    data() {
      return {
        userId: localStorage.getItem("id"),
        requests: [],
        senderIds: [],
        users: []
      };
    },
    mounted() {
      this.getConnectionRequests();
    },
    methods: {
      getConnectionRequests() {
        this.axios
          .get(accountApi + "connection-requests/" + this.userId)
          .then((response) => {
            this.requests = response.data;
            this.senderIds = this.requests.map((el) => el.senderId);
            this.getUsers();
            console.log(this.requests);
          });
      },
      getUsers() {
        this.axios({
          url: usersApi,
          data: { ids: this.senderIds },
          method: "POST",
        })
          .then((response) => {
            this.users = response.data;
            console.log(this.users);
          })
          .catch(() => {
            this.$root.snackbar.error();
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .description {
    font-family: "Baloo2", Helvetica, Arial;
    font-size: 35px;
    color: black;
  }
  </style>
  