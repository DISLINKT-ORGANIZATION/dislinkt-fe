<template>
  <div class="comment-container">
    <template v-for="(comment, index) in comments">
      <comment v-bind:key="index" v-bind="comment" />
    </template>
    <create-comment />
  </div>
</template>
<script>
import Comment from "@/components/feed/Comment.vue";
import CreateComment from './CreateComment.vue';

export default {
  name: "CommentList",
  components: { Comment, CreateComment },
  props: {
    comments: Array,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.comment-container {
    
}
</style>
