<template>
  <div v-test="{ id: 'container' }" class="container">
    <form
      v-test="{ id: 'create-team-form' }"
      id="create-team-form"
      @submit.prevent="submit"
      data-cy="create-team-form"
    >
      <h1 v-test="{ id: 'team-title' }" class="title">Create Team</h1>
      <label v-test="{ id: 'team-label' }">Team name</label>
      <input
        v-test="{ id: 'team-name' }"
        id="team-name"
        type="text"
        v-model="teamName"
        placeholder="Enter team name"
        data-cy="team-name"
      />

      <h1 v-test="{ id: 'user-title' }" class="title">Add users</h1>
      <label v-test="{ id: 'user-label' }">Please select users</label>
      <select
        v-test="{ id: 'user-select' }"
        id="users"
        name="users"
        v-model="userIds"
        multiple
        size="10"
        data-cy="user-select"
      >
        <option v-for="user of users" :key="user.id" :value="user.id"
          >{{ user.name }} ({{ user.email }})</option
        >
      </select>
      <div v-test="{ id: 'buttons' }" class="buttons">
        <button v-test="{ id: 'submit-button' }" type="submit" class="submit-button">Submit</button>
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
      username: "",
      userIds: [],
    };
  },
  methods: {
    ...mapActions({
      createTeam: "team/createTeam",
      setUsers: "user/setUsers",
    }),
    submit() {
      this.createTeam({ name: this.teamName, user_ids: this.userIds });
    },
    goBack() {
      this.$router.push("/profile");
    },
  },
  computed: {
    ...mapGetters({
      users: "user/getUsers",
    }),
  },
  created() {
    this.setUsers();
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  #create-team-form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 20px 0;

    #team-form,
    #user-form {
      display: flex;
      flex-direction: column;
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
    #create-team-form {
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
