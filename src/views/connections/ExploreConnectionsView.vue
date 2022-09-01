<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card class="mt-6">
          <div class="description ml-8 pt-5">Explore connections</div>
          <v-card-text>
            <v-text-field
              v-model="query"
              filled
              rounded
              class="ma-3"
              elevation="4"
              placeholder="Search for connections..."
              @keydown.prevent.enter="search()"
            >
              <template v-slot:append-outer
                ><v-btn
                  style="top: -16px"
                  fab
                  medium
                  color="#8C9EFF"
                  elevation="4"
                  @click="search()"
                  ><v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-text-field>
            <v-row v-if="showResult">
              <connection-list v-bind:connections="users" class="ml-3" />
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ConnectionList from "@/components/ConnectionList.vue";
const filterApi = "auth-service/authentication/users/search/";
const accountApi = "account-service/connections/";
export default {
  name: "ExploreConnectionsView",
  components: {
    ConnectionList,
  },
  data() {
    return {
      userId: localStorage.getItem("id"),
      query: "",
      users: [],
      blockedAccountsIds: [],
      showResult: false,
    };
  },
  mounted() {
    this.getBlockedAccounts();
  },
  methods: {
    search() {
      if (!this.query) {
        this.users = [];
        this.showResult = false;
        return;
      }
      this.axios
        .get(filterApi + this.query)
        .then((response) => {
          console.log(response);
          this.users = response.data.filter(
            (el) =>
              el.id != this.userId && !this.blockedAccountsIds.includes(el.id)
          );
          this.showResult = true;
        })
        .catch(() => {
          this.$root.snackbar.error();
        });
    },
    getBlockedAccounts() {
      this.axios
        .get(accountApi + this.userId + "/blocked-accounts")
        .then((response) => {
          this.blockedAccountsIds = response.data.map((e) => e.userId);
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
