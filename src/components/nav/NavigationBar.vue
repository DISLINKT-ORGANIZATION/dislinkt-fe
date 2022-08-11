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
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="description d-flex justify-center" style="font-size: 25px">
            Natasa Ivanovic
          </v-list-item-title>
          <v-list-item-subtitle class="description d-flex justify-center" style="font-size: 18px">
            @naca-faca
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item-group v-model="selectedItem" color="primary" class="description">
        <router-link
          :to="{ name: 'Home' }"
          v-slot="{ navigate }"
        >
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-home-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px">Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link
          :to="{ name: 'Home' }"
          v-slot="{ navigate }"
        >
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-box-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px">My Account</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link
          :to="{ name: 'Home' }"
          v-slot="{ navigate }"
        >
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-file-account-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px">My Resume</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-divider></v-divider>
        <router-link
          :to="{ name: 'Home' }"
          v-slot="{ navigate }"
        >
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-heart-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px">My Network</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link
          :to="{ name: 'Home' }"
          v-slot="{ navigate }"
        >
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-plus-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px">Add Connections</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link
          :to="{ name: 'Home' }"
          v-slot="{ navigate }"
        >
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-account-remove-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px">Blocked Accounts</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-divider></v-divider>
        <router-link
          :to="{ name: 'Home' }"
          v-slot="{ navigate }"
        >
          <v-list-item @click="navigate">
            <v-list-item-icon>
              <v-icon>mdi-pencil-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 18px">Add New Post</v-list-item-title>
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
    // user: JSON.parse(localStorage["user"]),
  }),
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
