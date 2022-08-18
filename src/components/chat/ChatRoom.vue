<template>
  <v-container fluid class="ml-5">
    <div class="description">
      <v-avatar class="mr-5 mb-2" color="indigo accent-1" size="40px"
        ><span class="avatar">{{ getConnectionInitials() }}</span></v-avatar
      >{{ connectionName }}
    </div>
    <v-container fluid class="scrollable-list">
      <v-row
        v-for="(message, index) in getMessages()"
        :key="index"
        class="pb-5"
        :justify="checkIfLoggedInUser(message.senderName) ? 'end' : 'start'"
      >
        <v-avatar
          v-if="!checkIfLoggedInUser(message.senderName)"
          color="indigo accent-1"
          size="40"
          ><span class="avatar">{{ getConnectionInitials() }}</span></v-avatar
        >
        <!-- <v-chip :color="checkIfLoggedInUser(message.senderName) ? '#c1caff' : 'light-grey'" class="mr-5 ml-3 message-chip my-font">
          <span>
            {{ message.content }}
          </span>
        </v-chip> -->
        <span
          v-if="checkIfLoggedInUser(message.senderName)"
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
export default {
  name: "ChatRoom",
  props: {
    chatId: String,
    connectionName: String,
  },
  data() {
    return {
      message: "",
      messages: [
        {
          chatId: 1,
          senderName: "Natasa",
          recipientName: "Vera",
          content: "Neka poruka test 1",
        },
        {
          chatId: 1,
          senderName: "Vera",
          recipientName: "Natasa",
          content: "Neka poruka test 2Neka poruka test 2",
        },
        {
          chatId: 1,
          senderName: "Natasa",
          recipientName: "Vera",
          content: "Neka poruka test 3Neka poruka test 2Neka poruka test 2",
        },
        {
          chatId: 1,
          senderName: "Vera",
          recipientName: "Natasa",
          content:
            "Neka poruka test 4Neka poruka test 2Neka poruka test 2Neka poruka test 2Neka poruka test 2Neka poruka test 2Neka poruka test 2",
        },
        {
          chatId: 1,
          senderName: "Vera",
          recipientName: "Natasa",
          content: "Neka poruka test 2",
        },
        {
          chatId: 1,
          senderName: "Natasa",
          recipientName: "Vera",
          content: "Neka poruka test 3",
        },
        {
          chatId: 1,
          senderName: "Vera",
          recipientName: "Natasa",
          content: "Neka poruka test 4",
        },
        {
          chatId: 1,
          senderName: "Vera",
          recipientName: "Natasa",
          content: "Neka poruka test 2",
        },
        {
          chatId: 1,
          senderName: "Natasa",
          recipientName: "Vera",
          content: "Neka poruka test 3",
        },
        {
          chatId: 1,
          senderName: "Vera",
          recipientName: "Natasa",
          content: "Neka poruka test 4",
        },
        {
          chatId: 1,
          senderName: "Vera",
          recipientName: "Natasa",
          content: "Neka poruka test 2",
        },
        {
          chatId: 1,
          senderName: "Natasa",
          recipientName: "Vera",
          content: "Neka poruka test 3",
        },
        {
          chatId: 1,
          senderName: "Vera",
          recipientName: "Natasa",
          content: "Neka poruka test 4",
        },
      ],
    };
  },
  methods: {
    checkIfLoggedInUser: function (name) {
      return name == "Natasa";
    },
    getMessages: function () {
      return this.messages.filter((x) => x.chatId === this.chatId);
    },
    getConnectionInitials() {
      return this.connectionName.split(" ").reduce((p, c) => p + c[0], "");
    },
    sendMessage() {
      if (this.message === "") {
        return;
      }
      alert("sent message: " + this.message);
      this.message = "";
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
