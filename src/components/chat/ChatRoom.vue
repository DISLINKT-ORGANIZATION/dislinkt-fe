<template>
  <v-container>
    <v-row
      v-for="(message, index) in messages"
      :key="index"
      class="pb-5"
      :justify="checkIfLoggedInUser(message.senderName) ? 'end' : 'start'"
    >
    <v-avatar v-if="!checkIfLoggedInUser(message.senderName)" color="blue" size="32">IN</v-avatar>
      <v-chip class="mr-5 ml-3">
        {{ message.content }}
      </v-chip>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ChatRoom",
  data() {
    return {
      messages: [
        {
          senderName: "Natasa",
          recipientName: "Vera",
          content: "Neka poruka test 1",
        },
        {
          senderName: "Vera",
          recipientName: "Natasa",
          content: "Neka poruka test 2",
        },
        {
          senderName: "Natasa",
          recipientName: "Vera",
          content: "Neka poruka test 3",
        },
        {
          senderName: "Vera",
          recipientName: "Natasa",
          content: "Neka poruka test 4",
        },
      ],
    } 
  },
  methods: {
    checkIfLoggedInUser: function(name) {
        return name == 'Natasa';
    }
  }
};
</script>
<style lang=""></style>
