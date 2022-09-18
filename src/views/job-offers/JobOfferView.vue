<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card class="mt-10" min-height="900px" v-if="offer !== undefined">
          <v-card-title class="description ml-1">
            <span class="ml-8 mr-5">
              <v-icon x-large> mdi-laptop </v-icon>
            </span>
            <v-list-item-content class="ml-5">
              <div class="profile-title">{{ offer.title }}</div>
              <div class="profile-subtitle">{{ offer.jobPositionName }}</div>
              <div class="profile-subtitle">
                {{ offer.companyName }}
              </div>
            </v-list-item-content>
          </v-card-title>
          <v-divider class="ml-5 mr-5"></v-divider>
          <div class="description ml-5 mt-5 mb-3">Offer details</div>
          <div class="content ml-5 my-font" v-html="splitDescription(offer.description)">
          </div>
          <div class="description ml-5 mt-5 mb-3">Company website</div>
          <div class="content ml-5 my-font">
            <a :href="offer.companyLink" target="_blank">
                Check us out on Agent Application!
            </a>
          </div>
          <div class="description ml-5 mt-5 mb-3">Position details</div>
          <div class="content ml-5 my-font">
            <a :href="offer.jobPositionLink" target="_blank">
                Check out the details of this position on Agent Application!
            </a>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const apiUrl = "job-offer-service/job-offer/";
export default {
  name: "JobOfferView",
  props: {
    offerId: String,
  },
  data() {
    return {
      offer: undefined,
    };
  },
  mounted() {
    this.getOffer();
  },
  methods: {
    getOffer() {
      this.axios.get(apiUrl + this.offerId).then((response) => {
        this.offer = response.data;
      });
    },
    splitDescription(desc) {
        return desc.split(`\\n`).map(el => `<span>${el}</span><br/>`).join('');
    }
  },
};
</script>

<style scoped>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 35px;
  color: black;
}

.profile-title {
  font-size: 35px;
}
.profile-subtitle {
  font-size: 20px;
}

.content {
}
</style>
