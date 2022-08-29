<template>
  <v-container fill-height align="center" justify="center">
    <v-form ref="form" style="flex: 1">
      <v-textarea
        class="card-text ml-4 mr-4"
        v-model="biography"
        label="Biography..."
        full-width
        rows="12"
        single-line
        :readonly="!editing"
      ></v-textarea>
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
    </v-form>
  </v-container>
</template>

<script>
const apiURL = "account-service/accounts/user/";

export default {
  name: "BiographyCard",
  props: {
    userId: String,
    editable: Boolean,
  },
  data() {
    return {
      biography: "",
      newBiography: "",
      snapshot: "",
      loading: false,
      editing: false,
    };
  },
  mounted: function () {
    this.getUserAccount();
  },
  methods: {
    getUserAccount() {
      this.axios.get(apiURL + this.userId).then((response) => {
        this.biography = response.data.biography;
      });
    },
    startEditing() {
      this.snapshot = this.biography;
      this.editing = true;
    },
    discardChanges() {
      this.biography = this.snapshot;
      this.snapshot = "";
      this.editing = false;
    },
    saveChanges() {
      this.loading = true;
      this.axios({
        url: apiURL + this.userId + "/biography",
        data: { biography: this.biography },
        method: "PUT",
      })
        .then(() => {
          this.editing = false;
          this.loading = false;
          this.$root.snackbar.success("Successfully updated biography");
        })
        .catch((error) => {
          this.loading = false;
          this.$root.snackbar.error(error.response.data);
        });
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

.card-text >>> textarea {
  text-align: justify;
  font-family: "Baloo2", Helvetica, Arial;
  font-size: 18px;
}
</style>
