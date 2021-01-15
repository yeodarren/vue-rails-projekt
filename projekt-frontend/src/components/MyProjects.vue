<template>
  <div v-test="{ id: 'my-projects' }" id="my-projects">
    <div v-test="{ id: 'my-projects-title' }" id="my-projects-title">
      My projects
    </div>
    <ul v-test="{ id: 'project-list' }" id="project-list">
      <li v-test="{ id: 'project' }" v-for="project of $elvis('userInfo?.projects')" :key="project.id" @click="routeToProjectPage(project.id)" class="project" data-cy="project">
        <Project :project="project" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Test from '../directives/test'
import Project from './Project.vue'
export default {
  directives: { Test },
  components: {
    Project
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/getUserInfo'
    })
  },
  methods: {
    routeToProjectPage(id){
      this.$router.push(`/project/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
#my-projects {
  width: 50%;
  padding-left: 100px;
  border-right: 1px solid lightgray;
  #my-projects-title {
    font-size: 2rem;
  }

  #project-list {
    list-style: none;
    padding: 0;

    .project{
      cursor: pointer;
    }
  }
}

@media (max-width: 768px){
  #my-projects{
    width: 100%;
    border: none;
    padding: 0 15%;
  }
}
</style>
