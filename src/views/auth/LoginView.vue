<template>
  <v-container
    fluid
    fill-height
    class="main-screen"
    style="justify-content: center"
  >
    <div>
      <v-row>
        <v-col cols="12">
          <LoginForm />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import LoginForm from "@/components/auth/LoginForm.vue";
export default {
  name: "LoginView",
  components: { LoginForm },
};
</script>

<style scoped>
.main-screen {
  background: rgb(181, 136, 251);
  background: radial-gradient(
    circle,
    rgba(181, 136, 251, 1) 0%,
    rgba(102, 107, 255, 1) 93%
  );
}
</style>
