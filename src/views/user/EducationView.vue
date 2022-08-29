<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card class="mt-10">
          <v-card-title class="description ml-1">
            <v-col>My education</v-col>
          </v-card-title>
          <v-card-text>
            <v-row>
              <education-card v-bind:userId="userId" v-bind:editable="true"/>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EducationCard from '../../components/user/EducationCard.vue';
export default {
  name: "EducationView",
  components: {
    EducationCard
  },
  data() {
    return {
      userId: localStorage.getItem("id")
    }
  }
};
</script>

<style>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 35px;
}
</style>