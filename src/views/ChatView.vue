<template lang="">
  <v-container fluid>
    <v-card class="mt-10 mb-10 ml-10 mr-10" height="90%">
      <v-card-title class="description mt-5 ml-3 pt-5">Chat</v-card-title>
      <v-row rows="12">
        <v-col cols="3">
          <connection-list />
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="9">
            <chat-room />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import ConnectionList from "@/components/chat/ConnectionList.vue";
import ChatRoom from "@/components/chat/ChatRoom.vue";

export default {
  name: "ChatView",
  components: {
    ConnectionList,
    ChatRoom
  },
};
</script>

<style>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 40px;
  font-weight: 500;
}

.card-row {
  height: 100%;
}
</style>
