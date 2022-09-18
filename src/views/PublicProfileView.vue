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
              </v-list-item-content>
            </v-card-title>
            <v-divider class="ml-5 mr-5"></v-divider>
            <v-card-text>
                <public-post-view v-bind:userId="id" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import PersonaAvatar from "@/components/user/PersonaAvatar.vue";
  import PublicPostView from "@/views/PublicPostView.vue";
  
  const apiGetUser = "auth-service/authentication/users/";
  
  export default {
    name: "PublicProfileView",
    components: {
      PersonaAvatar,
      PublicPostView,
    },
    data() {
      return {
        username: "",
        firstName: "",
        lastName: "",
        biography: "",
        accountId: "",
        connectionNumber: 0,
      };
    },
    props: {
      id: String,
    },
    mounted: function () {
      this.getUserInfo();
    },
    watch: {
      id() {
        this.getUserInfo();
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
  