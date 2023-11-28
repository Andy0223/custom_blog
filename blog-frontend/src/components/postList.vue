<!-- PostList.vue -->

<template>
  <div>
    <h1>部落格應用程式</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.title }} - {{ post.content }}
        <button @click="selectedPost = post">編輯</button>
        <button @click="deletePost(post.id)">刪除</button>
      </li>
    </ul>
    <form @submit.prevent="createPost">
      <label>標題: <input v-model="newPost.title" required /></label>
      <label
        >內容: <textarea v-model="newPost.content" required></textarea>
      </label>
      <button type="submit">新增文章</button>
    </form>
    <div v-if="selectedPost">
      <h2>編輯文章</h2>
      <label>標題: <input v-model="updatedPost.title" required /></label>
      <label
        >內容: <textarea v-model="updatedPost.content" required></textarea>
      </label>
      <button @click="updatePost">儲存</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostList",
  data() {
    return {
      posts: [],
      newPost: { title: "", content: "" },
      selectedPost: null,
      updatedPost: { title: "", content: "" },
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      fetch("http://localhost:3000/api/posts")
        .then((response) => response.json())
        .then((posts) => (this.posts = posts))
        .catch((error) => console.error("Error fetching posts:", error));
    },
    createPost() {
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newPost),
      })
        .then((response) => response.json())
        .then((newPost) => {
          this.posts.push(newPost);
          this.newPost = { title: "", content: "" };
        })
        .catch((error) => console.error("Error creating post:", error));
    },
    updatePost() {
      if (!this.selectedPost) return;

      fetch(`http://localhost:3000/api/posts/${this.selectedPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.updatedPost),
      })
        .then((response) => response.json())
        .then((updatedPost) => {
          const index = this.posts.findIndex(
            (post) => post.id === this.selectedPost.id
          );
          if (index !== -1) {
            this.$set(this.posts, index, updatedPost);
            this.selectedPost = null;
            this.updatedPost = { title: "", content: "" };
          }
        })
        .catch((error) => console.error("Error updating post:", error));
    },
    deletePost(postId) {
      fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            this.posts = this.posts.filter((post) => post.id !== postId);
          }
        })
        .catch((error) => console.error("Error deleting post:", error));
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
