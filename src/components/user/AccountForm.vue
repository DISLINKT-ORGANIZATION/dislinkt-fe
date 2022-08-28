<template>
  <v-container fill-height align="center" justify="center">
    <v-row class="ml-3 mr-3">
      <v-progress-linear
        indeterminate
        color="teal"
        :active="show"
      ></v-progress-linear>
    </v-row>
    <v-form v-if="!show" v-model="valid" ref="form"  style="flex: 1">
      <v-row class="ml-5 mr-5 mt-5">
        <v-col class="pr-5">
          <v-text-field
            v-model="user.username"
            :rules="[rules.required]"
            label="Username"
            prepend-icon="mdi-account"
            type="text"
            class="description"
            :readonly="!editing"
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
            :readonly="!editing"
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
            :readonly="!editing"
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
            :readonly="!editing"
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
            :disabled="!editing"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :readonly="!editing"
                class="description"
                v-model="user.birthDate"
                label="Birthday"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
                :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker
              :readonly="!editing"
              class="description"
              style="font-size: 18px"
              v-model="user.birthDate"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <v-select
            :readonly="!editing"
            v-model="user.gender"
            :items="genders"
            class="description"
            label="Gender"
            item-value="id"
            item-name="text"
            prepend-icon="mdi-gender-transgender"
            :rules="[rules.required]"
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="!editing" class="ml-5 mr-5">
        <v-col>
          <v-btn
            color="#8C9EFF"
            @click="startEditing()"
            block
            class="description"
            style="font-size: 15px"
            :loading="loading"
            ><b>Edit details</b></v-btn
          >
        </v-col>
      </v-row>
      <v-row v-else class="ml-5 mr-5">
        <v-col>
          <v-btn
            color="success"
            @click="saveChanges()"
            block
            class="description"
            style="font-size: 15px"
            :loading="loading"
            ><b>Save changes</b></v-btn
          >
        </v-col>
        <v-col>
          <v-btn
            color="error"
            @click="discardChanges()"
            block
            class="description"
            style="font-size: 15px"
            :loading="loading"
            ><b>Discard changes</b></v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import moment from 'moment';

const apiURLGet = "auth-service/authentication/users/";
const apiURLPut = "auth-service/authentication/users/update-person";

export default {
  name: "AccountForm",

  data() {
    return {
      user: {
        username: String,
        email: String,
        firstName: String,
        lastName: String,
        birthDate: Number,
        gender: Number,
      },
      userSnaphsot: {},
      menu: false,
      valid: true,
      editing: false,
      loading: false, //button
      show: true, //spinner
      rules: {
        required: (value) => !!value || "Field is required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      genders: [
        { id: 1, text: "Female" },
        { id: 2, text: "Male" },
        { id: 3, text: "Other" },
      ],
    };
  },
  mounted: function () {
    this.getProfile();
  },
  methods: {
    getProfile: function () {
      let userId = localStorage.getItem("id");
      this.axios
        .get(apiURLGet + userId)
        .then((response) => {
          console.log(response);
          this.user = {
            ...response.data,
            birthDate: this.convertToDateString(response.data.birthDate),
            gender: response.data.gender + 1,
          };
          this.show = false;
        })
        .catch((error) => {
          this.$root.snackbar.error(error.response.data.message);
          this.show = false;
        });
    },
    startEditing: function () {
      this.userSnapshot = Object.assign({}, this.user);
      this.editing = true;
    },
    saveChanges: function () {
      this.loading = true;
      let changedUser = Object.assign({}, this.user);
      changedUser = {
        ...changedUser,
        birthDate: this.convertToLong(changedUser.birthDate),
        gender: changedUser.gender - 1,
      };
      this.axios({
        url: apiURLPut,
        data: changedUser,
        method: "PUT",
      })
        .then((response) => {
          console.log(response);
          let token = response.data.token;
          if (token) {
            localStorage.setItem("token", token);
            this.axios.defaults.headers['Authorization'] = `Bearer ${token}` ;
          }
          this.editing = false;
          this.loading = false;
          this.$root.snackbar.success("Successfully updated account");
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.$root.snackbar.error(error.response.data);
        });
    },
    discardChanges: function () {
      this.user = Object.assign({}, this.userSnapshot);
      this.userSnapshot = {};
      this.editing = false;
    },
    convertToDateString: function (dateLong) {
      return moment(dateLong).format("YYYY-MM-DD");
    },
    convertToLong: function (dateStr) {
      const date = moment(dateStr, "YYYY-MM-DD").toDate();
      return date.getTime();
    },
  },
};
</script>

<style scoped>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 18px;
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