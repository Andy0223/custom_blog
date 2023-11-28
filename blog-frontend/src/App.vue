<template>
  <div id="app" class="main-page">
    <div class="center-logo">
      <img alt="Vue logo" src="./assets/logo.png" />
    </div>
    <Home msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Home from "./components/mainPage.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
.center-logo {
  text-align: center;
}
.center-logo img {
  display: inline-block;
}
.main-page {
  background-image: url("~@/assets/main_bg.jpg"); /* adjust the path to your image file */
  background-size: cover; /* Cover the entire page */
  background-position: center; /* Center the image */
}
</style>
