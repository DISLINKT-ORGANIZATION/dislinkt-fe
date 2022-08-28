<template>
  <v-container fill-height align="center" justify="center">
    <v-form v-model="valid" ref="form" style="flex: 1">
      <v-list>
        <div v-for="e, idx in experience" :key="e.id">
          <v-card class="mb-5 card-color" elevation="0">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  v-text="e.positionTitle"
                  class="position-title"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content style="flex: 2">
                <v-menu
                  v-model="startDateMenu[idx]"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  :disabled="!editing"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="description"
                      style="font-size: 18px"
                      v-model="e.startDate"
                      label="Start date"
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
                    v-model="e.startDate"
                    @input="startDateMenu[idx] = false"
                  ></v-date-picker>
                </v-menu>
              </v-list-item-content>
              <v-list-item-content style="flex: 2">
                <v-menu
                  v-model="endDateMenu[idx]"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                  :disabled="!editing"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="description"
                      style="font-size: 18px"
                      v-model="e.endDate"
                      label="End date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="description"
                    style="font-size: 18px"
                    v-model="e.endDate"
                    @input="endDateMenu[idx] = false"
                  ></v-date-picker>
                </v-menu>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content style="flex: 2">
                <v-slider
                  v-model="e.seniority"
                  :tick-labels="labels"
                  min="1"
                  max="3"
                  ticks="always"
                  tick-size="3"
                  :readonly="!editing"
                >
                </v-slider>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content style="flex: 4">
                <v-autocomplete
                  v-model="e.skills"
                  :items="skills"
                  item-text="name"
                  return-object
                  multiple
                  :readonly="!editing"
                  :rules="[rules.nonEmptyArray]"
                >
                  <template v-slot:item="data">
                    {{ data.item.name + " (" + data.item.group + ")" }}
                  </template>
                </v-autocomplete>
              </v-list-item-content>
              <v-list-item-icon>
                <v-btn :disabled="!editing" icon @click="deleteItem(e.id)">
                  <v-icon v-show="editing"> mdi-delete </v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
          </v-card>
        </div>

        <div v-if="editing">
          <v-card class="mb-5 card-color" elevation="0">
            <v-list-item>
              <v-list-item-content style="flex: 2">
                <v-menu
                  v-model="startDateMenuEditing"
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
                      v-model="newElement.startDate"
                      label="Start date"
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
                    v-model="newElement.startDate"
                    @input="startDateMenuEditing = false"
                  ></v-date-picker>
                </v-menu>
              </v-list-item-content>
              <v-list-item-content style="flex: 2">
                <v-menu
                  v-model="endDateMenuEditing"
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
                      v-model="newElement.endDate"
                      label="End date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    class="description"
                    style="font-size: 18px"
                    v-model="newElement.endDate"
                    @input="endDateMenuEditing = false"
                  ></v-date-picker>
                </v-menu>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-autocomplete
                  v-model="newElement.positionId"
                  :items="jobPositions"
                  placeholder="Job title"
                  :rules="[rules.required]"
                  item-text="title"
                  item-value="id"
                />
              </v-list-item-content>
              <v-list-item-content style="flex: 2" class="ml-2">
                <v-slider
                  v-model="newElement.seniority"
                  :tick-labels="labels"
                  min="1"
                  max="3"
                  ticks="always"
                  tick-size="3"
                  :readonly="!editing"
                >
                </v-slider>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content style="flex: 4">
                <v-autocomplete
                  placeholder="Used skills"
                  v-model="newElement.skills"
                  :items="skills"
                  item-text="name"
                  return-object
                  multiple
                  :rules="[rules.nonEmptyArray]"
                  :readonly="!editing"
                >
                  <template v-slot:item="data">
                    {{ data.item.name }}
                  </template>
                </v-autocomplete>
              </v-list-item-content>
              <v-list-item-icon>
                <v-btn icon @click="addItem(newElement)">
                  <v-icon v-show="editing"> mdi-check </v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
          </v-card>
        </div>
        <v-row v-if="!editing">
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
        <v-row v-else>
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
      </v-list>
    </v-form>
  </v-container>
</template>

<script>
import moment from 'moment';
const apiURLGetResume = "account-service/accounts/user/";
const apiURLGetAllProficiencies = "account-service/skill-proficiencies";
const apiURLGetAllJobPositions = "account-service/job-positions";
const apiURLUpdateExperience = "account-service/working-experience/";

export default {
  name: "WorkingExperienceCard",
  data() {
    return {
      valid: true,
      experience: [],
      editing: false,
      rules: {
        required: (value) => !!value || "Field is required.",
        nonEmptyArray: (value) =>
          value.length > 0 || "You must select at least one skill.",
      },
      labels: ["Junior", "Medior", "Senior"],
      skills: [],
      startDateMenu: [],
      endDateMenu: [],
      startDateMenuEditing: false,
      endDateMenuEditing: false,
      newElement: {
        id: 0,
        startDate: "",
        endDate: "",
        seniority: 0,
        positionTitle: "",
        positionId: 0,
        skills: [],
      },
      jobPositions: [],
      loading: false,
    };
  },
  mounted: function () {
    this.getUserAccount();
    this.getAllSkills();
    this.getAllJobPositions();
  },
  methods: {
    getUserAccount() {
      console.log("get experience");
      this.axios
        .get(apiURLGetResume + localStorage.getItem("id"))
        .then((response) => {
          this.experience = response.data.workingExperience.sort(this.experienceSort);
          this.experience.forEach((ex) => {
            ex.startDate = this.convertToDateString(ex.startDate);
            ex.endDate = this.convertToDateString(ex.endDate);
            ex.seniority = ex.seniority + 1;
          });
        });
    },
    getAllSkills() {
      console.log("get all skills");
      this.axios
        .get(apiURLGetAllProficiencies)
        .then((response) => {
          this.skills = response.data;
        })
        .catch((error) => {
          this.$root.snackbar.error(error.response.data.message);
        });
    },
    getAllJobPositions() {
      console.log("get all job positions");
      this.axios
        .get(apiURLGetAllJobPositions)
        .then((response) => {
          this.jobPositions = response.data;
        })
        .catch((error) => {
          this.$root.snackbar.error(error.response.data.message);
        });
    },
    addItem(newItem) {
      console.log(newItem);
      this.$refs.form.validate();
      if (!this.valid) {
        return;
      }
      let startDate = this.convertToLong(newItem.startDate);
      let endDate = this.convertToLong(newItem.endDate);
      if (endDate != -1 && endDate < startDate) {
        this.$root.snackbar.error("End date must be after start date");
        return;
      }
      let maxItemId = 1;
      if (this.experience.length != 0)
        maxItemId = this.experience.reduce((cur, max) =>
          cur.id > max.id ? cur : max
        ).id;
      const itemToAdd = Object.assign({}, newItem);
      itemToAdd.id = maxItemId + 1;
      itemToAdd.positionTitle = this.jobPositions.find(
        (e) => e.id === itemToAdd.positionId
      ).title;
      // reset newItem
      this.newElement.id = 0;
      this.newElement.seniority = 1;
      this.newElement.positionTitle = "";
      this.newElement.positionId = 0;
      this.newElement.startDate = "";
      this.newElement.endDate = "";
      this.newElement.skills = [];
      this.experience.push(itemToAdd);
      this.$refs.form.resetValidation();
    },
    deleteItem(id) {
      console.log("delete item " + id);
      this.experience = this.experience.filter((item) => item.id != id);
    },
    startEditing() {
      this.snapshot = [];
      this.experience.forEach((el) => {
        this.snapshot.push(Object.assign({}, el));
      });
      this.editing = true;
    },
    saveChanges() {
      this.loading = true;
      let changedExperience = this.experience.map(el => {
        const newElement = {...el, 
          startDate: this.convertToLong(el.startDate),
          endDate: this.convertToLong(el.endDate),
          seniority: el.seniority - 1 }
          console.log(newElement);
          return newElement;
      });
      this.axios({
        url: apiURLUpdateExperience + localStorage.getItem("id"),
        data: changedExperience,
        method: "PUT",
      })
      .then(() => {
        this.editing = false;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
        this.$root.snackbar.error(error.response.data);
      });
    },
    discardChanges() {
      this.experiences = Object.assign([], this.snapshot);
      this.snapshot = [];
      this.editing = false;
    },
    convertToDateString(dateLong) {
      if (dateLong == -1) {
        return "";
      }
      return moment(dateLong).format("YYYY-MM-DD");
    },
    convertToLong(dateStr) {
      if (!dateStr) {
        return -1;
      }
      const date = moment(dateStr, "YYYY-MM-DD").toDate();
      return date.getTime();
    },
    experienceSort: function (e1, e2) {
      return e2.startDate - e1.startDate;
    },
  },
};
</script>

<style scoped>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 18px;
}

.position-title {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 25px;
}

.card-color {
  background-color: #f4f6f8;
  border: rgb(187, 182, 182) 1px solid !important;
}
</style>
