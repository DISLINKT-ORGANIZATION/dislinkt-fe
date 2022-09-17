<template>
  <span class="container">
    <!-- <persona-avatar :size="54" class="avatar" :fullname="'Placeholder Man'" :url="avatar" /> -->
    <v-textarea
      rows="1"
      placeholder="Add a comment..."
      v-model="message"
      @keydown.prevent.enter="sendMessage()"
      class="chat-field"
      filled
      rounded
      no-resize
    />
    <v-btn fab color="indigo accent-1" @click="sendMessage()"
      ><v-icon class="send-icon">mdi-send</v-icon></v-btn
    >
  </span>
</template>

<script>
// import PersonaAvatar from '../PersonaAvatar.vue';
const postCommentApi = "post-service/posts/";
const usersUrl = "auth-service/authentication/users/";

export default {
  name: "CreateComment",
  components: {
    // PersonaAvatar
  },
  props: {
    name: String,
    avatar: String,
    postId: String,
    handleCommentAdded: Function,
  },
  data() {
    return {
      message: "",
      firstName: "",
      lastName: ""
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    sendMessage: function () {
      this.axios
        .post(postCommentApi + this.postId + "/comment", {
          userId: localStorage.getItem("id"),
          content: this.message,
        })
        .then((response) => {
          console.log(response.data);
          let comment = {
            id: response.data.id,
            userId: response.data.userId,
            content: response.data.content,
            firstName: this.firstName,
            lastName: this.lastName,
          }
          
          this.handleCommentAdded(comment);
          this.message = "";
        });
    },
    getUserInfo() {
      const userId = localStorage.getItem("id");
      this.axios.get(usersUrl + userId).then((response) => {
        console.log(response.data);
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName;
      });
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
}
.chat-field {
  margin-right: 6px;
  overflow: auto;
}
.avatar {
  margin-right: 6px;
  width: 80;
}
</style>
