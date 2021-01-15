import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import store from '../store/modules/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresUnauth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      requiresUnauth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    meta: {
      requiresUnauth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create_team',
    name: 'Create Team',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateTeam.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/team/:id',
    name: 'Team',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Team.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/team/:id/edit',
    name: 'Edit Team',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EditTeam.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create_project',
    name: 'Create Project',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateProject.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project/:id',
    name: 'Project',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Project.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/project/:id/edit',
    name: 'Edit Project',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EditProject.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edit_user',
    name: 'Edit User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EditUser.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !localStorage.userInfo) {
    next('/login');
  } else if (to.meta.requiresUnauth && localStorage.userInfo) {
    next('/profile');
  } else {
    next();
  }
})

export default router
