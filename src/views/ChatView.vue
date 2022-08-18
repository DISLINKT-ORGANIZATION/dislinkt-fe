<template lang="">
  <!-- <div>
    <v-card class="chat-view mt-10 mb-10 ml-10 mr-10" height="90%">
      <div class="connection-list">
        <connection-list />
      </div>
      <v-divider vertical></v-divider>
      <div class="chat">
        <router-view />
      </div>
    </v-card>
  </div> -->
    <v-card class="card-container" >
      <v-container fluid class="content-container">
      <v-row no-gutters dense>
        <v-col cols="3">
          <connection-list />
        </v-col>
        <!-- <v-divider vertical /> -->
        <v-col cols="9">
          <router-view />
        </v-col>
      </v-row>
      </v-container>
    </v-card>
</template>

<script>
import ConnectionList from "@/components/chat/ConnectionList.vue";

export default {
  name: "ChatView",
  components: {
    ConnectionList,
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
