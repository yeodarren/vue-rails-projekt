<template>
  <div v-test="{ id: 'profile' }" id="profile">
    <h1 v-test="{ id: 'title' }" id="title">
      Welcome {{ $elvis('userInfo?.user.name') }}!
    </h1>
    <div v-test="{ id: 'actions' }" id="actions">
      <MyProjects />
      <MyTeams />
    </div>
  </div>
</template>

<script>
import Test from "../directives/test";
import MyProjects from "../components/MyProjects.vue";
import MyTeams from "../components/MyTeams.vue";
import { mapGetters } from "vuex";
export default {
  directives: { Test },
  components: {
    MyProjects,
    MyTeams,
  },
  computed: {
    ...mapGetters({
      userInfo: "user/getUserInfo",
    }),
  },
};
</script>

<style lang="scss" scoped>
#profile {
  min-height: 80vh;
  #title {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 1px solid lightgray;
    margin: 20px 0;
  }

  #actions {
    display: flex;
    justify-content: space-evenly;
  }
}

@media (max-width: 768px){
  #profile{
    #actions {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
