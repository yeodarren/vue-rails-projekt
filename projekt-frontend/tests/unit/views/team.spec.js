import { shallowMount, createLocalVue } from "@vue/test-utils";
import Team from "@/views/Team.vue";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin({
  methods: {
    $elvis: jest.fn()
  }
});
localVue.filter('formatDate', jest.fn())

describe('Team.vue', () => {
  let actions
  let getters
  let store

  const team = {
    team: {
      name: "team",
      created_at: "2020"
    },
    users: [],
    projects: [1,2]
  }

  beforeEach(() => {
    actions = {
      setTeamDetails: jest.fn(),
      deleteTeam: jest.fn()
    }
    getters = {
      getTeamDetails: () => team
    }
    store = new Vuex.Store({
      modules: {
        team: {
          namespaced: true,
          actions,
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
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="container"]').exists()).toBe(true)
  })

  it('renders left section', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="left-section"]').exists()).toBe(true)
  })

  it('renders team section', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="team-section"]').exists()).toBe(true)
  })

  it('renders team title', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="team-title"]').exists()).toBe(true)
  })

  it('renders team name', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="team-name"]').exists()).toBe(true)
  })

  it('renders team created at', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="team-created-at"]').exists()).toBe(true)
  })

  it('renders buttons', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="buttons"]').exists()).toBe(true)
  })

  it('renders edit-team button', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="edit-team"]').exists()).toBe(true)
  })

  it('routes to edit team page', async () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute, $router: mockRouter } })
    await wrapper.find('[data-test-id="edit-team"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalled()
  })

  it('renders delete team button', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="delete-team"]').exists()).toBe(true)
  })

  it('deletes the team', async () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    await wrapper.find('[data-test-id="delete-team"]').trigger('click')

    expect(actions.deleteTeam).toHaveBeenCalled()
  })

  it('renders user section', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="user-section"]').exists()).toBe(true)
  })

  it('renders user title', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="user-title"]').exists()).toBe(true)
  })

  it('renders users container', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="users"]').exists()).toBe(true)
  })

  // it('renders user container', () => {
  //   const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
  //   expect(wrapper.find('[data-test-id="user-info"]').exists()).toBe(true)
  // })

  // it('renders user name', () => {
  //   const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
  //   expect(wrapper.find('[data-test-id="user-name"]').exists()).toBe(true)
  // })

  it('renders right section', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="right-section"]').exists()).toBe(true)
  })

  it('renders project section', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="project-section"]').exists()).toBe(true)
  })

  it('renders projects title', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="projects-title"]').exists()).toBe(true)
  })

  it('renders 2 project item', () => {
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.findAll('[data-test-id="project-item"]').length).toBe(2)
  })

  it('routes project page', async () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute, $router: mockRouter } })
    const project = wrapper.findAll('[data-test-id="project-item"]').at(0)
    await project.trigger('click')

    expect(mockRouter.push).toHaveBeenCalled()
  })

  

  // it('renders project title', () => {
  //   const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
  //   expect(wrapper.find('[data-test-id="project-title"]').exists()).toBe(true)
  // })

  // it('renders project created at', () => {
  //   const wrapper = shallowMount(Team, { store, localVue, mocks: { $route: mockRoute } })
  //   expect(wrapper.find('[data-test-id="project-created-at"]').exists()).toBe(true)
  // })

  //v-for
  //select

})