<template>
  <v-snackbar :color="color" v-model="showSnackbar" top middle >
    <v-icon left>{{ icon }}</v-icon
    >{{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="showSnackbar = false">
        Close
      </v-btn>
      <v-btn v-if="notification" color="white" text v-bind="attrs" @click="onClickHandler">
        Check
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "vtoast",
  data() {
    return {
      showSnackbar: false,
      message: "",
      color: "success",
      icon: "mdi-check",
      timer: 3000,
      onClick: () => {},
      notification: false
    };
  },
  methods: {
    success(message) {
      this.notification = false;
      this.color = "success";
      this.icon = "mdi-check";
      this.message = message || "Successfully finished the operation!";
      this.showSnackbar = true;
    },
    error(message) {
      this.notification = false;
      this.color = "error";
      this.icon = "mdi-close";
      this.message = message || "An error has ocurred!";
      this.showSnackbar = true;
    },
    warning(message) {
      this.notification = false;
      this.color = "warning";
      this.icon = "mdi-alert";
      this.message = message || "An error has ocurred!";
      this.showSnackbar = true;
    },
    notification_message(callback) {
      this.notification = true;
      this.color = "primary";
      this.icon = "mdi-email";
      this.message = "You have received a new message!";
      this.showSnackbar = true;
      this.onClick = callback;
    },
    notification_connection_request(callback) {
      this.notification = true;
      this.color = "primary";
      this.icon = "mdi-account-plus";
      this.message = "New connection request for you!";
      this.showSnackbar = true;
      this.onClick = callback;
    },
    notification_new_post(callback) {
      this.notification = true;
      this.color = "primary";
      this.icon = "mdi-note-text";
      this.message = "New post from your connection!";
      this.showSnackbar = true;
      this.onClick = callback;
    },
    notification_post_like(callback) {
      this.notification = true;
      this.color = "primary";
      this.icon = "mdi-thumb-up";
      this.message = "New like on your post!";
      this.showSnackbar = true;
      this.onClick = callback;
    },
    notification_post_comment(callback) {
      this.notification = true;
      this.color = "primary";
      this.icon = "mdi-comment-text";
      this.message = "New comment on your post!";
      this.showSnackbar = true;
      this.onClick = callback;
    },
    onClickHandler() {
      this.showSnackbar = false;
      this.onClick();
    }

  },
};
</script>
