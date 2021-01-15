<template>
  <div v-test="{ id: 'container' }" class="container">
    <form
      v-test="{ id: 'register-form' }"
      @submit.prevent="signup"
      id="register-form"
      data-cy="register-form"
    >
      <h1 v-test="{ id: 'title' }">Sign up</h1>
      <p v-test="{ id: 'error' }" id="error" v-if="error">{{ error }}</p>
      <label v-test="{ id: 'label' }">Name</label>
      <input
        v-test="{ id: 'name' }"
        v-model="name"
        placeholder="Enter your name"
        class="name"
        data-cy="name"
      />
      <span v-if="!$v.name.required && $v.name.$dirty">Name is required!</span>
      <label v-test="{ id: 'label' }">Email</label>
      <input
        v-test="{ id: 'email' }"
        v-model="email"
        placeholder="Enter your email"
        class="email"
        data-cy="register-email"
      />
      <span v-if="!$v.email.required && $v.email.$dirty"
        >Email is required!</span
      >
      <label v-test="{ id: 'label' }">Password</label>
      <input
        v-test="{ id: 'password' }"
        type="password"
        v-model="password"
        placeholder="Enter your password"
        class="password"
        data-cy="register-password"
      />
      <span v-if="!$v.password.required && $v.password.$dirty"
        >Password is required!</span
      >
      <span v-if="!$v.password.minLength && $v.password.$dirty"
        >Password must have at least 6 characters!</span
      >
      <button
        v-test="{ id: 'register-button' }"
        type="submit"
        id="register-button"
      >
        Sign Up
      </button>
      <p v-test="{ id: 'switch-form-text' }" id="switch-form">
        Already have an account?
        <span v-test="{ id: 'switch-form' }" class="toggle" @click="switchForm">Sign in here!</span>
      </p>
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
      name: "",
      email: "",
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
      error: "user/getError",
    }),
  },
  methods: {
    ...mapActions({
      register: "user/register",
    }),
    switchForm() {
      this.$router.push("/login");
    },
    signup() {
      this.$v.$touch();
      this.register({
        name: this.name,
        email: this.email,
        password: this.password,
      });
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

  #register-form {
    display: flex;
    flex-direction: column;
    width: 30%;

    #error {
      color: red;
    }

    label {
      margin: 10px 0;
    }

    .name,
    .email,
    .password {
      padding: 5px;
    }

    #register-button {
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

    .toggle {
      color: blue;
      cursor: pointer;
    }
  }
}

@media (max-width: 768px) {
  .container{
    #register-form {
      width: 300px;
    }
  }
}
</style>
