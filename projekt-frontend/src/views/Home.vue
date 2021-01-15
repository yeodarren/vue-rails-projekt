<template>
  <div id="home">
    <div v-test="{id : 'container'}" id="container">
      <h1 v-test="{id : 'title'}" class="title">Welcome to Projekt</h1>
      <div v-test="{id : 'description'}" class="description">
        <h3 v-test="{id : 'description-text'}" class="description-text">The app you need for project management.</h3>
        <h3 v-test="{id : 'description-text'}" class="description-text">Manage everything in one workspace.</h3>
      </div>
    </div>
    <img v-test="{id : 'image'}" src="../assets/homepage.jpg" alt="homepage" />
  </div>
</template>

<script>
import Test from '../directives/test'
export default {
  name: "Home",
  directives: { Test }
};
</script>

<style lang="scss" scoped>
#home {
  position: relative;
  height: 80vh;
  #container {
    position: relative;
    z-index: 2;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10%;
  }

  .description {
    margin: 80px 0;
    
    .description-text{
      margin: 10px 0;
    }
  }

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 80vh;
    opacity: 0.3;
    object-fit: cover;
  }
}
</style>
