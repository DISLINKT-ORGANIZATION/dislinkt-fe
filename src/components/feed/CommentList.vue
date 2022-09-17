<template>
  <div class="comment-container">
    <template v-for="(comment, index) in newComments">
      <comment v-bind:key="index" v-bind="comment" />
    </template>
    <create-comment v-bind:handleCommentAdded="handleCommentAdded" v-bind:postId="postId"/>
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
    postId: String
  },
  data() {
    return {
      newComments: [...this.comments]
    };
  },
  methods: {
    handleCommentAdded(comment) {
      this.newComments = [...this.newComments, comment];
    }
  }
};
</script>

<style scoped>
.comment-container {
    
}
</style>
