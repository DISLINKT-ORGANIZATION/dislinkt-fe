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
                  :outlined="userConnected || requestPending ? true : false"
                  :disabled="requestPending"
                  @click="userConnected ? unfollow() : follow()"
                  ><b>{{
                    requestPending
                      ? "PENDING"
                      : userConnected
                      ? "UNFOLLOW"
                      : "FOLLOW"
                  }}</b></v-btn
                >
                <v-btn
                  :disabled="!userConnected"
                  class="mr-5"
                  color="#8C9EFF"
                  elevation="2"
                  height="40px"
                  width="100px"
                  @click="redirectToConnection()"
                  ><b>MESSAGE</b></v-btn
                >
                <!-- <v-btn fab small elevation="2" color="#C62828" dark
                  ><v-icon>mdi-account-cancel</v-icon></v-btn
                > -->
                <template
                  v-if="
                    userConnected &&
                    userInitiallyMutedMessages !== undefined &&
                    userInitiallyMutedPosts !== undefined
                  "
                >
                  <settings-menu
                    v-bind:accountId="accountId"
                    :initialMuteMessages="userInitiallyMutedMessages"
                    :initialMutePosts="userInitiallyMutedPosts"
                    :onChangeSwitch="handleSwitchChanged"
                    :onBlockUser="handleUserBlocked"
                  />
                </template>
              </span>
            </v-list-item-content>
            <template v-if="isCurrentUser()">
                  <span class="mr-5">
                    <v-switch
                      v-model="publicAccount"
                      color="#8C9EFF"
                      label="Public account"
                    ></v-switch>
                  </span>
                </template>
          </v-card-title>
          <v-divider class="ml-5 mr-5"></v-divider>
          <v-card-text v-if="publicAccount || userConnected || isCurrentUser()">
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
                <post-view v-bind:userId="id" />
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
          <v-card-text v-else>
            <div class="flex-parent">
              <span class="circle">
                <v-icon class="flex-child" size="100px">
                  mdi-lock-outline
                </v-icon>
              </span>
              <div class="flex-child biography mt-5">
                This is a private account
              </div>
            </div>
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
import PostView from "@/views/user/PostView.vue";

const apiGetUser = "auth-service/authentication/users/";
const apiURLGetResume = "account-service/accounts/user/";
const apiGetConnections = "account-service/connections/";
const apiChangePublic = "account-service/accounts/privacy/";

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
    PostView,
  },
  data() {
    return {
      username: "",
      firstName: "",
      lastName: "",
      biography: "",
      publicAccount: undefined,
      tab: null,
      accountId: "",
      connectionNumber: 0,
      userConnected: true,
      requestPending: false,
      userInitiallyMutedMessages: undefined,
      userInitiallyMutedPosts: undefined,
    };
  },
  props: {
    id: String,
  },
  mounted: function () {
    this.getUserInfo();
    this.getUserAccountId();
    this.getConnections();
    this.checkIfUserConnected();
  },
  watch: {
    id() {
      this.getUserInfo();
      this.getUserAccountId();
      this.getConnections();
      this.checkIfUserConnected();
    },
    publicAccount(newValue, previousValue) {
      if (previousValue === undefined) {
        return;
      }
      this.axios.put(apiChangePublic + this.id);
    }
  },
  methods: {
    getUserInfo() {
      this.axios
        .get(apiGetUser + this.id)
        .then((response) => {
          this.username = response.data.username;
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
          this.userId = response.data.id;
        })
        .catch((error) => {
          this.$root.snackbar.error(error.response.data.message);
        });
    },
    checkIfUserConnected() {
      const currentUserId = localStorage.getItem("id");
      if (currentUserId === this.id) {
        this.userConnected = true;
        return;
      }
      this.axios
        .get(
          apiGetConnections + "check-connected/" + currentUserId + "/" + this.id
        )
        .then((response) => {
          // 0 - not followed, 1 - followed, 2 - pending request
          if (response.data == 1) {
            this.userConnected = true;
            this.checkIfConnectionMuted();
          } else if (response.data == 2) {
            this.userConnected = false;
            this.requestPending = true;
          } else {
            this.userConnected = false;
            this.requestPending = false;
          }
        })
        .catch((error) => {
          this.$root.snackbar.error(error.response.data.message);
        });
    },
    checkIfConnectionMuted() {
      const currentUserId = localStorage.getItem("id");
      if (currentUserId === this.id) {
        return;
      }
      this.axios
        .get(
          apiGetConnections +
            "check-muted-posts/" +
            currentUserId +
            "/" +
            this.id
        )
        .then((response) => {
          this.userInitiallyMutedPosts = response.data;
        })
        .catch((error) => {
          this.$root.snackbar.error(error.response.data.message);
        });
      this.axios
        .get(
          apiGetConnections +
            "check-muted-messages/" +
            currentUserId +
            "/" +
            this.id
        )
        .then((response) => {
          this.userInitiallyMutedMessages = response.data;
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
          this.publicAccount = response.data.publicAccount;
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
          this.$root.snackbar.error("Something went wrong");
        });
    },
    checkIfLoggedInUser() {
      return this.id === localStorage.getItem("id");
    },
    async handleSwitchChanged(switchName) {
      const currentUserId = localStorage.getItem("id");
      const apiExtension =
        switchName === "messages" ? "mute-messages" : "mute-posts";
      return this.axios.put(
        `${apiGetConnections}${apiExtension}/${currentUserId}/${this.id}`
      );
    },
    async handleUserBlocked() {
      const currentUserId = localStorage.getItem("id");
      return this.axios
        .put(`${apiGetConnections}block/${currentUserId}/${this.id}`)
        .then(() => {
          this.$router.push({ name: "BlockedConnectionsView" });
        });
    },
    follow() {
      const currentUserId = localStorage.getItem("id");
      this.axios
        .put(apiGetConnections + "follow/" + currentUserId + "/" + this.userId)
        .then((response) => {
          let followed = response.data;
          if (followed) {
            this.userConnected = true;
            this.getConnections();
            this.checkIfUserConnected();
          } else {
            this.requestPending = true;
          }
        })
        .catch(() => {
          this.$root.snackbar.error("Something went wrong");
        });
    },
    unfollow() {
      const currentUserId = localStorage.getItem("id");
      this.axios
        .put(
          apiGetConnections + "unfollow/" + currentUserId + "/" + this.userId
        )
        .then((response) => {
          console.log(response.data);
          this.userConnected = false;
          this.getConnections();
          this.checkIfUserConnected();
        })
        .catch(() => {
          this.$root.snackbar.error("Something went wrong");
        });
    },
    redirectToConnection() {
      this.$router.push({ name: "ChatRoom", params: { recipientId: this.id } });
    },
    isCurrentUser() {
      console.log('ISCURRENT USER ', localStorage.getItem('id') == this.id)
      console.log(this.id)
      return localStorage.getItem('id') == this.id && this.accountId != '';
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

.flex-parent {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.flex-child {
}

.circle {
  border: 6px solid #757575;
  border-radius: 100px;
  padding: 5px;
  margin-bottom: 5px;
}
</style>
