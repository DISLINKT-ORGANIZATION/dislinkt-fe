<template>
  <v-container fluid class="list-container">
    <div class="description ml-4 mt-2">Chat</div>
    <v-list two-line class="pr-5 scrollable-list">
      <template v-for="(user, index) in users">
        <router-link
          :key="index"
          :to="{
            name: 'ChatRoom',
            params: {
              recipientId: user.id,
            },
          }"
          v-slot="{ navigate }"
        >
          <v-list-item ripple @click="navigate" class="text">
            <v-list-item-avatar>
              <persona-avatar
                v-bind:size="40"
                v-bind:fullname="user.firstName + ' ' + user.lastName"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{user.firstName}} {{user.lastName}}</v-list-item-title>
              <v-list-item-subtitle>
                @{{user.username}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-divider v-if="index != users.length-1" :key="`d-${index}`"/>
      </template>
    </v-list>
  </v-container>
</template>
<script>
import PersonaAvatar from "@/components/user/PersonaAvatar.vue";
const accountApi = "account-service/connections/";
const usersApi = "auth-service/authentication/users/ids";

export default {
  name: "ChatConnectionList",
  components: {
    PersonaAvatar
  },
  data() {
    return {
      userId: localStorage.getItem("id"),
      connectionIds: [],
      users: []
    };
  },
  mounted() {
    this.getConnections();
  },
  methods: {
    getConnections() {
      this.axios
        .get(accountApi + this.userId)
        .then((response) => {
          this.connectionIds = response.data.map((e) => e.userConnectionId);
          console.log(this.connectionIds);
          this.getUsers();
        })
        .catch(() => {
          this.$root.snackbar.error();
        });
    },
    getUsers() {
      this.axios({
        url: usersApi,
        data: { ids: this.connectionIds },
        method: "POST",
      })
        .then((response) => {
          this.users = response.data;
          console.log(this.users);
        })
        .catch(() => {
          this.$root.snackbar.error();
        });
    },
  },
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

</style>
