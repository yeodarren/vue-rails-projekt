<template>
  <div id="nav">
    <nav v-test="{ id: 'navbar' }" id="navbar">
      <h1 v-test="{ id: 'logo' }" id="logo">
        <router-link to="/">Projekt</router-link>
      </h1>
      <ul v-test="{ id: 'nav-links' }" id="nav-links">
        <li
          v-test="{ id: 'sign-in' }"
          class="nav-link"
          @click="signIn"
          v-if="!userInfo"
        >
          Sign In
        </li>
        <li
          v-test="{ id: 'sign-up' }"
          class="nav-link"
          @click="signUp"
          v-if="!userInfo"
        >
          Sign Up
        </li>
        <li
          v-test="{ id: 'edit-user' }"
          class="nav-link"
          @click="editUser"
          v-if="userInfo"
          data-cy="edit-user"
        >
          {{ userInfo.user.name }}
        </li>
        <li
          v-test="{ id: 'create-project' }"
          class="nav-link"
          @click="createProject"
          v-if="userInfo"
          data-cy="create-project"
        >
          New Project
        </li>
        <li
          v-test="{ id: 'create-team' }"
          class="nav-link"
          @click="createTeam"
          v-if="userInfo"
          data-cy="create-team"
        >
          New Team
        </li>
        <li
          v-test="{ id: 'sign-out' }"
          class="nav-link"
          @click="signOut"
          v-if="userInfo"
        >
          Sign Out
        </li>
      </ul>
      <div
        class="menu"
        v-test="{ id: 'menu-button' }"
        @click="toggleNavigationDrawer"
      >
        <icon scale="1.5" name="bars" />
      </div>
    </nav>
    <transition name="navigation">
      <div
        v-test="{ id: 'navigation-drawer' }"
        id="navigationDrawer"
        v-if="navigationDrawer"
      >
        <div
          class="close"
          @click="toggleNavigationDrawer"
          v-test="{ id: 'close-button' }"
        >
          <icon scale="1.5" name="times" />
        </div>
        <ul v-test="{ id: 'list-items' }" id="list-items">
          <li
            v-test="{ id: 'list-sign-in' }"
            class="list-item"
            @click="signIn"
            v-if="!userInfo"
          >
            Sign In
          </li>
          <li
            v-test="{ id: 'list-sign-up' }"
            class="list-item"
            @click="signUp"
            v-if="!userInfo"
          >
            Sign Up
          </li>
          <li
            v-test="{ id: 'list-edit-user' }"
            class="list-item"
            @click="editUser"
            v-if="userInfo"
          >
            {{ userInfo.user.name }}
          </li>
          <li
            v-test="{ id: 'list-create-project' }"
            class="list-item"
            @click="createProject"
            v-if="userInfo"
          >
            New Project
          </li>
          <li
            v-test="{ id: 'list-create-team' }"
            class="list-item"
            @click="createTeam"
            v-if="userInfo"
          >
            New Team
          </li>
          <li
            v-test="{ id: 'list-sign-out' }"
            class="list-item"
            @click="signOut"
            v-if="userInfo"
          >
            Sign Out
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/bars";
import "vue-awesome/icons/times";
import Test from "../directives/test";
import { mapActions, mapGetters } from "vuex";
export default {
  directives: { Test },
  components: { Icon },
  data() {
    return {
      navigationDrawer: false,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/getUserInfo",
    }),
  },
  methods: {
    ...mapActions({
      logout: "user/logout",
    }),
    signIn() {
      this.$router.push("/login");
    },
    signUp() {
      this.$router.push("/register");
    },
    signOut() {
      this.logout();
    },
    createTeam() {
      this.$router.push("/create_team");
    },
    createProject() {
      this.$router.push("/create_project");
    },
    editUser() {
      this.$router.push("/edit_user");
    },
    toggleNavigationDrawer() {
      this.navigationDrawer = !this.navigationDrawer;
    },
  },
};
</script>

<style lang="scss" scoped>
#navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: beige;
  width: 100%;
  height: 10vh;

  #logo {
    flex: 1;
    margin-left: 70px;
    cursor: pointer;
  }

  #nav-links {
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    min-width: 300px;
    padding: 20px;

    .nav-link {
      padding: 10px;
      background: none;
      cursor: pointer;

      &:hover {
        background: ivory;
      }
    }
  }

  .menu {
    display: none;
  }
}

a {
  text-decoration: none;
  color: black;
}

#navigationDrawer {
  position: fixed;
  top: 0%;
  right: 0;
  height: 100%;
  width: 300px;
  background-color: ivory;
  z-index: 5;

  .close {
    position: absolute;
    right: 0;
    padding: 20px;
  }

  #list-items {
    list-style: none;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .list-item {
      border: none;
      background-color: transparent;
      font-size: 2rem;
      margin: 50px 0;
      cursor: pointer;
    }
  }
}

@media (max-width: 768px) {
  #navbar {
    #nav-links {
      display: none;
    }

    .menu {
      display: block;
      margin-right: 30px;
      cursor: pointer;
    }
  }
}

.navigation-enter,
.navigation-leave-to {
  transform: translateX(300px);
}

.navigation-enter-active {
  transition: transform 0.3s ease-out;
}

.navigation-leave-active {
  transition: transform 0.3s ease-in;
}

.navigation-leave,
.navigation-enter-to {
  transform: translateX(0px);
}
</style>
