<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card class="mt-10" min-height="900px">
          <v-card-title class="description ml-1">
            <persona-avatar
              v-bind:size="100"
              v-bind:fullname="firstName + ' ' + lastName"
            />
            <v-list-item-content class="ml-5">
              <div class="profile-title">{{ firstName }} {{ lastName }}</div>
              <div class="profile-subtitle">@{{ username }}</div>
              <div class="profile-subtitle">
                {{ connectionNumber }} connections
              </div>
            </v-list-item-content>
            <v-list-item-content v-if="!checkIfLoggedInUser()">
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
                <!-- <v-btn fab small elevation="2" color="#C62828" dark
                  ><v-icon>mdi-account-cancel</v-icon></v-btn
                > -->
                <settings-menu v-bind:accountId="accountId" />
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
import SettingsMenu from "@/components/SettingsMenu.vue";

const apiGetUser = "auth-service/authentication/users/";
const apiURLGetResume = "account-service/accounts/user/";
const apiGetConnections = "account-service/connections/";
export default {
  name: "ProfileView",
  components: {
    PersonaAvatar,
    AccountForm,
    EducationCard,
    SkillCard,
    WorkingExperienceCard,
    BiographyCard,
    SettingsMenu,
  },
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      biography: "",
      publicAccount: false,
      tab: null,
      accountId: "",
      connectionNumber: 0,
    };
  },
  props: {
    id: String,
  },
  mounted: function () {
    this.getUserInfo();
    this.getUserAccountId();
    this.getConnections();
  },
  watch: {
    id() {
      this.getUserInfo();
      this.getUserAccountId();
      this.getConnections();
    },
  },
  methods: {
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
    getUserAccountId() {
      console.log("get experience");
      this.axios
        .get(apiURLGetResume + this.id)
        .then((response) => {
          this.accountId = response.data.id;
        })
        .catch(() => {
          this.$root.snackbar.error();
        });
    },
    getConnections() {
      this.axios
        .get(apiGetConnections + this.id)
        .then((response) => {
          this.connectionNumber = response.data.length;
        })
        .catch(() => {
          this.$root.snackbar.error();
        });
    },
    checkIfLoggedInUser() {
      return this.id === localStorage.getItem("id");
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
