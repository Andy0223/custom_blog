<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>To-Do List</h1>
    <PostList msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import PostList from "./components/postList.vue";

export default {
  name: "App",
  components: {
    PostList,
  },
};
</script>