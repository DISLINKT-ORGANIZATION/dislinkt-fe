<template>
  <v-app>
    <snackbar ref="snackbar" />
    <router-view />
  </v-app>
</template>

<script>
import snackbar from "@/components/snack/SnackBar.vue";

export default {
  name: "App",
  components: { snackbar },
  data: () => ({}),
  mounted() {
    this.$root.snackbar = this.$refs.snackbar;
  },
};
</script>

<style>
@font-face {
  font-family: "Baloo2";
  src: local("Baloo2"),
    url(./fonts/Baloo2/Baloo2-Regular.ttf) format("truetype");
}

<<<<<<< HEAD
.primary-color {
  color: #8C9EFF;
}

=======
.my-font {
  font-family: "Baloo2", Helvetica, Arial;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
>>>>>>> ef8023e (feat: chat template looks nice)
::-webkit-scrollbar-track {
  background: #ececf0;
  opacity: 0;
}

<<<<<<< HEAD
=======
/* Handle */
>>>>>>> ef8023e (feat: chat template looks nice)
::-webkit-scrollbar-thumb {
  background: rgb(199, 199, 199);
}

<<<<<<< HEAD
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
=======
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
>>>>>>> ef8023e (feat: chat template looks nice)
</style>
