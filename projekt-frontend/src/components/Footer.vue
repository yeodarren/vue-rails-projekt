<template>
<div v-test="{ id: 'footer' }" id="footer">
  <p> &copy; Projekt {{ new Date().getFullYear() }}</p>
</div>
  
</template>

<script>
import Test from "../directives/test";
export default {
  directives: { Test },
};
</script>

<style lang="scss" scoped>
#footer{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  width: 100%;
  background-color: beige;
}
</style>