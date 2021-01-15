<template>
  <div v-test="{ id: 'my-teams' }" id="my-teams">
    <div v-test="{ id: 'my-teams-title' }" id="my-teams-title">My teams</div>
    <ul v-test="{ id: 'team-list' }" id="team-list">
      <li v-for="(team, i) of $elvis('userInfo?.teams')" :key="i" @click="routeToTeamPage(team.id)" class="team" data-cy="team">
        <Team :team="team" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Test from '../directives/test'
import Team from './Team.vue'
export default {
  directives: { Test },
  components: {
    Team
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/getUserInfo'
    })
  },
  methods: {
    routeToTeamPage(id){
      this.$router.push(`/team/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
#my-teams {
  width: 50%;
  padding-left: 100px;

  #my-teams-title {
    font-size: 2rem;
  }

  #team-list {
    list-style: none;
    padding: 0;

    .team{
      cursor: pointer;
    }
  }
}

@media (max-width: 768px){
  #my-teams{
    width: 100%;
    border: none;
    padding: 0 15%;
  }
}
</style>
