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
          <v-switch
            v-model="muteMessages"
            :disabled="loading"
            :loading="loading"
            color="#8C9EFF"
          ></v-switch>
        </v-list-item-action>
        <v-list-item-title>Mute messages</v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-action>
          <v-switch
            v-model="mutePosts"
            :disabled="disabled"
            :loading="loading"
            color="#8C9EFF"
          ></v-switch>
        </v-list-item-action>
        <v-list-item-title>Mute posts</v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-btn elevation="0" @click="userBlocked" color="white" :disabled="loadingBlocked" :loading="loadingBlocked">
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
    initialMuteMessages: {
      type: Boolean,
      default: false,
    },
    initialMutePosts: {
      type: Boolean,
      default: false,
    },
    onChangeSwitch: {
      type: Function,
      default: undefined,
    },
    onBlockUser: {
      type: Function,
      default: undefined,
    },
    accountId: Number,
  },
  data() {
    return {
      muteMessages: this.initialMuteMessages,
      mutePosts: this.initialMutePosts,
      loading: false,
      loadingBlocked: false
    };
  },
  watch: {
    muteMessages() {
      this.loading = true;
      this.onChangeSwitch("messages")
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.$root.snackbar.error("Something went wrong");
        });
    },
    mutePosts() {
      this.loading = true;
      this.onChangeSwitch("posts")
        .then(() => {
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          this.$root.snackbar.error("Something went wrong");
        });
    },
  },
  methods: {
    userBlocked() {
      this.loadingBlocked = true;
      this.onBlockUser();
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
