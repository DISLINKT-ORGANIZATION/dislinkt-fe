<template>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="6">
          <v-card class="mt-6">
            <div class="description ml-8 pt-5">Search public profiles</div>
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
                <connection-list v-bind:connections="users" :redirectToPublic="true" class="ml-3" />
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
  const accountApiSearch = "account-service/accounts/public-search";
  export default {
    name: "GuestView",
    components: {
      ConnectionList,
    },
    data() {
      return {
        query: "",
        users: [],
        usersIds: [],
        showResult: false,
      };
    },
    mounted() {},
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
            // get all user ids
            this.filterIds(this.userId, response.data);
          })
          .catch(() => {
            this.$root.snackbar.error();
          });
      },
      filterIds(loggedInUserId, users) {
        // return all that are public
        this.axios
          .post(accountApiSearch, {
            loggedInUserId: 0,
            usersIds: users.map((el) => el.id),
          })
          .then((response) => {
            console.log(response.data);
            console.log(users);
            this.userIds = response.data;
            this.users = [...users.filter((el) => this.userIds.includes(el.id) && el.id != loggedInUserId)];
            this.showResult = true;
          });
      },
    }
  };  
  </script>
  
  <style scoped>
  .description {
    font-family: "Baloo2", Helvetica, Arial;
    font-size: 35px;
    color: black;
  }
  </style>
  