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
        <v-list>
          <v-list-item v-for="p in proficiencies" :key="p.id">
            <v-list-item-avatar>
              <v-img :src="getPicture(p.type)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="p.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-content style="flex: 2">
              <v-slider
                v-model="p.proficiency"
                :tick-labels="labels"
                min="1"
                max="5"
                ticks="always"
                tick-size="5"
                :readonly="!editing"
              >
              </v-slider>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn :disabled="!editing" icon @click="deleteItem(p.id)">
                <v-icon v-show="editing"> mdi-delete </v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item v-if="editing">
            <v-list-item-avatar>
              <v-img :src="getPicture(newElement.type)"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-autocomplete
                v-model="newElement.type"
                placeholder="Type"
                :items="cvElementTypes"
              />
            </v-list-item-content>

            <v-list-item-content class="ml-2">
              <v-autocomplete
                v-model="newElement.name"
                placeholder="Element"
                :items="getElementsForType(newElement.type)"
                item-text="name"
                item-value="value"
                :rules="[rules.required]"
              />
            </v-list-item-content>

            <v-list-item-content class="ml-2">
              <v-autocomplete
                v-model="newElement.proficiency"
                placeholder="Proficiency"
                :items="possibleProficiencies"
                :rules="[rules.required]"
              >
              </v-autocomplete>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn icon @click="addItem(newElement)">
                <v-icon> mdi-check </v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
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
const apiURL = "/api/users/my-profile/resume";

export default {
  name: "SkillCard",
  data() {
    return {
      valid: true,
      loading: false,
      editing: false,
      proficiencies: [],
      show: false,
      rules: {
        required: (value) => !!value || "Field is required.",
      },
      labels: ["Basic", "Good", "Very good", "Excellent", "Expert"],
      newElement: {
        type: "PROGRAMMING_LANGUAGE",
        name: "",
        id: 0,
        proficiency: 0,
      },
      cvElements: {},
      cvElementTypes: [
        {
          text: "Programming language",
          value: "PROGRAMMING_LANGUAGE",
        },
        {
          text: "Technology",
          value: "TECHNOLOGY",
        },
        {
          text: "Language",
          value: "LANGUAGE",
        },
        {
          text: "Soft skill",
          value: "SOFT_SKILL",
        },
      ],
      possibleProficiencies: [
        {
          text: "Basic",
          value: "1",
        },
        {
          text: "Good",
          value: "2",
        },
        {
          text: "Very good",
          value: "3",
        },
        {
          text: "Excellent",
          value: "4",
        },
        {
          text: "Expert",
          value: "5",
        },
      ],
    };
  },
  mounted: function () {
    this.getUserSkills();
    this.getAllSkillElements();
  },
  methods: {
    getUserSkills: function () {
      this.proficiencies = [
        {
          type: "PROGRAMMING_LANGUAGE",
          name: "JavaScript",
          id: 1,
          proficiency: 3,
        },
        {
          type: "PROGRAMMING_LANGUAGE",
          name: "Java",
          id: 2,
          proficiency: 4,
        },
        {
          type: "LANGUAGE",
          name: "English",
          id: 3,
          proficiency: 2,
        },
      ];
      this.show = false;
      // todo: axios get all proficiencies
    },
    getAllSkillElements: function () {
      this.cvElements = {
        PROGRAMMING_LANGUAGE: [
          { id: 1, name: "JavaScript", type: "PROGRAMMING_LANGUAGE" },
          { id: 2, name: "Java", type: "PROGRAMMING_LANGUAGE" },
        ],
        LANGUAGE: [{ id: 3, name: "English", type: "LANGUAGE" }],
      };
      // this.show = true;
      // todo: axios get all cv elements
    },
    proficiencyEnumToNumber: function (enumValue) {
      switch (enumValue) {
        case "BASIC":
          return 1;
        case "GOOD":
          return 2;
        case "VERY_GOOD":
          return 3;
        case "EXCELLENT":
          return 4;
        case "EXPERT":
          return 5;
      }
    },
    getPicture: function (type) {
      switch (type) {
        case "PROGRAMMING_LANGUAGE":
          return require("@/assets/icon-small-prog-lang.png");
        case "TECHNOLOGY":
          return require("@/assets/icon-small-technology.png");
        case "LANGUAGE":
          return require("@/assets/icon-small-language.png");
        case "SOFT_SKILL":
          return require("@/assets/icon-small-soft-skill.png");
      }
    },
    getElementsForType: function (type) {
      console.log(this.cvElements)
      console.log(type)
      const elements = this.cvElements[type];
      console.log(elements)
      const availableElements = elements.filter((el) => {
        let exists = false;
        this.proficiencies.forEach((p) => {
          if (p.name == el.name) exists = true;
        });
        return !exists;
      });
      console.log(availableElements)
      return availableElements;
    },
    addItem: function (newItem) {
      this.$refs.form.validate();
      if (!this.valid) {
        return;
      }
      const itemId = this.cvElements[newItem.type].find(
        (el) => el.name == newItem.name
      ).id;
      const itemToAdd = Object.assign({}, newItem);
      itemToAdd.id = (itemId - 1) * 5 + parseInt(newItem.proficiency);
      // reset newItem
      this.newElement.type = "PROGRAMMING_LANGUAGE";
      this.newElement.name = "";
      this.newElement.proficiency = 0;
      this.proficiencies.push(itemToAdd);
      this.$refs.form.resetValidation();
    },
    deleteItem: function (id) {
      this.proficiencies = this.proficiencies.filter((item) => item.id != id);
    },
    startEditing: function () {
      this.profSnapshot = [];
      this.proficiencies.forEach((el) => {
        this.profSnapshot.push(Object.assign({}, el));
      });
      this.editing = true;
    },
    saveChanges: function () {
      let changedProf = Object.assign([], this.proficiencies);
      this.loading = true;
      this.axios({
        url: apiURL,
        method: "PUT",
        data: { proficiencies: changedProf },
      }).then(() => {
        this.proficiencies.sort(this.elementTypeSort);
        this.editing = false;
        this.loading = false;
      });
    },
    discardChanges: function () {
      this.proficiencies = Object.assign([], this.profSnapshot);
      this.profSnapshot = [];
      this.editing = false;
    },
    elementTypeEnumToNumber: function (enumValue) {
      switch (enumValue) {
        case "PROGRAMMING_LANGUAGE":
          return 0;
        case "TECHNOLOGY":
          return 1;
        case "LANGUAGE":
          return 2;
        case "SOFT_SKILL":
          return 3;
      }
    },
    elementTypeSort: function (e1, e2) {
      if (e1.type == e2.type) {
        return e1.name > e2.name ? 1 : -1;
      } else {
        return this.elementTypeEnumToNumber(e1.type) >
          this.elementTypeEnumToNumber(e2.type)
          ? 1
          : -1;
      }
    },
  },
};
</script>

<style scoped>
.description {
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 18px;
}
</style>