<template>
  <v-snackbar :color="color" v-model="showSnackbar" top middle >
    <v-icon left>{{ icon }}</v-icon
    >{{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="showSnackbar = false">
        Close
      </v-btn>
<<<<<<< Updated upstream
      <v-btn v-if="notification" color="white" text v-bind="attrs" @click="onClickHandler">
        Check
      </v-btn>
=======
      <!-- <v-btn v-if="notification" color="white" text v-bind="attrs" @click="onClickHandler">
        Check
      </v-btn> -->
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      onClick: () => {},
      notification: false
=======
      // onClick: () => {},
      // notification: false
>>>>>>> Stashed changes
    };
  },
  methods: {
    success(message) {
<<<<<<< Updated upstream
      this.notification = false;
=======
      // this.notification = false;
>>>>>>> Stashed changes
      this.color = "success";
      this.icon = "mdi-check";
      this.message = message || "Successfully finished the operation!";
      this.showSnackbar = true;
    },
    error(message) {
<<<<<<< Updated upstream
      this.notification = false;
=======
      // this.notification = false;
>>>>>>> Stashed changes
      this.color = "error";
      this.icon = "mdi-close";
      this.message = message || "An error has ocurred!";
      this.showSnackbar = true;
    },
    warning(message) {
<<<<<<< Updated upstream
      this.notification = false;
=======
      // this.notification = false;
>>>>>>> Stashed changes
      this.color = "warning";
      this.icon = "mdi-alert";
      this.message = message || "An error has ocurred!";
      this.showSnackbar = true;
    },
<<<<<<< Updated upstream
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
    notification_follow(callback) {
      this.notification = true;
      this.color = "primary";
      this.icon = "mdi-account-plus";
      this.message = "New user started following you!";
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
=======
    notification_message() {
      // this.notification = true;
      this.color = "primary";
      this.icon = "mdi-message";
      this.message = "You have received new message!";
      this.showSnackbar = true;
      // this.onClick = callback;
    },
    notification_connection_request() {
      // this.notification = true;
      this.color = "primary";
      this.icon = "mdi-message";
      this.message = "You have received new message!";
      this.showSnackbar = true;
      // this.onClick = callback;
    },
    notification_new_post() {
      // this.notification = true;
      this.color = "primary";
      this.icon = "mdi-message";
      this.message = "You have received new message!";
      this.showSnackbar = true;
      // this.onClick = callback;
    },
    notification_post_like() {
      // this.notification = true;
      this.color = "primary";
      this.icon = "mdi-message";
      this.message = "You have received new message!";
      this.showSnackbar = true;
      // this.onClick = callback;
    },
    // onClickHandler() {
    //   this.showSnackbar = false;
    //   this.onClick();
    // }
>>>>>>> Stashed changes

  },
};
</script>
