<template>
  <v-container :class="allowCreatingPosts ? 'post-container' : 'view-container'" fluid>
    <create-post v-if="allowCreatingPosts" />
    <template v-for="(post, index) in posts">
      <post v-bind:key="index" v-bind="post" :postWidth="allowCreatingPosts ? '40' : '80'" />
    </template>
  </v-container>
</template>
<script>
import Post from "@/components/feed/Post.vue";
import CreatePost from "@/components/feed/CreatePost.vue";

export default {
  name: "PostList",
  components: { Post, CreatePost },
  props: {
    posts: Array,
    allowCreatingPosts: Boolean,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
  .post-container {
    /* background-color: rgba(220, 230, 233, 0.466); */
    background-color: #eceff1;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    /* max-height: calc(100vh - 175px); */
    margin: 0;
    max-height: calc(100vh - 90px);
  }
  .view-container {
    /* background-color: rgba(220, 230, 233, 0.466); */
    /* background-color: #eceff1; */
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    width: 100%;
    /* max-height: calc(100vh - 175px); */
    margin: 0;
    max-height: calc(100vh - 90px);
  }
  </style>
