<template>
  <div v-test="{ id: 'container' }" class="container">
    <form
      v-test="{ id: 'edit-form' }"
      @submit.prevent="edit"
      id="edit-form"
      data-cy="edit-user-form"
    >
      <h1 v-test="{ id: 'title' }">Edit User</h1>
      <label v-test="{ id: 'label' }">Name</label>
      <input
        v-test="{ id: 'name' }"
        :value="$elvis('userInfo?.user.name')"
        @input="updateName($event)"
        placeholder="Enter your name"
        class="name"
        data-cy="edit-user-name"
      />
      <!-- <span v-if="!$v.name.required && $v.name.$dirty">Name is required!</span> -->
      <label v-test="{ id: 'label' }">Email</label>
      <input
        v-test="{ id: 'email' }"
        :value="$elvis('userInfo?.user.email')"
        @input="updateEmail($event)"
        placeholder="Enter your email"
        class="email"
        data-cy="login-email"
      />
      <!-- <span v-if="(!$v.email.required || !$v.email.email) && $v.email.$dirty"
        >Email is required!</span
      > -->
      <label v-test="{ id: 'label' }">Password</label>
      <input
        v-test="{ id: 'password' }"
        type="password"
        v-model="password"
        placeholder="Enter your password"
        class="password"
        data-cy="login-password"
      />
      <span v-if="!$v.password.required && $v.password.$dirty"
        >Password is required!</span
      >
      <span v-if="!$v.password.minLength && $v.password.$dirty"
        >Password must have at least 6 characters!</span
      >
      <button v-test="{ id: 'update-button' }" type="submit" id="update-button">
        Update
      </button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import Test from "../directives/test";
import { mapActions, mapGetters } from "vuex";
export default {
  directives: { Test },
  data() {
    return {
      password: "",
    };
  },
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  computed: {
    ...mapGetters({
      userInfo: "user/getUserInfo",
    }),
  },
  methods: {
    ...mapActions({
      updateUser: "user/updateUser",
      updateUserName: "user/updateUserName",
      updateUserEmail: "user/updateUserEmail",

    }),
    updateName(event){
      this.updateUserName(event.target.value)
    },
    updateEmail(event){
      this.updateUserEmail(event.target.value)
    },
    edit() {
      this.$v.$touch();

      this.updateUser({ id: this.userInfo.user.id, name: this.userInfo.user.name, email: this.userInfo.user.email, password: this.password });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;

  #edit-form {
    display: flex;
    flex-direction: column;
    width: 30%;

    label {
      margin: 10px 0;
    }

    .name,
    .email,
    .password {
      padding: 5px;
    }

    #update-button {
      height: 40px;
      width: 100px;
      background-color: lightgreen;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      margin: 10px 0;
    }

    span {
      color: red;
    }
  }
}

@media (max-width: 768px) {
  .container{
    #edit-form {
      width: 300px;
    }
  }
}
</style>
