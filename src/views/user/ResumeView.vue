<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card class="mt-10">
          <v-card-title class="description ml-1">
            <v-col>My resume</v-col>
          </v-card-title>
          <v-card-text>
            <v-row>
              <skill-card />
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SkillCard from "@/components/user/SkillCard.vue";
export default {
  name: "ResumeView",
  components: {
    SkillCard,
  },
};
</script>

<style scoped>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 35px;
}
</style>