<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-card class="mt-6">
          <div class="description ml-8 pt-5">Explore job offers</div>
          <v-card-text>
            <v-text-field
              v-model="query"
              filled
              rounded
              class="ma-3"
              elevation="4"
              placeholder="Search for job offers..."
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
              <job-offer-list v-bind:offers="offers" class="ml-3" />
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import JobOfferList from "@/components/JobOfferList.vue";
const filterApi = "job-offer-service/job-offer/search/";
export default {
  name: "ExploreJobOffersView",
  components: {
    JobOfferList,
  },
  data() {
    return {
      userId: localStorage.getItem("id"),
      query: "",
      offers: [],
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
          console.log(response);
          this.offers = response.data;
          this.showResult = true;
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
