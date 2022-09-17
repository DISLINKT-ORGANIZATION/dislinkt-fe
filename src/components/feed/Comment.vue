<template>
  <div class="comment-card" width="100%">
    <v-card-title class="pl-2 pr-2 pt-0 pb-0">
      <v-list-item-avatar size="32px">
        <persona-avatar v-bind:fullname="firstName + ' ' + lastName" v-bind:url="avatar" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="text-h7 my-font post-owner">
          {{ firstName }} {{lastName}}
        </v-list-item-title>
        <span class="content my-font">
          {{ content }}
        </span>
      </v-list-item-content>
    </v-card-title>
  </div>
</template>

<script>
import PersonaAvatar from "@/components/user/PersonaAvatar.vue";

export default {
  name: "Comment",
  components: {
    PersonaAvatar,
  },
  props: {
    id: String,
    firstName: String,
    lastName: String,
    content: String,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.comment-card {
  margin-top: 4px;
  margin-bottom: 4px;
  background-color: #ebebeb;
  border-radius: 48px;
  margin-right: 12px;
  margin-left: 12px;
}
.post-owner {
  font-size: 16px;
  font-weight: 800;
}
.content {
  font-size: 18px;
}
</style>
