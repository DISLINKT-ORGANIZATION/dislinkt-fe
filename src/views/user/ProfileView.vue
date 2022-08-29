<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card class="mt-10">
          <v-card-title class="description ml-1">
            <persona-avatar
              v-bind:size="100"
              v-bind:fullname="firstName + ' ' + lastName"
            />
            <v-list-item-content class="ml-5">
              <div class="profile-title">{{ firstName }} {{ lastName }}</div>
              <div class="profile-subtitle">@{{ username }}</div>
              <div class="profile-subtitle">500+ connections</div>
            </v-list-item-content>
            <v-list-item-content>
              <span class="mt-10">
                <v-btn
                  class="mr-5"
                  color="#8C9EFF"
                  elevation="2"
                  height="40px"
                  width="100px"
                  ><b>FOLLOW</b></v-btn
                >
                <v-btn
                  class="mr-5"
                  color="#8C9EFF"
                  elevation="2"
                  height="40px"
                  width="100px"
                  ><b>MESSAGE</b></v-btn
                >
                <v-btn fab small elevation="2" color="#C62828" dark
                  ><v-icon>mdi-account-cancel</v-icon></v-btn
                >
              </span>
            </v-list-item-content>
          </v-card-title>
          <v-divider class="ml-5 mr-5"></v-divider>
          <v-card-text>
            <v-tabs v-model="tab" centered icons-and-text color="#8C9EFF">
              <v-tabs-slider></v-tabs-slider>

              <v-tab>
                Posts
                <v-icon>mdi-card-text-outline</v-icon>
              </v-tab>

              <v-tab>
                About
                <v-icon>mdi-account-outline</v-icon>
              </v-tab>

              <v-tab>
                Education
                <v-icon>mdi-account-school-outline</v-icon>
              </v-tab>

              <v-tab>
                Skills
                <v-icon>mdi-lightbulb-on-outline</v-icon>
              </v-tab>

              <v-tab>
                Experience
                <v-icon>mdi-briefcase-outline</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <div>Postssss</div>
              </v-tab-item>
              <v-tab-item>
                <account-form v-bind:userId="id" v-bind:editable="false" />
                <div class="mr-3 ml-3">
                  <div class="biography mt-2">Biography</div>
                  <biography-card v-bind:userId="id" v-bind:editable="false" />
                </div>
              </v-tab-item>
              <v-tab-item>
                <education-card v-bind:userId="id" v-bind:editable="false" />
              </v-tab-item>
              <v-tab-item>
                <skill-card v-bind:userId="id" v-bind:editable="false" />
              </v-tab-item>
              <v-tab-item>
                <working-experience-card
                  v-bind:userId="id"
                  v-bind:editable="false"
                />
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PersonaAvatar from "@/components/user/PersonaAvatar.vue";
import AccountForm from "@/components/user/AccountForm.vue";
import EducationCard from "@/components/user/EducationCard.vue";
import SkillCard from "@/components/user/SkillCard.vue";
import WorkingExperienceCard from "@/components/user/WorkingExperienceCard.vue";
import BiographyCard from "@/components/user/BiographyCard.vue";
// const apiGetResume = "account-service/accounts/user/";
const apiGetUser = "auth-service/authentication/users/";
//   import SkillCard from "@/components/user/SkillCard.vue";
export default {
  name: "ProfileView",
  components: {
    PersonaAvatar,
    AccountForm,
    EducationCard,
    SkillCard,
    WorkingExperienceCard,
    BiographyCard,
  },
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      biography: "",
      publicAccount: false,
      proficiencies: [],
      education: [],
      workingExperience: [],
      tab: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  props: {
    id: String,
  },
  mounted: function () {
    // this.getUserAccount();
    this.getUserInfo();
  },
  methods: {
    // getUserAccount() {
    //   this.axios.get(
    //     apiGetResume + this.id
    //   ).then((response) => {
    //     this.proficiencies = response.data.skills;
    //     this.proficiencies.forEach((p) => {
    //       p.skillProficiency = p.skillProficiency + 1;
    //     });
    //     this.proficiencies.sort(this.elementTypeSort);
    //   })
    // },
    getUserInfo() {
      this.axios
        .get(apiGetUser + this.id)
        .then((response) => {
          this.username = response.data.username;
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
        })
        .catch((error) => {
          this.$root.snackbar.error(error.response.data.message);
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

.biography {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 30px;
  color: black;
  text-align: center;
}

.biography-content {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 20px;
}

.profile-title {
  font-size: 35px;
}
.profile-subtitle {
  font-size: 20px;
}
</style>
