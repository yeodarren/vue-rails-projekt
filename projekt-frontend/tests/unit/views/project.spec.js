import { shallowMount, createLocalVue } from "@vue/test-utils";
import Project from "@/views/Project.vue";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin({
  methods: {
    $elvis: jest.fn()
  }
});
localVue.filter('formatDate', jest.fn())

describe('Project.vue', () => {
  let actions
  let getters
  let store

  const userInfo = {
    // projects: [{
    //   id: 1,
    //   title: "title",
    //   description: "descrtiption",
    //   created_at: "",
    //   user_id: 1,
    //   team_id: 1,
    //   image_url: "testing url"
    // }],
    // teams: [{
    //   id: 1,
    //   name: "team"
    // }],
    user: {
      id: 1,
      name: "test"
    }
  }

  const projectDetails = {
    project: {
      id: 1,
      title: "title",
      description: "descrtiption",
      created_at: "",
      user_id: 1,
      team_id: 1,
      image_url: "testing url"
    },
    team: {
      id: 1,
      name: "team"
    },
    user: {
      id: 1,
      name: "test"
    }
  }

  beforeEach(() => {
    getters = {
      getUserInfo: () => userInfo,
      getProjectDetails: () => projectDetails
    },
    actions = {
      setProjectDetails: jest.fn(),
      deleteProject: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        project: {
          namespaced: true,
          actions,
          getters
        },
        user: {
          namespaced: true,
          getters
        }
      }
    })
  })

  const mockRoute = {
    params: {
      id: 1
    }
  }
  
  it('renders container', () => {
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="container"]').exists()).toBe(true)
  })

  it('renders project title', () => {
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="project-title"]').exists()).toBe(true)
  })

  it('renders project team', () => {
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="project-team"]').exists()).toBe(true)
  })

  it('renders project info', () => {
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="project-info"]').exists()).toBe(true)
  })

  it('renders project user', () => {
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="project-user"]').exists()).toBe(true)
  })

  it('renders project created at', () => {
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="project-created-at"]').exists()).toBe(true)
  })

  it('renders project description label', () => {
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="project-description-label"]').exists()).toBe(true)
  })

  it('renders project description', () => {
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="project-description"]').exists()).toBe(true)
  })

  // it('renders project image', () => {
  //   const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
  //   expect(wrapper.find('[data-test-id="project-image"]').exists()).toBe(true)
  // })

  it('renders edit button', () => {
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="edit-button"]').exists()).toBe(true)
  })

  it('renders delete button', () => {
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="delete-button"]').exists()).toBe(true)
  })

  it('renders return button', () => {
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="return-button"]').exists()).toBe(true)
  })

  it('routes to edit project page when edit button is clicked', async () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute, $router: mockRouter } })
    await wrapper.find('[data-test-id="edit-button"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/project/1/edit')
  })

  it('routes to edit project page when go back button is clicked', async () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute, $router: mockRouter } })
    await wrapper.find('[data-test-id="return-button"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/profile')
  })

  it('deletes project when delete button is clicked', async () => {
    
    const wrapper = shallowMount(Project, { store, localVue, mocks: { $route: mockRoute } })
    await wrapper.find('[data-test-id="delete-button"]').trigger('click')

    expect(actions.deleteProject).toHaveBeenCalled()
  })
})