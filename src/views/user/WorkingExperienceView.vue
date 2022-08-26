<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card class="mt-5">
          <v-card-title class="description ml-1">
            <v-col>My working experience</v-col>
          </v-card-title>
          <v-card-text>
            <v-row>
              <working-experience-card />
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WorkingExperienceCard from "@/components/user/WorkingExperienceCard.vue";
export default {
  name: "WorkingExperienceView",
  components: {
    WorkingExperienceCard
  },
};
</script>

<style scoped>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 35px;
}
</style>