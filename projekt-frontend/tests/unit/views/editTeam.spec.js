import { shallowMount, createLocalVue } from "@vue/test-utils";
import EditTeam from "@/views/EditTeam.vue";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EditTeam.vue', () => {
  let actions
  let mutations
  let getters
  let store

  const teamDetails = {
    users: [{
      name: "test"
    }]
  }

  beforeEach(() => {
    actions = {
      updateTeam: jest.fn(),
      setUsers: jest.fn()
    }
    mutations = {
      deleteTeamUser: jest.fn()
    }
    getters = {
      getUsers: () => [],
      getTeamDetails: () => teamDetails
    }
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          actions,
          getters
        },
        team: {
          namespaced: true,
          actions,
          mutations,
          getters
        }
      }
    })
  })

  it('renders container', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="container"]').exists()).toBe(true);
  })

  it('renders edit team form', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="edit-team-form"]').exists()).toBe(true);
  })

  it('renders team title', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="team-title"]').exists()).toBe(true);
  })

  it('renders team label', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="team-label"]').exists()).toBe(true);
  })

  it('renders input for team name', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="team-name"]').exists()).toBe(true);
  })

  it('renders users section', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="users-section"]').exists()).toBe(true);
  })

  it('renders users title', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="user-title"]').exists()).toBe(true);
  })

  it('renders user info', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="user-info"]').exists()).toBe(true);
  })

  it('renders user name', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="user-name"]').exists()).toBe(true);
  })

  it('renders delete button', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="delete-user"]').exists()).toBe(true);
  })

  it('deletes user from state', async () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    await wrapper.find('[data-test-id="delete-user"]').trigger('click')

    expect(mutations.deleteTeamUser).toHaveBeenCalled()
  })

  it('renders user title', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="user-title"]').exists()).toBe(true);
  })

  it('renders user label', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="user-label"]').exists()).toBe(true);
  })

  it('renders select for users', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="user-select"]').exists()).toBe(true);
  })

  it('renders buttons', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="buttons"]').exists()).toBe(true);
  })

  it('renders submit button', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="submit-button"]').exists()).toBe(true);
  })

  it('renders return button', () => {
    const wrapper = shallowMount(EditTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="return-button"]').exists()).toBe(true);
  })

  it("sets team name", async () => {
    const wrapper = shallowMount(EditTeam, {store,localVue})
    const teamName = wrapper.find('[data-test-id="team-name"]')
    // const users = wrapper.find('[data-test-id="user-select"]')
    await teamName.setValue('testing')
    // await users.setValue(['value1', 'value2'])
    
    // const selectedOptions = Array.from(users.element.value).map(
    //   o => o.value
    // )

    expect(teamName.element.value).toMatch('testing')
    // expect(selectedOptions).toEqual(['value1', 'value2'])
  });

  it('updates team', async () => {
    const mockRoute = {
      params: {
        id: 1
      }
    }
    const wrapper = shallowMount(EditTeam, { store, localVue, mocks: { $route: mockRoute }})
    await wrapper.find('[data-test-id="edit-team-form"]').trigger('submit')
    // console.log()

    expect(actions.updateTeam).toHaveBeenCalled()
  })

  it('routes to profile page', async () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(EditTeam, { store, localVue, mocks: { $router: mockRouter} })
    await wrapper.find('[data-test-id="return-button"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/profile')
  })
})