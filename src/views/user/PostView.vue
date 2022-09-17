<template lang="">
  <post-list v-bind:posts="posts" :allowCreatingPosts="false" />
</template>

<script>
import PostList from "@/components/feed/PostList.vue";

const accountApi = "account-service/connections/";
const usersApi = "auth-service/authentication/users/ids";
const postsApi = "post-service/posts/all";

export default {
  name: "PostView",
  props: {
    userId: Number,
  },
  components: {
    PostList,
  },
  data: function () {
    return {
      posts: [],
      loggedInUserId: localStorage.get("id")
    };
  },
  async mounted() {
    this.getFeed();
  },
  watch: {
    userId() {
      this.getFeed();
    }
  },
  methods: {
    async getFeed() {
      // get blocked users
      const blockedAccountResponse = await this.getBlockedAccounts();
      const usersBlockedIds = blockedAccountResponse.data.map(
        (e) => e.userId
      );
      // get posts
      const postResponse = await this.getPosts([this.userId]);
      const posts = postResponse.data;
      const commentUserIds = [this.userId];
      posts.forEach((post) => {
        post.comments.forEach((comment) => {
          if (!commentUserIds.includes(comment.userId)) {
            commentUserIds.push(comment.userId);
          }
        });
      });
      const commentUsersResponse = await this.getUsers(commentUserIds);
      const commentUsers = commentUsersResponse.data;

      // enrich
      this.posts = posts.map((post) => {
        let postUser = commentUsers.find((user) => user.id == post.userId);
        const firstName = postUser.firstName;
        const lastName = postUser.lastName;

        const filterComments = post.comments.filter(
          (comment) => !usersBlockedIds.includes(comment.userId)
        );
        const comments = filterComments.map((comment) => {
          let currentUser = commentUsers.find(
            (user) => user.id == comment.userId
          );
          const firstName = currentUser.firstName;
          const lastName = currentUser.lastName;
          return {...comment, firstName, lastName}
        });
        return { ...post, firstName, lastName, comments };
      });
    },
    async getPosts(ids) {
      return this.axios.post(postsApi, { ids: ids, loggedInUserId: this.loggedInUserId });
    },
    async getBlockedAccounts() {
      return this.axios.get(accountApi + this.userId + "/blocked-accounts");
    },
    async getConnections() {
      return this.axios.get(accountApi + this.userId);
    },
    async getUsers(accountIds) {
      return this.axios.post(usersApi, { ids: accountIds });
    },
  },
};
</script>

<style scoped>
.card-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.content-container {
  max-height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0;
}
/* .scrollable-list {
  overflow-y: auto;
  max-height: calc(100vh - 369px);
} */

/* .content-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
} */
</style>
