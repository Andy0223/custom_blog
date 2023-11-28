<!-- src/views/Home.vue -->

<template>
  <div class="home">
    <div class="center-text">
      <h1>Post what you think, what you love</h1>
    </div>
    <input v-model="search" placeholder="Search posts" />
    <div v-for="post in filteredPosts" :key="post.id" class="post">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
      <button @click="editPost(post)" style="margin-right: 5px">Edit</button>
      <button @click="confirmDelete(post.id)" style="margin-right: 5px">
        Delete
      </button>
    </div>
    <form @submit.prevent="submitPost">
      <label>Title:</label>
      <input v-model="newPost.title" required />
      <label>Content:</label>
      <textarea v-model="newPost.content" required></textarea>
      <button type="submit">Create Post</button>
    </form>
  </div>
</template>

<script>
import { getPosts, createPost, updatePost, deletePost } from "../api";

export default {
  name: "Home",
  data() {
    return {
      search: "",
      posts: [],
      newPost: {
        title: "",
        content: "",
      },
      editingPost: null,
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) => post.title.includes(this.search));
    },
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await getPosts();
        this.posts = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async submitPost() {
      try {
        if (this.editingPost) {
          await updatePost(this.editingPost.id, this.newPost);
        } else {
          await createPost(this.newPost);
        }
        this.resetForm();
        this.fetchPosts();
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    },
    confirmDelete(postId) {
      if (window.confirm("Are you sure you want to delete this post?")) {
        this.deletePost(postId);
      }
    },
    async deletePost(postId) {
      try {
        await deletePost(postId);
        this.fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    editPost(post) {
      this.editingPost = post;
      this.newPost = { ...post };
    },
    resetForm() {
      this.editingPost = null;
      this.newPost = {
        title: "",
        content: "",
      };
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.post {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.post h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.post p {
  color: #555;
}

form {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1em;
}

button:hover {
  background-color: #45a049;
}

.center-text {
  text-align: center;
}
</style>

