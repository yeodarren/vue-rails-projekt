<template>
  <div v-test="{id: 'project-item'}" class="project-item">
    <div v-test="{id: 'project-title'}" class="title">{{ project.title }}</div>
    <div v-test="{id: 'project-created-at'}" class="created-at">Created at: {{ project.created_at | formatDate }}</div>
  </div>
</template>

<script>
import Test from '../directives/test'
export default {
  directives: { Test },
  props: ['project']
}
</script>

<style lang="scss" scoped>
.project-item {
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  background-color: ivory;
  width: 80%;

  .title {
    font-size: 1.5rem;
  }

  .created-at {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .project-item{
    width: 100%;
  }
}
</style>
