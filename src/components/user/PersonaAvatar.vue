<template>
  <v-avatar color="indigo accent-1" :size="size">
    <v-img v-if="url" class="elevation-6" :src="url" />
    <span v-else class="avatar">{{ getInitials() }}</span>
  </v-avatar>
</template>

<script>
export default {
  name: "PersonaAvatar",
  props: {
    fullname: String,
    url: String,
    size: {
      default: 40,
    },
  },
  data() {
    return {};
  },
  methods: {
    getInitials() {
      return this.fullname.split(" ").reduce((p, c) => p + c[0], "");
    },
  },
};
</script>
<style scoped>
.avatar {
  font-size: 18px;
  font-weight: bold;
  font-family: "Baloo2", Helvetica, Arial;
}

</style>
