<template lang="">
    <v-card class="card-container" >
      <v-container fluid class="content-container">
      <v-row no-gutters dense>
        <v-col cols="3">
          <chat-connection-list />
        </v-col>
        <v-col cols="9">
          <router-view />
        </v-col>
      </v-row>
      </v-container>
    </v-card>
</template>

<script>
import ChatConnectionList from "@/components/chat/ChatConnectionList.vue";

export default {
  name: "ChatView",
  components: {
    ChatConnectionList,
  },
};
</script>

<style>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 40px;
  font-weight: 500;
}

.card-container {
  height: 80%;
  width: 80%;
  overflow: hidden;
}

.content-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
