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
export default {
  name: "CreateComment",
  components: {
    // PersonaAvatar
  },
  props: {
    name: String,
    avatar: String
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage: function () {
      alert("hai " + this.message);
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
