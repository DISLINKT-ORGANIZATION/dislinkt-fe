<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card class="mt-6">
          <div class="description ml-11 pt-5">Connection requests</div>
          <v-card-text>
            <connection-list
              v-bind:connections="users"
              v-bind:requestModeEnabled="true"
              v-bind:onRequestProcessed="onRequestProcessed"
              class="ml-3"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConnectionList from "@/components/ConnectionList.vue";
const accountApi = "account-service/connections/";
const usersApi = "auth-service/authentication/users/ids";

export default {
  name: "ConnectionRequestsView",
  components: {
    ConnectionList,
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
    onRequestProcessed(userId, isAccepted) {
      let requestId = this.requests.find(el => el.senderId === userId).connectionRequestId;
      const path = isAccepted ? "accept-connection-request/" : "decline-connection-request/";
      this.axios.put(
        accountApi + path + requestId
      ).then(() => {
        this.requests = [...this.requests.filter(el => el.connectionRequestId != requestId)];
        this.senderIds = this.requests.map((el) => el.senderId);
        this.users = [...this.users.filter(el => el.id != userId)];
      })
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
