<template>
  <v-container fluid class="list-container">
    <div class="description ml-4 mt-4 mb-4">People</div>
    <div v-if="!connections || !connections.length" class="text ml-4 mt-12">
      No results
    </div>
    <v-list v-if="connections" two-line class="pr-5 scrollable-list">
      <template v-for="(item, index) in connections">
        <!-- <router-link
          :key="index"
          :to="{
            name: 'ProfileView',
            params: { id: item.id },
          }"
          v-slot="{ navigate }"
        > -->
        <v-list-item ripple @click="redirect(item.id)" class="text" :key="`${item.id}-${index}`">
          <persona-avatar
            class="mr-5"
            v-bind:size="40"
            v-bind:fullname="item.firstName + ' ' + item.lastName"
          />
          <v-list-item-content>
            <v-list-item-title
              >{{ item.firstName }} {{ item.lastName }}
              <span class="username ml-1 pb-1">@{{ item.username }}</span>
            </v-list-item-title>
            <v-list-item-subtitle style="color: black">
              {{ item.email }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn v-if="requestEnabled" icon @click.stop="acceptRequest()">
              <v-icon color="green" size="30">
                mdi-check-circle-outline
              </v-icon>
            </v-btn>
            <v-btn v-if="requestEnabled" icon @click.stop="declineRequest()">
              <v-icon color="red" size="30"> mdi-close-circle-outline </v-icon>
            </v-btn>
            <v-btn v-if="blockedEnabled" icon @click.stop="unblock()">
              <v-icon color="green" size="30">
                mdi-account-multiple-check
              </v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <!-- </router-link> -->
        <v-divider v-if="index != connections.length - 1" :key="index" />
      </template>
    </v-list>
  </v-container>
</template>
<script>
import PersonaAvatar from "./user/PersonaAvatar.vue";
export default {
  name: "ConnectionList",
  props: {
    connections: [],
    requestEnabled: {
      type: Boolean,
      default: false,
    },
    blockedEnabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    acceptRequest() {
      alert("accept request");
    },
    declineRequest() {
      alert("decline request");
    },
    unblock() {
      alert("unblock account");
    },
    redirect(id) {
      if (!this.blockedEnabled) {
        this.$router.push({ name: "ProfileView", params: { id: id } });
      }
    },
  },
  components: { PersonaAvatar },
};
</script>

<style scoped>
.list-container {
  padding: 0 0 0 0;
  height: 100%;
}

.scrollable-list {
  overflow-y: auto;
  max-height: calc(100vh - 369px);
}

.text {
  font-family: "Baloo2", Helvetica, Arial;
}

.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 35px;
  color: black;
}

.text {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 20px;
  color: black;
}

.username {
  color: #00000099;
  font-size: 14px;
}
</style>
