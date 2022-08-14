<template>
  <v-container fill-height align="center" justify="center">
    <v-row class="ml-3 mr-3">
      <v-progress-linear
        indeterminate
        color="teal"
        :active="show"
      ></v-progress-linear>
    </v-row>
    <v-form v-model="valid" ref="form" style="flex: 1">
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
import {parseISO, formatISO} from 'date-fns'
export default {
  name: "AccountForm",

  data() {
    return {
      user: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
      },
      userSnaphsot: {},
      menu: false,
      valid: true,
      editing: false,
      loading: false,
      rules: {
        required: (value) => !!value || "Field is required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      genders: [
        { id: 0, text: "Female" },
        { id: 1, text: "Male" },
        { id: 2, text: "Other" },
      ],
    };
  },
  mounted: function () {
    this.getProfile();
  },
  methods: {
    getProfile: function () {
      // this.show = true;
      // axios call
      this.show = false;
      this.user = {
        username: "naca-faca",
        email: "natasaivanovic98@yahoo.com",
        firstName: "Natasa",
        lastName: "Ivanovic",
        birthDate: "2022-02-01",
        gender: 0,
      };
    },
    startEditing: function () {
      this.userSnapshot = Object.assign({}, this.user);
      this.editing = true;
    },
    saveChanges: function () {
      let changedUser = Object.assign({}, this.user);
      console.log(changedUser);
      // axios call
      //   this.loading = true;
      //   this.axios({
      //     url: apiURL + "/details",
      //     method: "PUT",
      //     data: changedUser,
      //   }).then(() => {
      //     this.editing = false;
      //     this.loading = false;
      //   });
    },
    discardChanges: function () {
      this.user = Object.assign({}, this.userSnapshot);
      this.userSnapshot = {};
      this.editing = false;
    },
    convertToDateString: function (dateLong) {
      const date = new Date(dateLong);
      return formatISO(date)
    },
    convertToLong: function (dateStr) {
      const date = parseISO(dateStr)
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
