<template>
  <div v-test="{ id: 'container' }" class="container">
    <div v-test="{ id: 'left-section' }" id="left-section">
      <div v-test="{ id: 'team-section' }" id="team-section">
        <div v-test="{ id: 'team-title' }" id="team-title">Team</div>
        <div v-test="{ id: 'team-name' }" id="team-name">
          {{ $elvis("team?.name") }}
        </div>
        <div v-test="{ id: 'team-created-at' }" id="team-created-at">
          Created at: {{ $elvis("team?.created_at") | formatDate }}
        </div>
        <div v-test="{ id: 'buttons' }" id="buttons">
          <button v-test="{ id: 'edit-team' }" id="edit-team" @click="routeToEditTeamPage" data-cy="edit-button">Edit</button>
          <button v-test="{ id: 'delete-team' }" id="delete-team" @click="removeTeam" data-cy="delete-button">Delete</button>
        </div>
      </div>
      <div v-test="{ id: 'user-section' }" id="user-section">
        <div v-test="{ id: 'user-title' }" id="user-title">Users</div>
        <div v-test="{ id: 'users' }" id="users">
          <div
            v-test="{ id: 'user-info' }"
            id="user-info"
            v-for="(user, i) of users"
            :key="i"
          >
            <div v-test="{ id: 'user-name' }" id="user-name">
              {{ user.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-test="{ id: 'right-section' }" id="right-section">
      <div v-test="{ id: 'project-section' }" id="project-section">
        <div v-test="{ id: 'projects-title' }" id="projects-title">
          Projects
        </div>
        <div
          v-test="{ id: 'project-item' }"
          id="project-item"
          v-for="(project, i) of projects"
          :key="i"
          @click="routeToProjectPage(project.id)"
          data-cy="project-item"
        >
          <div v-test="{ id: 'project-tile' }" id="project-title">
            {{ project.title }}
          </div>
          <div v-test="{ id: 'project-created-at' }" id="created-at">
            Created at: {{ project.created_at | formatDate }}
          </div>
        </div>
      </div>
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
      setTeamDetails: "team/setTeamDetails",
      deleteTeam: "team/deleteTeam",
    }),
    routeToProjectPage(id) {
      this.$router.push(`/project/${id}`);
    },
    routeToEditTeamPage() {
      this.$router.push(`/team/${this.id}/edit`);
    },
    removeTeam() {
      this.deleteTeam(this.id)
    },
  },
  computed: {
    ...mapGetters({
      teamDetails: "team/getTeamDetails",
    }),
    team() {
      return this.teamDetails.team;
    },
    users() {
      return this.teamDetails.users;
    },
    projects() {
      return this.teamDetails.projects;
    },
  },
  async created() {
    await this.setTeamDetails(this.id);
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: space-evenly;

  #left-section,
  #right-section {
    margin: 100px 0;
    width: 500px;
  }

  #left-section {
    #team-section {
      #team-name {
        font-size: 1.5rem;
      }

      #team-created-at {
        font-size: 1rem;
      }

      #buttons {
        display: flex;

        #edit-team,
        #delete-team {
          margin-top: 10px;
          margin-right: 10px;
          background-color: lightgreen;
          color: white;
          width: 100px;
          height: 40px;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
        }

        #delete-team {
          background-color: red;
        }
      }
    }

    #user-section {
      margin: 50px 0;
      display: flex;
      flex-direction: column;

      #users {
        display: flex;
        flex-wrap: wrap;

        #user-info {
          background-color: ivory;
          font-size: 1.5rem;
          padding: 10px 20px;
          margin-bottom: 10px;
          margin-right: 20px;
          width: 200px;
        }
      }
    }
  }

  #right-section {
    #project-item {
      background-color: ivory;
      padding: 10px 20px;
      margin-bottom: 10px;
      cursor: pointer;

      #project-title {
        font-size: 1.5rem;
      }

      #created-at {
        font-size: 1rem;
      }
    }
  }
}

#team-title,
#user-title,
#projects-title {
  font-size: 2rem;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;

    #left-section {
      margin: 0 20px;
      margin-top: 20px;
      width: 90%;
    }

    #right-section {
      margin: 0 20px;
      margin-bottom: 20px;
      width: 90%;
    }
  }
}
</style>
