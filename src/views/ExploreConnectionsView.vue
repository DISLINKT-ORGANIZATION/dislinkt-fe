<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card class="mt-10">
          <v-card-title class="description ml-1">
            <v-col>Explore connections</v-col>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="query"
              filled
              rounded
              class="ma-3"
              elevation="4"
              placeholder="Search for connections..."
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

            <!-- <v-row>
                <skill-card v-bind:userId="userId" v-bind:editable="true"/>
              </v-row> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//   import SkillCard from "@/components/user/SkillCard.vue";
const filterApi = "auth-service/authentication/users/search/";
export default {
  name: "ExploreConnectionsView",
  // components: {
  //   SkillCard
  // },
  data() {
    return {
      userId: localStorage.getItem("id"),
      query: "",
      users: [],
    };
  },
  methods: {
    search() {
      alert("search...");
      this.axios
        .get(filterApi + this.query)
        .then((response) => {
          console.log(response);
          this.users = response.data;
        })
        .catch((error) => {
          this.$root.snackbar.error(error.response.data);
        });
    },
  },
};
</script>

<style scoped>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 35px;
}
</style>
