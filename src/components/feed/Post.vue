<template>
  <v-card
    class="mt-2 mb-2 pa-1 elevation-4"
    color="white"
    :width="`${postWidth}%`"
  >
    <v-card-title>
      <v-list-item-avatar>
        <persona-avatar v-bind:fullname="firstName + ' ' + lastName" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="text-h6 my-font">
          {{ firstName }} {{ lastName }}
        </v-list-item-title>
      </v-list-item-content>
    </v-card-title>

    <v-card-text class="card-content my-font font-weight-bold text-justify">
      <span v-html="renderContent()" />
      <span
        v-if="contentShouldWrap"
        v-on:click="toggleShowContent()"
        class="see-more"
        >{{ this.showFullContent ? "...see less" : "...see more" }}</span
      >
    </v-card-text>
    <v-img v-if="image" :src="convertImage()" />
    <v-card-actions>
      <v-list-item class="grow">
        <v-row align="center" justify="start">
          <v-btn
            :disabled="!userIsLoggedIn()"
            class="mr-1"
            icon
            @click="thumbsUp()"
          >
            <v-icon>
              {{
                userLikesPostStatus ? "mdi-thumb-up" : "mdi-thumb-up-outline"
              }}
            </v-icon>
          </v-btn>
          <span class="subheading mr-4">{{ postLikes }}</span>
          <v-btn
            :disabled="!userIsLoggedIn()"
            class="mr-1"
            icon
            @click="thumbsDown()"
          >
            <v-icon>
              {{
                userDislikesPostStatus
                  ? "mdi-thumb-down"
                  : "mdi-thumb-down-outline"
              }}
            </v-icon>
          </v-btn>
          <span class="subheading mr-4">{{ postDislikes }}</span>
          <v-spacer />
          <v-btn class="mr-1" icon @click="toggleShowComments()">
            <v-icon>
              {{ showComments ? "mdi-comment" : "mdi-comment-outline" }}
            </v-icon>
          </v-btn>
          <span class="subheading">{{ comments.length }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
    <comment-list
      v-if="showComments"
      class="comment-section"
      v-bind:comments="comments"
      v-bind:postId="id"
    />
  </v-card>
</template>

<script>
import PersonaAvatar from "@/components/user/PersonaAvatar.vue";
import CommentList from "./CommentList.vue";

const postApi = "post-service/posts/";
const wrapNumberOfWords = 50;

export default {
  name: "Post",
  components: {
    PersonaAvatar,
    CommentList,
  },
  props: {
    id: String,
    firstName: String,
    lastName: String,
    text: String,
    likes: Number,
    dislikes: Number,
    comments: Array,
    image: String,
    postWidth: String,
    userLikesPost: Boolean,
    userDislikesPost: Boolean,
  },
  data() {
    return {
      postLikes: this.likes,
      postDislikes: this.dislikes,
      userLikesPostStatus: this.userLikesPost,
      userDislikesPostStatus: this.userDislikesPost,
      showFullContent: false,
      showComments: false,
      formattedContent: "",
      contentShouldWrap: false,
      urlList: [], // list of objects with {word, url}
    };
  },
  mounted: function () {
    let replacedString = this.text;
    let urlCounter = 0;
    this.urlList = [];
    /* eslint-disable no-constant-condition */
    while (true) {
      // try to find [] pair
      const startIndx = replacedString.indexOf("[");
      const separatorIndx = replacedString.indexOf("|");
      const endIndx = replacedString.indexOf("]");
      if (startIndx === -1 || separatorIndx === -1 || endIndx === -1) {
        break;
      }
      const word = replacedString.slice(startIndx + 1, separatorIndx);
      const url = replacedString.slice(separatorIndx + 1, endIndx);
      this.urlList.push({ word, url });
      replacedString =
        replacedString.slice(0, startIndx) +
        `{url-${urlCounter}}` +
        replacedString.slice(endIndx + 1);
      urlCounter += 1;
    }
    if (replacedString.split(" ").length > wrapNumberOfWords) {
      this.contentShouldWrap = true;
    }
    this.formattedContent = replacedString;
  },
  methods: {
    userIsLoggedIn() {
      return localStorage.getItem("id") !== null;
    },
    convertImage() {
      return Buffer.from(this.image, "base64").toString();
    },
    renderContent: function () {
      let contentPreFormat = this.formattedContent;
      if (this.contentShouldWrap && !this.showFullContent) {
        contentPreFormat = contentPreFormat
          .split(" ")
          .slice(0, wrapNumberOfWords)
          .join(" ");
      }
      this.urlList.forEach(({ word, url }, indx) => {
        contentPreFormat = contentPreFormat.replace(
          `{url-${indx}}`,
          `<a target="_blank" href="${url}">${word}</a>`
        );
      });
      return contentPreFormat;
    },
    toggleShowComments: function () {
      this.showComments = !this.showComments;
    },
    toggleShowContent: function () {
      this.showFullContent = !this.showFullContent;
    },
    thumbsUp: function () {
      if (this.userLikesPostStatus) {
        this.userLikesPostStatus = false;
        this.postLikes = this.postLikes - 1;
        this.sendReaction(0, true);
      } else {
        this.userLikesPostStatus = true;
        this.postLikes = this.postLikes + 1;
        if (this.userDislikesPostStatus) {
          this.postDislikes = this.postDislikes - 1;
          this.userDislikesPostStatus = false;
        }
        this.sendReaction(0, false);
      }
    },
    thumbsDown: function () {
      if (this.userDislikesPostStatus) {
        this.userDislikesPostStatus = false;
        this.postDislikes = this.postDislikes - 1;
        this.sendReaction(1, true);
      } else {
        this.userDislikesPostStatus = true;
        this.postDislikes = this.postDislikes + 1;
        if (this.userLikesPostStatus) {
          this.postLikes = this.postLikes - 1;
          this.userLikesPostStatus = false;
        }
        this.sendReaction(1, false);
      }
    },
    sendReaction(reactionType, deletion) {
      this.axios
        .post(postApi + this.id + "/reaction", {
          userId: localStorage.getItem("id"),
          reaction: reactionType,
          removeReaction: deletion,
        })
        .catch((error) => {
          console.log(error);
          this.$root.snackbar.error();
        });
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
  margin-left: 8px;
}
</style>
