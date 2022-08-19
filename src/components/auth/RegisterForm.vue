<template>
  <v-container fill-height>
    <v-container>
      <v-card width="900" height="700" elevation="24">
        <v-card-title
          align="center"
          justify="center"
          class="description pt-15 justify-center"
          style="font-size: 50px"
        >
          <b>Welcome to DISLINKT!</b>
        </v-card-title>
        <v-row
          align="center"
          justify="center"
          class="description"
          style="font-size: 30px"
        >
          Register to start looking for a job!
        </v-row>
        <v-form v-model="valid" ref="form">
          <v-row class="ml-5 mr-5 mt-10">
            <v-col class="pr-5">
              <v-text-field
                v-model="user.username"
                :rules="[rules.required]"
                label="Username"
                prepend-icon="mdi-account"
                type="text"
                class="description"
                style="font-size: 18px"
              />
            </v-col>
            <v-col class="pr-5">
              <v-text-field
                v-model="user.email"
                :rules="[rules.email, rules.required]"
                label="Email"
                prepend-icon="mdi-email"
                type="text"
                class="description"
                style="font-size: 18px"
              />
            </v-col>
          </v-row>
          <v-row class="ml-5 mr-5 mt-5">
            <v-col class="pr-5">
              <v-text-field
                v-model="user.firstName"
                :rules="[rules.required]"
                label="First Name"
                prepend-icon="mdi-account"
                type="text"
                class="description"
                style="font-size: 18px"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="user.lastName"
                :rules="[rules.required]"
                label="Last Name"
                prepend-icon="mdi-account"
                type="text"
                class="description"
                style="font-size: 18px"
              />
            </v-col>
          </v-row>
          <v-row class="ml-5 mr-5 mt-5">
            <v-col>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    class="description"
                    style="font-size: 18px"
                    v-model="birthDate"
                    label="Birthday"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="[rules.required]"
                  ></v-text-field>
                </template>
                <v-date-picker
                  class="description"
                  style="font-size: 18px"
                  v-model="birthDate"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col>
              <v-select
                v-model="user.gender"
                :items="genders"
                class="description"
                style="font-size: 18px"
                label="Gender"
                item-value="id"
                item-name="text"
                prepend-icon="mdi-gender-transgender"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
          </v-row>
          <v-row class="ml-5 mr-5 mt-5">
            <v-col>
              <v-text-field
                id="custom-css-input"
                v-model="user.password"
                :rules="[rules.required, rules.counter]"
                label="Password"
                prepend-icon="mdi-lock"
                style="font-size: 18px"
                class="description"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="confirmPassword"
                :rules="[rules.passwordMatch, rules.required]"
                label="Confirm Password"
                prepend-icon="mdi-lock"
                style="font-size: 18px"
                class="description"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showConfirmPassword ? 'text' : 'password'"
                @click:append="showConfirmPassword = !showConfirmPassword"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col class="mt-6 ml-8 mr-8">
            <v-btn
              color="main-screen"
              @click="register()"
              block
              class="description"
              style="font-size: 15px"
              :loading="loading"
              ><b>Register</b></v-btn
            >
          </v-col>
        </v-row>
        <v-row align="center" justify="center" class="pt-2">
          <router-link
            :to="{ name: 'LoginView' }"
            style="text-decoration: none; color: #666bff"
            ><p class="description" style="font-size: 20px">
              Already have an account? Log in
            </p></router-link
          >
        </v-row>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
const apiURL = "auth-service/authentication/register-user";

export default {
  name: "RegisterForm",

  data() {
    return {
      user: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        password: "",
      },
      menu: false,
      valid: true,
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      error: false,
      loading: false,
      birthDate: "",
      rules: {
        required: (value) => !!value || "Field is required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
        counter: (value) =>
          (value && value.length >= 5) ||
          "Password must have a minimum of 5 characters.",
        passwordMatch: () =>
          this.user.password == this.confirmPassword || "Passwords must match.",
      },
      genders: [
        { id: 1, text: "Female" },
        { id: 2, text: "Male" },
        { id: 3, text: "Other" },
      ],
    };
  },
  methods: {
    register: function () {
      this.user.birthDate = this.convertToLong(this.birthDate);
      this.loading = true;
      this.$refs.form.validate();
      if (!this.valid) {
        this.loading = false;
        return;
      }
      if (this.user.password != this.confirmPassword) {
        this.loading = false;
        return;
      }
      console.log(this.user);
      const postUser = Object.assign({}, this.user);
      postUser.gender = postUser.gender - 1;
      this.axios
        .post(apiURL, postUser)
        .then((response) => {
          this.loading = false;
          this.$root.snackbar.success(
            "You've successfully registered your account"
          );
          this.$refs.form.reset();
          console.log(response);
        })
        .catch((error) => {
          this.loading = false;
          if (error.response.data) {
            this.$root.snackbar.error(error.response.data);
          } else {
            this.$root.snackbar.error();
          }
        });
    },
    convertToLong: function (dateStr) {
      let date = new Date(dateStr);
      return date.getTime();
    },
  },
};
</script>

<style scoped>
.description {
  font-family: "Baloo2", Helvetica, Arial;
}

.main-screen {
  background: rgb(181, 136, 251);
  background: radial-gradient(
    circle,
    rgba(181, 136, 251, 1) 0%,
    rgba(102, 107, 255, 1) 93%
  );
}
</style>
