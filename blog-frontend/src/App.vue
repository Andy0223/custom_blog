<template>
  <div id="app">
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
</style>
