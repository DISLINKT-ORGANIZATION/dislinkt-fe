<template>
  <v-container fluid class="list-container">
    <div v-if="!offers || !offers?.length" class="text ml-4 mt-12">
      No results
    </div>
    <v-list v-if="offers" two-line class="pr-5 scrollable-list">
      <template v-for="(item, index) in offers">
        <v-list-item v-bind:key="item.id" @click="redirect(item.id)">
            <v-list-item-icon>
                <v-icon x-large >
                    mdi-laptop
                </v-icon>
            </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="mb-2"
              >{{ item.jobPositionName }}
            </v-list-item-title>
            <v-list-item-subtitle class="mb-2" style="color: black">
              {{ item.companyName }}
            </v-list-item-subtitle>
            <v-list-item-subtitle style="color: black">
              {{ item.title }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-if="index != offers.length - 1" :key="index" />
      </template>
    </v-list>
  </v-container>
</template>
<script>
export default {
  name: "JobOfferList",
  props: {
    offers: [],
  },
  data() {
    return {};
  },
  methods: {
    redirect(id) {
      if (!this.blockedEnabled) {
        this.$router.push({ name: "JobOfferView", params: { offerId: id } });
      }
    }
  },
};
</script>

<style scoped>
.list-container {
  padding: 0 0 0 0;
  height: 100%;
}

.scrollable-list {
  overflow-y: auto;
  max-height: calc(100vh - 369px);
}

.text {
  font-family: "Baloo2", Helvetica, Arial;
}

.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 35px;
  color: black;
}

.text {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 20px;
  color: black;
}

.username {
  color: #00000099;
  font-size: 14px;
}
</style>
