<template>
  <div v-test="{id: 'team-item'}" class="team-item">
    <div v-test="{id: 'team-name'}" class="name">{{ team.name }}</div>
    <div v-test="{id: 'team-created-at'}" class="created-at">Created at: {{ team.created_at | formatDate }}</div>
  </div>
</template>

<script>
import Test from '../directives/test'
export default {
  directives: { Test },
  props: ['team']
}
</script>

<style lang="scss" scoped>
.team-item {
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  background-color: ivory;
  width: 80%;

  .name {
    font-size: 1.5rem;
  }

  .created-at {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .team-item{
    width: 100%;
  }
}
</style>
