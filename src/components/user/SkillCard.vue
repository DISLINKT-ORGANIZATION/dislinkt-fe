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
            <v-list-item-title v-text="p.name" class="text"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-content style="flex: 2">
            <v-slider
              v-model="p.skillProficiency"
              :tick-labels="labels"
              min="1"
              max="5"
              ticks="always"
              tick-size="5"
              class="text"
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
              class="text"
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
              class="text"
            />
          </v-list-item-content>

          <v-list-item-content class="ml-2">
            <v-autocomplete
              v-model="newElement.skillProficiency"
              placeholder="Proficiency"
              :items="possibleProficiencies"
              :rules="[rules.required]"
              class="text"
            >
            </v-autocomplete>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn icon @click="addItem(newElement)">
              <v-icon> mdi-check </v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-row v-if="editable && !editing">
          <v-col>
            <v-btn
              color="#8C9EFF"
              @click="startEditing()"
              block
              class="text"
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
              class="text"
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
              class="text"
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
const apiURLGetAllProficiencies = "account-service/skill-proficiencies/type";
const apiURLGetResume = "account-service/accounts/user/";
const apiURLUpdateProfs = "account-service/skill-proficiencies/user/";

export default {
  name: "SkillCard",
  props: {
    userId: String,
    editable: Boolean
  },
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
        type: 0,
        name: "",
        id: 0,
        skillProficiency: 0,
      },
      cvElements: {},
      cvElementTypes: [
        {
          text: "Programming language",
          value: 0,
        },
        {
          text: "Technology",
          value: 1,
        },
        {
          text: "Knowledge",
          value: 2,
        },
        {
          text: "Language",
          value: 3,
        },
        {
          text: "Soft skill",
          value: 4,
        },
      ],
      possibleProficiencies: [
        {
          text: "Basic",
          value: 1,
        },
        {
          text: "Good",
          value: 2,
        },
        {
          text: "Very good",
          value: 3,
        },
        {
          text: "Excellent",
          value: 4,
        },
        {
          text: "Expert",
          value: 5,
        },
      ],
    };
  },
  mounted: function () {
    this.getUserAccount();
    this.getAllSkillElements();
  },
  methods: {
    getUserAccount: function () {
      this.show = true;
      this.axios.get(
        apiURLGetResume + this.userId
      ).then((response) => {
        this.proficiencies = response.data.skills;
        this.proficiencies.forEach((p) => {
          p.skillProficiency = p.skillProficiency + 1;
        });
        this.proficiencies.sort(this.elementTypeSort);
        this.show = false;
      })
    },
    getAllSkillElements: function () {
      this.show = true;
      this.axios.get(apiURLGetAllProficiencies)
        .then((response) => {
          this.cvElements = response.data;
          this.show = false;
        })
        .catch((error) => {
          this.$root.snackbar.error(error.response.data.message);
        });
    },

    getElementsForType: function (type) {
      const elements = this.cvElements[type];
      const availableElements = elements.filter((el) => {
        let exists = false;
        this.proficiencies.forEach((p) => {
          if (p.name == el.name) exists = true;
        });
        return !exists;
      });
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
      itemToAdd.id = (itemId - 1) * 5 + parseInt(newItem.skillProficiency);
      // reset newItem
      this.newElement.type = 0;
      this.newElement.name = "";
      this.newElement.skillProficiency = 0;
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
        url: apiURLUpdateProfs + this.userId,
        method: "PUT",
        data: changedProf,
      }).then(() => {
        this.proficiencies.sort(this.elementTypeSort);
        this.editing = false;
        this.loading = false;
        this.$root.snackbar.success("Successfully updated skills");
      });
    },

    discardChanges: function () {
      this.proficiencies = Object.assign([], this.profSnapshot);
      this.profSnapshot = [];
      this.editing = false;
    },
    
    elementTypeSort: function (e1, e2) {
      if (e1.type == e2.type) {
        return e1.name > e2.name ? 1 : -1;
      } else {
        return e1.type > e2.type ? 1 : -1;
      }
    },

    getPicture: function (type) {
      switch (type) {
        case 0:
          return require("@/assets/icon-small-prog-lang.png");
        case 1:
          return require("@/assets/icon-small-technology.png");
        case 2:
          return require("@/assets/icon-small-knowledge.png");
        case 3:
          return require("@/assets/icon-small-language.png");
        case 4:
          return require("@/assets/icon-small-soft-skill.png");
      }
    },
  },
};
</script>

<style scoped>
.text {
  font-family: "Baloo2", Helvetica, Arial;
}
</style>
