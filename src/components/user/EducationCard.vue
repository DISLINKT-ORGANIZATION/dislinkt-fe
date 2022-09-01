<template>
  <v-container fill-height align="center" justify="center">
    <v-form v-model="valid" ref="form" style="flex: 1">
      <v-list>
        <div v-for="(e, idx) in education" :key="e.id">
          <v-card class="mb-5 card-color" elevation="0">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  v-text="e.school"
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
              <v-list-item-content style="flex: 4">
                <v-autocomplete
                  v-model="e.fieldOfStudy"
                  :items="fieldsOfStudy"
                  item-text="text"
                  item-value="id"
                  return-object
                  placeholder="Field of study"
                  :readonly="!editing"
                  :rules="[rules.required]"
                  prepend-icon="mdi-account-school"
                >
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
                <v-text-field
                  class="description"
                  style="font-size: 18px"
                  v-model="newElement.school"
                  label="School"
                  prepend-icon="mdi-school"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
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
                  v-model="newElement.fieldOfStudy"
                  :items="fieldsOfStudy"
                  placeholder="Field of study"
                  :rules="[rules.required]"
                  item-text="text"
                  item-value="id"
                  prepend-icon="mdi-account-school"
                />
              </v-list-item-content>
              <v-list-item-icon>
                <v-btn icon @click="addItem(newElement)">
                  <v-icon v-show="editing"> mdi-check </v-icon>
                </v-btn>
              </v-list-item-icon>
            </v-list-item>
          </v-card>
        </div>
        <v-row v-if="editable && !editing">
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
        <v-row v-if="editable && editing">
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
const apiURLEducation = "account-service/education/";

export default {
  name: "EducationCard",
  props: {
    userId: Number,
    editable: Boolean
  },
  data() {
    return {
      valid: true,
      education: [],
      startDateMenu: [],
      endDateMenu: [],
      startDateMenuEditing: false,
      endDateMenuEditing: false,
      fieldsOfStudy: [
        {
          text: "Bachelor",
          id: 1,
        },
        {
          text: "Master",
          id: 2,
        },
        {
          text: "PhD",
          id: 3,
        },
      ],
      rules: {
        required: (value) => !!value || "Field is required.",
      },
      editing: false,
      newElement: {
        id: 0,
        school: "",
        fieldOfStudy: 0,
        startDate: "",
        endDate: "",
      },
      loading: false
    };
  },
  mounted: function () {
    this.getUserEducation();
  },
  methods: {
    getUserEducation() {
      this.axios
        .get(apiURLEducation + this.userId)
        .then((response) => {
          console.log(response);
          this.education = response.data;
          this.education = this.education.sort(this.educationSort);
          this.education.forEach((e) => {
            e.startDate = this.convertToDateString(e.startDate);
            e.endDate = this.convertToDateString(e.endDate);
            e.fieldOfStudy = e.fieldOfStudy + 1;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItem(newItem) {
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
      if (this.education.length != 0)
        maxItemId = this.education.reduce((cur, max) =>
          cur.id > max.id ? cur : max
        ).id;
      const itemToAdd = Object.assign({}, newItem);
      itemToAdd.id = maxItemId + 1;
      this.newElement.id = 0;
      this.newElement.school = "";
      this.newElement.fieldOfStudy = 0;
      this.newElement.startDate = "";
      this.newElement.endDate = "";
      this.education.push(itemToAdd);
      this.$refs.form.resetValidation();
    },
    saveChanges() {
        this.loading = true;
        let changedEducation = this.education.map(el => {
            const newElement = {
                ...el,
                startDate: this.convertToLong(el.startDate),
                endDate: this.convertToLong(el.endDate),
                fieldOfStudy: el.fieldOfStudy - 1
            };
            return newElement;
        })
        this.axios({
            url: apiURLEducation + localStorage.getItem("id"),
            data: changedEducation,
            method: "PUT"
        })
        .then(() => {
            this.editing = false;
            this.loading = false;
            this.$root.snackbar.success("Successfully updated education");
        })
        .catch((error) => {
            this.loading = false;
            this.$root.snackbar.error(error.response.data);
        })
    },
    deleteItem(id) {
      console.log("delete item " + id);
      this.education = this.education.filter((item) => item.id != id);
    },
    startEditing() {
      this.snapshot = [];
      this.education.forEach((el) => {
        this.snapshot.push(Object.assign({}, el));
      });
      this.editing = true;
    },
    discardChanges() {
      this.education = Object.assign([], this.snapshot);
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
    educationSort: function (e1, e2) {
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
