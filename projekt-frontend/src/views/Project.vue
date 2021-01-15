<template>
  <div v-test="{ id: 'container' }" class="container">
    <div v-test="{ id: 'project-title' }" id="project-title">
      {{ $elvis('project.project?.title') }}
    </div>
    <p v-test="{ id: 'project-team' }" id="project-team">
      Team: {{ $elvis('project.team?.name') }}
    </p>
    <div v-test="{ id: 'project-info' }" id="project-info">
      <p v-test="{ id: 'project-user' }" id="project-user">
        Created by: {{ $elvis('project.user?.name') }}
      </p>
      <p v-test="{ id: 'project-created-at' }" id="created-at">
        Created at: {{ $elvis('project.project?.created_at') | formatDate }}
      </p>
    </div>
    <p
      v-test="{ id: 'project-description-label' }"
      id="project-description-label"
    >
      Description:
    </p>
    <p v-test="{ id: 'project-description' }" id="project-description">
      {{ $elvis('project.project?.description') }}
    </p>
    <img v-test="{ id: 'project-image' }" v-if="$elvis('project.project?.image_url')" :src="$elvis('project.project?.image_url')" alt="image" />
    <div id="buttons">
      <button
        v-test="{ id: 'edit-button' }"
        v-if="$elvis('project.project?.user_id') === $elvis('userInfo?.user?.id')"
        id="edit-button"
        @click="routeToEditProject"
        data-cy="edit-project"
      >
        Edit
      </button>
      <button
        v-test="{ id: 'return-button' }"
        id="return-button"
        @click="goBack"
      >
        Go Back
      </button>
      <button
        v-test="{ id: 'delete-button' }"
        v-if="$elvis('project.project?.user_id') === $elvis('userInfo?.user?.id')"
        id="delete-button"
        @click="removeProject"
        data-cy="delete-button"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Test from "../directives/test";
export default {
  directives: { Test },
  data() {
    return {
      id: this.$route.params.id,
    };
  },
  methods: {
    ...mapActions({
      setProjectDetails: "project/setProjectDetails",
      deleteProject: 'project/deleteProject'
    }),
    routeToEditProject() {
      this.$router.push(`/project/${this.id}/edit`);
    },
    goBack() {
      this.$router.push("/profile");
    },
    removeProject(){
      this.deleteProject(this.id)
    }
  },
  computed: {
    ...mapGetters({
      project: "project/getProjectDetails",
      userInfo: "user/getUserInfo",
    }),
  },
  async created() {
    this.setProjectDetails(this.id);
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 5% 10%;

  #project-title,
  #project-description-label,
  #project-description {
    margin: 10px 0;
  }

  #project-title {
    font-size: 2rem;
  }

  #project-info {
    display: flex;

    #project-user {
      margin-right: 100px;
    }
  }

  img {
    width: 30%;
  }

  #edit-button,
  #delete-button,
  #return-button {
    height: 40px;
    width: 100px;
    background-color: lightgreen;
    border: none;
    border-radius: 5px;
    color: white;
    margin-top: 10px;
    margin-right: 10px;
    font-size: 1rem;
    cursor: pointer;
  }

  #delete-button {
    background-color: red;
  }
}

@media (max-width: 768px) {
  .container {
    #project-info {
      flex-direction: column;
    }
  }
}
</style>
