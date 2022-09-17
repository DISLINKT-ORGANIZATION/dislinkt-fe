<template>
  <v-card class="mt-2 mb-2 pa-1" color="white" width="40%">
    <!-- <v-card-title>
      <v-list-item-avatar>
        <persona-avatar v-bind:fullname="name" v-bind:url="avatar" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="text-h6 my-font">{{
          name
        }}</v-list-item-title>
      </v-list-item-content>
    </v-card-title> -->

    <v-card-text class="card-content my-font font-weight-bold">
      <v-row no-gutters dense class="mt-2">
        <v-col cols="12">
          <v-textarea
            rows="3"
            v-model="postContent"
            class="chat-field"
            filled
            rounded
            no-resize
            placeholder="What's on your mind?"
          >
          </v-textarea>
        </v-col>
      </v-row>
      <v-row v-if="pictures.length !== 0" class="ml-1">
        <div
          v-for="(pic, indx) in pictures"
          v-bind:key="indx"
          class="mr-1 mt-1"
        >
          <v-hover v-slot="{ hover }">
            <v-img
              :src="pic"
              class="image-placerholder"
              min-height="100"
              max-height="100"
              min-width="150"
              max-width="150"
            >
              <v-overlay :absolute="true" :value="hover" opacity="0.3">
                <v-btn color="white" x-large icon @click="removePicture(indx)">
                  <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
              </v-overlay>
            </v-img>
          </v-hover>
        </div>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-row align="center" justify="start">
          <v-btn
            class="mr-5 ml-2"
            outlined
            :loading="isSelectingPic"
            @click="handleFileImport"
          >
            <v-icon class="mr-2">mdi-file-image-plus</v-icon>
            <span>Add image</span>
          </v-btn>
          <input
            ref="uploader"
            class="d-none"
            type="file"
            accept="image/*"
            @change="onFileChanged"
          />
          <v-dialog v-model="urlDialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mr-1" outlined v-on="on" v-bind="attrs">
                <v-icon class="mr-2">mdi-link</v-icon>
                <span>Add link</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Add link</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Text"
                        v-model="urlText"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Url"
                        v-model="urlAddress"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="urlDialog = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="addLink">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-spacer />
          <v-btn
            color="indigo accent-1"
            class="mr-2"
            outlined
            @click="submitPost()"
          >
            Post
            <v-icon class="send-icon ml-2 mr-0">mdi-send</v-icon>
          </v-btn>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
const postApi = "post-service/posts";
const accountApi = "account-service/connections/";
const muteApi = "account-service/connections/check-muted-posts/";

export default {
  name: "CreatePost",
  components: {},
  data() {
    return {
      postContent: "",
      urlDialog: false,
      urlText: "",
      urlAddress: "",
      isSelectingPic: false,
      pictures: [],
      pictureData: [],
      showPictureOverlay: [],
      userId: localStorage.getItem("id"),
    };
  },
  methods: {
    submitPost: async function () {
      if (this.postContent.length === 0) {
        return;
      }
      const usersToNotify = await this.getNonMutedConnections();
      let postObj = {
        userId: Number(this.userId),
        text: this.postContent,
        usersToNotify: usersToNotify
      };
      let formData = new FormData();
      formData.append(
        "body",
        new Blob([JSON.stringify(postObj)], { type: "application/json" })
      );
      let picture = {};
      if (this.pictures.length) {
        picture = this.pictures[0];
      } else {
        picture = new Blob();
      }
      formData.append("picture", new Blob([picture]));
      this.axios
        .post(postApi, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          this.$router.push({
            name: "ProfileView",
            params: { id: this.userId },
          });
        });
    },
    handleFileImport: function () {
      // from https://ourcodeworld.com/articles/read/1424/how-to-use-a-button-as-a-file-uploader-with-vuetify-in-vuejs#disqus_thread
      this.isSelectingPic = true;

      // After obtaining the focus when closing the FilePicker, return the button state to normal
      window.addEventListener(
        "focus",
        () => {
          this.isSelectingPic = false;
        },
        { once: true }
      );

      // Trigger click on the FileInput
      this.$refs.uploader.click();
    },
    onFileChanged: function (e) {
      // from https://stackoverflow.com/questions/53991010/how-to-show-images-before-uploading-them-in-vue-js
      let newImage = e.target.files[0];
      if (!newImage.type.match("image.*")) {
        return;
      }
      this.pictureData.push(newImage);

      let reader = new FileReader();
      reader.onload = (e) => {
        this.pictures.push(e.target.result);
        console.log(e.target.result);
      };
      reader.readAsDataURL(newImage);
    },
    removePicture: function (indx) {
      this.pictures = [
        ...this.pictures.slice(0, indx),
        ...this.pictures.slice(indx + 1),
      ];
      this.pictureData = [
        ...this.pictureData.slice(0, indx),
        ...this.pictureData.slice(indx + 1),
      ];
    },
    cancelAddLink: function () {
      this.urlDialog = false;
      (this.urlText = ""), (this.urlAddress = "");
    },
    addLink: function () {
      const urlString = ` [${this.urlText}|${this.urlAddress}]`;
      this.postContent = this.postContent + urlString;
      this.urlDialog = false;
      this.urlText = "";
      this.urlAddress = "";
    },
    async getNonMutedConnections() {
      const connectionUserIds = (
        await this.axios.get(accountApi + this.userId)
      ).data.map((e) => e.userConnectionId);
      const promiseList = [];
      connectionUserIds.forEach((userId) => {
        promiseList.push(this.axios.get(muteApi + userId + "/" + this.userId));
      });
      const responses = await Promise.all(promiseList);
      const usersToNotify = []
      responses.forEach((response, indx) => {
        if (!response.data) {
          usersToNotify.push(connectionUserIds[indx]);
        }
      });
      console.log(usersToNotify);
      return usersToNotify;
    },
  },
};
</script>
<style scoped>
.card-content {
  font-size: 20px;
}

.see-more {
  color: rgb(160, 160, 160);
  font-size: 16px;
  cursor: pointer;
  font-weight: 150;
}

.image-placerholder {
  border: 1px black solid;
  border-radius: 5px;
}
</style>
