<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card class="mt-10">
          <v-card-title class="description ml-1">
            <v-col>My biography</v-col>
          </v-card-title>
          <v-card-text>
            <v-row>
              <biography-card v-bind:userId="userId" v-bind:editable="true"/>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BiographyCard from "@/components/user/BiographyCard.vue";
export default {
  name: "BiographyView",
  components: {
    BiographyCard
  },
  data() {
    return {
      userId: localStorage.getItem("id")
    }
  }
};
</script>

<style scoped>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 35px;
}
</style>