<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card class="mt-6">
          <div class="description ml-11 pt-5">My network</div>
          <v-card-text>
            <connection-list v-bind:connections="users" class="ml-3" />
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
  name: "MyConnectionsView",
  components: {
    ConnectionList,
  },
  data() {
    return {
      userId: localStorage.getItem("id"),
      connectionIds: [],
      users: [],
    };
  },
  mounted() {
    this.getConnections();
  },
  methods: {
    getConnections() {
      this.axios
        .get(accountApi + this.userId)
        .then((response) => {
          this.connectionIds = response.data.map((e) => e.userConnectionId);
          console.log(this.connectionIds);
          this.getUsers();
        })
        .catch(() => {
          this.$root.snackbar.error();
        });
    },
    getUsers() {
      this.axios({
        url: usersApi,
        data: {ids: this.connectionIds},
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
