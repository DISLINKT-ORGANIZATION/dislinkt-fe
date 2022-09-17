<template>
  <v-card class="mt-2 mb-2 pa-1 elevation-4" color="white" :width="`${postWidth}%`">
    <v-card-title>
      <v-list-item-avatar>
        <persona-avatar v-bind:fullname="firstName + ' ' + lastName"/>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title class="text-h6 my-font">
          {{firstName}} {{lastName}}
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
    <v-img v-if="image" :src="convertImage()"/>
    <v-card-actions>
      <v-list-item class="grow">
        <v-row align="center" justify="start">
          <v-btn class="mr-1" icon @click="thumbsUp()">
            <v-icon>
              {{ userLikesPost ? "mdi-thumb-up" : "mdi-thumb-up-outline" }}
            </v-icon>
          </v-btn>
          <span class="subheading mr-4">{{ postLikes }}</span>
          <v-btn class="mr-1" icon @click="thumbsDown()">
            <v-icon>
              {{
                userDislikesPost ? "mdi-thumb-down" : "mdi-thumb-down-outline"
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
    />
  </v-card>
</template>

<script>
import PersonaAvatar from "@/components/user/PersonaAvatar.vue";
import CommentList from "./CommentList.vue";

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
    postWidth: String
  },
  data() {
    return {
      postLikes: this.likes,
      postDislikes: this.dislikes,
      userLikesPost: false,
      userDislikesPost: false,
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
    convertImage() {
      return Buffer.from(this.image, 'base64').toString()
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
          `<a href="${url}">${word}</a>`
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
      if (this.userLikesPost) {
        this.userLikesPost = false;
        this.postLikes = this.postLikes - 1;
      } else {
        this.userLikesPost = true;
        this.postLikes = this.postLikes + 1;
        if (this.userDislikesPost) {
          this.postDislikes = this.postDislikes - 1;
          this.userDislikesPost = false;
        }
      }
    },
    thumbsDown: function () {
      if (this.userDislikesPost) {
        this.userDislikesPost = false;
        this.postDislikes = this.postDislikes - 1;
      } else {
        this.userDislikesPost = true;
        this.postDislikes = this.postDislikes + 1;
        if (this.userLikesPost) {
          this.postLikes = this.postLikes - 1;
          this.userLikesPost = false;
        }
      }
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
