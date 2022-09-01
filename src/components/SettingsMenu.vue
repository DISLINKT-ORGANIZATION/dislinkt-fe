<template>
  <v-menu bottom right offset-x :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list class="text">
      <v-list-item>
        <v-list-item-action>
          <v-switch v-model="muteMessages" color="#8C9EFF"></v-switch>
        </v-list-item-action>
        <v-list-item-title>Mute messages</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-action>
          <v-switch v-model="mutePosts" color="#8C9EFF"></v-switch>
        </v-list-item-action>
        <v-list-item-title>Mute posts</v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-btn elevation="0" color="white">
          <v-icon class="pr-5" color="red">mdi-account-cancel</v-icon>
          <span class="danger">Block this account</span>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "ConnectionList",
  props: {
    accountId: Number,
  },
  data() {
    return {
      muteMessages: false,
      mutePosts: false,
    };
  },
  methods: {
    acceptRequest() {
      alert("accept request");
    },
    declineRequest() {
      alert("decline request");
    },
  },
};
</script>

<style>
.text {
  font-family: "Baloo2", Helvetica, Arial;
}

.danger {
    color: red;
}
</style>
