<template>
  <v-container v-if="recipientId" fluid class="ml-5">
    <div class="description">
      <v-avatar class="mr-5 mb-2" color="indigo accent-1" size="40px"
        ><span class="avatar">{{
          getConnectionInitials(connectionName)
        }}</span></v-avatar
      >{{ connectionName }}
    </div>
    <v-container fluid class="scrollable-list" ref="list">
      <v-row
        v-for="(message, index) in messages"
        :key="index"
        class="pb-5"
        :justify="checkIfLoggedInUser(message.senderId) ? 'end' : 'start'"
      >
        <v-avatar
          v-if="!checkIfLoggedInUser(message.senderId)"
          color="indigo accent-1"
          size="40"
          ><span class="avatar">{{
            getConnectionInitials(connectionName)
          }}</span></v-avatar
        >
        <span
          v-if="checkIfLoggedInUser(message.senderId)"
          class="mr-5 ml-3 custom-message-chip my-font user-chip"
        >
          {{ message.content }}
        </span>
        <span
          v-else
          class="mr-5 ml-3 custom-message-chip my-font connection-chip"
        >
          {{ message.content }}
        </span>
      </v-row>
    </v-container>
    <v-spacer />
    <v-row no-gutters dense class="mt-2">
      <v-col cols="11">
        <v-textarea
          rows="1"
          v-model="message"
          @keydown.prevent.enter="sendMessage()"
          class="chat-field"
          filled
          rounded
          no-resize
        >
        </v-textarea>
      </v-col>
      <v-col cols="1">
        <v-btn fab color="indigo accent-1" @click="sendMessage()"
          ><v-icon class="send-icon">mdi-send</v-icon></v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueSocketIO from "vue-socket.io";

const messagesUrl = "messaging-service/chat-room/";
const usersUrl = "auth-service/authentication/users/";
const connectionsUrl = "account-service/connections/check-muted-messages/";

export default {
  name: "ChatRoom",
  props: {
    recipientId: String,
  },
  data() {
    return {
      senderId: localStorage.getItem("id"),
      message: "",
      chatRoomId: 0,
      switchName: true,
      stompClient: {},
      messageData: {},
      messages: [],
      sendNotification: false,
      connectionName: undefined,
      socket: undefined,
    };
  },
  mounted() {
    this.getMessages();
    this.getUserInfo();
    this.checkIfMuted();
    this.socket = new VueSocketIO({
      debug: true,
      connection:
        // "http://localhost:8186/chat?room=" + localStorage.getItem("id"),
        "/message-service/chat?room=" + localStorage.getItem("id"),
    });
    this.socket.emitter.addListener("chat", function (data) {
      if (data.senderId != this.recipientId) {
        return;
      }
      console.log(this.socket);
      this.messages = [...this.messages, data];
      this.$nextTick(() => this.scrollToEnd());
    }, this);
  },
  beforeDestroy() {
    this.socket.io.disconnect();
  },
  watch: {
    recipientId: function () {
      this.checkIfMuted();
      this.getMessages();
      this.getUserInfo();
    },
  },
  methods: {
    checkIfLoggedInUser: function (senderId) {
      const loggedInUserId = localStorage.getItem("id");
      return loggedInUserId == senderId;
    },
    checkIfMuted() {
      this.axios.get(
        connectionsUrl + this.recipientId + "/" + this.senderId
      ).then((response) => {
        console.log('SHOULD MUTE MESSAGES - ', response.data)
        this.sendNotification = !response.data;
      })
    },
    getMessages() {
      this.axios
        .get(messagesUrl + this.senderId + "/" + this.recipientId)
        .then((response) => {
          this.messages = response.data.messages;
          this.chatRoomId = response.data.chatRoomId;
          this.$nextTick(() => this.scrollToEnd());
        });
    },
    getUserInfo() {
      this.axios.get(usersUrl + this.recipientId).then((response) => {
        this.connectionName =
          response.data.firstName + " " + response.data.lastName;
      });
    },
    getConnectionInitials(name) {
      return name?.split(" ").reduce((p, c) => p + c[0], "") || "";
    },
    sendMessage() {
      if (this.message === "") {
        return;
      }
      let msg = {
        senderId: this.senderId,
        recipientId: this.recipientId,
        content: this.message,
        chatId: this.chatRoomId,
        sendNotification: this.sendNotification
      };
      console.log(this.socket);
      this.socket.io.emit("chat", msg);
      this.messages = [...this.messages, msg];
      this.message = "";
      this.$nextTick(() => this.scrollToEnd());
    },
    scrollToEnd: function () {
      // scroll to the start of the last message
      if (!this.messages.length) {
        return;
      }
      console.log(this.$refs.list);
      const listElement = this.$refs.list;
      const offset = listElement.lastElementChild.offsetTop;
      console.log(offset);
      this.$refs.list.scrollTop = offset;
    },
  },
};
</script>
<style scoped>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 40px;
  font-weight: 500;
}
.avatar {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 16px;
  margin-top: 1px;
  font-weight: 700;
}

.scrollable-list {
  overflow-y: auto;
  min-height: calc(100vh - 430px);
  max-height: calc(100vh - 430px);
}

.chat-field {
  margin-right: 12px;
  overflow: auto;
}

.send-icon {
  max-height: 12px;
  max-width: 12px;
}

.custom-message-chip {
  border-radius: 24px;
  padding: 8px;
  min-height: 40px;
  max-width: 400px;
}

.user-chip {
  background-color: #c1caff;
}

.connection-chip {
  background-color: #ebebeb;
}

.test {
  color: #c1caff;
}
</style>
