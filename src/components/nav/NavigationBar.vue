<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex shrink>
        <v-img
          src="@/assets/kitty.gif"
          style="width: 170px; height: 120px"
        ></v-img>
      </v-flex>
    </v-layout>
    <v-list>
      <router-link :to="{ name: 'ProfileView', params: {id: userId} }" v-slot="{ navigate }">
        <v-list-item link @click="navigate">
          <v-list-item-content>
            <v-list-item-title v-if="role === 'ROLE_USER'"
              class="description d-flex justify-center"
              style="font-size: 25px"
            >
              {{ user.firstName }} {{ user.lastName }}
            </v-list-item-title>
            <v-list-item-subtitle 
              class="description d-flex justify-center"
              style="font-size: 18px"
            >
              @{{ user.username }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
        class="description"
      >
        <router-link v-if="role === 'ROLE_ADMINISTRATOR'" :to="{ name: 'EventsView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Home</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-if="role === 'ROLE_USER'" :to="{ name: 'FeedView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Home</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-divider></v-divider>
        <router-link v-if="role === 'ROLE_USER'" :to="{ name: 'AccountView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-box-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Account</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-group v-if="role === 'ROLE_USER'" prepend-icon="mdi-file-account-outline">
          <template v-slot:activator>
            <v-list-item-content style="font-size: 18px"
              >Resume</v-list-item-content
            >
          </template>
          <router-link v-if="role === 'ROLE_USER'" :to="{ name: 'BiographyView' }" v-slot="{ navigate }">
            <v-list-item @click="navigate">
              <v-list-item-icon>
                <v-icon>mdi-text-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="font-size: 18px"
                  >Biography</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link v-if="role === 'ROLE_USER'" :to="{ name: 'SkillsView' }" v-slot="{ navigate }">
            <v-list-item @click="navigate">
              <v-list-item-icon>
                <v-icon>mdi-lightbulb-on-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="font-size: 18px"
                  >Skills</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link v-if="role === 'ROLE_USER'"
            :to="{ name: 'WorkingExperienceView' }"
            v-slot="{ navigate }"
          >
            <v-list-item @click="navigate">
              <v-list-item-icon>
                <v-icon>mdi-briefcase-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="font-size: 18px"
                  >Experience</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link v-if="role === 'ROLE_USER'" :to="{ name: 'EducationView' }" v-slot="{ navigate }">
            <v-list-item @click="navigate">
              <v-list-item-icon>
                <v-icon>mdi-account-school-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="font-size: 18px"
                  >Education</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-group>
        <v-divider v-if="role === 'ROLE_USER'"></v-divider>
        <router-link v-if="role === 'ROLE_USER'" :to="{ name: 'MyConnectionsView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-heart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >My Network</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-if="role === 'ROLE_USER'" :to="{ name: 'ExploreConnectionsView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Add Connections</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-if="role === 'ROLE_USER'" :to="{ name: 'BlockedConnectionsView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-remove-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Blocked Accounts</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-divider></v-divider>
        <router-link v-if="role !== 'ROLE_ADMINISTRATOR'" :to="{ name: 'ExploreJobOffersView' }" v-slot="{ navigate }">
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-magnify</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px"
                >Explore offers</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    selectedItem: null,
    userId: localStorage.getItem("id"),
    role: localStorage.getItem('role'),
  }),
  props: {
    user: Object,
  },
};
</script>

<style scoped>
img {
  height: 50%;
  width: 100%;
}
.description {
  font-family: "Baloo2", Helvetica, Arial;
}
</style>
