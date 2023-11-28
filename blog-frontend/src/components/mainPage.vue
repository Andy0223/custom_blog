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
      <button
        @click="editPost(post)"
        class="edit-button"
        style="margin-right: 5px"
      >
        Edit
      </button>
      <button
        @click="confirmDelete(post.id)"
        class="delete-button"
        style="margin-right: 5px"
      >
        Delete
      </button>
    </div>
    <form @submit.prevent="submitPost">
      <label style="font-weight: bold">Title:</label>
      <input v-model="newPost.title" required ref="titleInput" />
      <label style="font-weight: bold">Content:</label>
      <textarea
        v-model="newPost.content"
        ref="contentTextarea"
        required
      ></textarea>
      <button v-if="!isEditing" @click="createPost">Create Post</button>
      <button
        v-if="isEditing"
        @click="cancelEdit"
        class="cancel-button"
        style="margin-right: 5px"
      >
        Cancel
      </button>
      <button v-if="isEditing" @click="confirmEdit" style="margin-right: 5px">
        Confirm
      </button>
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
          window.alert("Post updated successfully!");
        } else {
          await createPost(this.newPost);
          window.alert("Post created successfully!");
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
        window.alert("Post deleted successfully!");
        this.fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    editPost(post) {
      this.newPost = { ...post };
      this.editingPost = post;
      this.isEditing = true;
      this.$nextTick(() => {
        this.$refs.titleInput.focus();
      });
    },
    cancelEdit() {
      if (window.confirm("Are you sure you want to cancel editing?")) {
        this.isEditing = false;
        this.editingPost = null;
        this.newPost = {
          title: "",
          content: "",
        };
      }
    },
    confirmEdit() {
      if (window.confirm("Are you sure you want to save changes?")) {
        // Call your API to update the post
        updatePost(this.editingPost.id, this.newPost)
          .then(() => {
            // Update the post in the posts array
            const index = this.posts.findIndex(
              (post) => post.id === this.editingPost.id
            );
            this.posts.splice(index, 1, this.newPost);

            // Reset the form and exit editing mode
            this.isEditing = false;
            this.editingPost = null;
            this.newPost = {
              title: "",
              content: "",
            };
          })
          .catch((error) => {
            console.error("Failed to update post:", error);
          });
      }
    },
    resetForm() {
      this.editingPost = null;
      this.newPost = {
        title: "",
        content: "",
      };
    },
  },
  watch: {
    "newPost.content": function () {
      this.$nextTick(() => {
        this.$refs.contentTextarea.style.height = "auto";
        this.$refs.contentTextarea.style.height =
          this.$refs.contentTextarea.scrollHeight + "px";
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.contentTextarea.style.height =
        this.$refs.contentTextarea.scrollHeight + "px";
    });
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

.cancel-button {
  background-color: #aeaeae; /* Red */
  color: white;
}

.cancel-button:hover {
  background-color: #999999; /* Darker red */
}

.cancel-button {
  background-color: #aeaeae; /* Red */
  color: white;
}

.delete-button {
  background-color: #f44336; /* Red */
  color: white;
}

.delete-button:hover {
  background-color: #d32f2f; /* Darker red */
}

.edit-button {
  background-color: #ffd53b; /* Yellow */
  color: black;
}

.edit-button:hover {
  background-color: #f0c330; /* Darker yellow */
}

.center-text {
  text-align: center;
}
</style>

