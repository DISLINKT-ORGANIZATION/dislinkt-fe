<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card class="mt-6">
          <div class="description ml-11 pt-5">Blocked accounts</div>
          <v-card-text>
            <connection-list
              v-bind:connections="users"
              v-bind:blockedEnabled="true"
              v-bind:onUserUnblocked="onUserUnblocked"
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
  name: "BlockedConnectionsView",
  components: {
    ConnectionList,
  },
  data() {
    return {
      userId: localStorage.getItem("id"),
      blockedAccountsIds: [],
      users: [],
    };
  },
  mounted() {
    this.getBlockedAccounts();
  },
  methods: {
    getBlockedAccounts() {
      this.axios
        .get(accountApi + this.userId + "/blocked-accounts")
        .then((response) => {
          this.blockedAccountsIds = response.data.map((e) => e.userId);
          this.getUsers();
        })
        .catch(() => {
          this.$root.snackbar.error();
        });
    },
    getUsers() {
      this.axios({
        url: usersApi,
        data: { ids: this.blockedAccountsIds },
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
    onUserUnblocked(id) {
      console.log("id " + id);
      console.log("before");
      console.log(this.users);
      this.blockedAccountsIds = [...this.blockedAccountsIds].filter(
        (el) => el !== id
      );
      this.users = [...this.users].filter((el) => el.id !== id);
      console.log("after");
      console.log(this.users);
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
