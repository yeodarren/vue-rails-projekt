<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
  created() {
    if(localStorage.userInfo){
      this.$store.dispatch("user/updateUserInfo");
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;400&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: "Poppins", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
