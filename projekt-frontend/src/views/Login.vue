<template>
  <div v-test="{ id: 'container' }" class="container">
    <form
      v-test="{ id: 'login-form' }"
      @submit.prevent="signin"
      id="login-form"
      data-cy="login-form"
    >
      <h1 v-test="{ id: 'title' }">Sign in</h1>
      <p v-test="{ id: 'error' }" id="error" v-if="error">{{ error }}</p>
      <label v-test="{ id: 'label' }">Email</label>
      <input
        v-test="{ id: 'email' }"
        v-model="email"
        placeholder="Enter your email"
        class="email"
        data-cy="login-email"
      />
      <span v-if="(!$v.email.required || !$v.email.email) && $v.email.$dirty"
        >Email is required!</span
      >
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
      <button v-test="{ id: 'login-button' }" type="submit" id="login-button">
        Sign In
      </button>

      <p v-test="{ id: 'switch-form-text' }" id="switch-form">
        Don't have an account?
        <span v-test="{ id: 'switch-form' }" class="toggle" @click="switchForm">Sign up here!</span>
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
      email: "",
      password: "",
    };
  },
  validations: {
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
      login: "user/login",
    }),
    switchForm() {
      this.$router.push("/register");
    },
    signin() {
      this.$v.$touch();

      this.login({ email: this.email, password: this.password });
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

  #login-form {
    display: flex;
    flex-direction: column;
    width: 30%;

    #error {
      color: red;
    }

    label {
      margin: 10px 0;
    }

    .email,
    .password {
      padding: 5px;
    }

    #login-button {
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

    #switch-form {
      .toggle {
        color: blue;
        cursor: pointer;
        margin-top: 5px;
      }
    }

    span {
      color: red;
    }
  }
}

@media (max-width: 768px) {
  .container{
    #login-form {
      width: 300px;
    }
  }
}
</style>
