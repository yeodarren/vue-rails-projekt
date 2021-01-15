<template>
  <div v-test="{ id: 'container' }" class="container">
    <form
      v-test="{ id: 'edit-team-form' }"
      id="edit-team-form"
      @submit.prevent="submit"
      data-cy="edit-team-form"
    >
      <h1 v-test="{ id: 'team-title' }" class="title">Edit Team</h1>
      <label v-test="{ id: 'team-label' }">Team name</label>
      <input
        v-test="{ id: 'team-name' }"
        id="team-name"
        type="text"
        v-model="teamName"
        placeholder="Enter team name"
        data-cy="team-name"
      />

      <div v-test="{ id: 'users-section' }" id="users-section">
        <h1 v-test="{ id: 'users-title' }" class="title">Users</h1>
        <div
          v-test="{ id: 'user-info' }"
          id="user-info"
          v-for="(user, i) of team.users"
          :key="i"
        >
          <div v-test="{ id: 'user-name' }" id="user-name">{{ user.name }}</div>
          <div v-test="{ id: 'delete-user' }" id="delete-user" @click="deleteUser(user.id)" data-cy="delete-button">Delete</div>
        </div>
      </div>

      <h1 v-test="{ id: 'user-title' }" class="title">Add users</h1>
      <label v-test="{ id: 'user-label' }">Please select users</label>
      <select
        v-test="{ id: 'user-select' }"
        id="users"
        name="users"
        v-model="selectedUserIds"
        multiple
        size="10"
        data-cy="user-select"
      >
        <option v-for="user of users" :key="user.id" :value="user.id"
          >{{ user.name }} ({{ user.email }})</option
        >
      </select>
      <div v-test="{ id: 'buttons' }" class="buttons">
        <button
          v-test="{ id: 'submit-button' }"
          type="submit"
          class="submit-button"
        >
          Submit
        </button>
        <button
          v-test="{ id: 'return-button' }"
          class="return-button"
          @click="goBack"
        >
          Go Back
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Test from "../directives/test";
import { mapActions, mapGetters } from "vuex";
export default {
  directives: { Test },
  data() {
    return {
      teamName: "",
      userIds: [],
      selectedUserIds: [],
    };
  },
  methods: {
    ...mapActions({
      updateTeam: "team/updateTeam",
      setUsers: "user/setUsers",
    }),
    submit() {
      this.selectedUserIds.forEach((userId) => {
        this.userIds.push(userId);
      });
      this.updateTeam({
        id: this.$route.params.id,
        name: this.teamName,
        user_ids: this.userIds,
      });
    },
    goBack() {
      this.$router.push("/profile");
    },
    updateUserIds() {
      this.team.users?.forEach((user) => {
        this.userIds.push(user.id);
      });
    },
    deleteUser(id) {
      const indexOfDeletedUser = this.userIds.indexOf(id);
      this.userIds.splice(indexOfDeletedUser, 1);
      this.$store.commit('team/deleteTeamUser', id)
    },
  },
  computed: {
    ...mapGetters({
      users: "user/getUsers",
      team: "team/getTeamDetails",
    }),
  },
  created() {
    this.setUsers();
    this.updateUserIds();
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  #edit-team-form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 20px 0;

    #users-section {
      #user-info {
        display: flex;
        align-items: center;

        #user-name {
          margin-right: 10px;
        }

        #delete-user {
          color: red;
          font-size: 1rem;
          cursor: pointer;
        }
      }
    }

    .submit-button,
    .return-button {
      margin-top: 10px;
      margin-right: 10px;
      height: 40px;
      width: 100px;
      background-color: lightgreen;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
    }
  }

  label {
    margin: 10px 0;
  }

  .title {
    margin-top: 10px;
  }

  #team-name,
  #users {
    padding: 5px;
  }
}

@media (max-width: 768px) {
  .container {
    #edit-team-form {
      width: 80%;

      .submit-button,
      .return-button {
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
