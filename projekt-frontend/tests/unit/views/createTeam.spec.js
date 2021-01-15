import { shallowMount, createLocalVue } from "@vue/test-utils";
import CreateTeam from "@/views/CreateTeam.vue";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CreateTeam.vue', () => {
  let actions
  let getters
  let store

  beforeEach(() => {
    actions = {
      createTeam: jest.fn(),
      setUsers: jest.fn()
    }
    getters = {
      getUsers: () => []
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
          actions
        }
      }
    })
  })

  it('renders container', () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="container"]').exists()).toBe(true);
  })

  it('renders create team form', () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="create-team-form"]').exists()).toBe(true);
  })

  it('renders team title', () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="team-title"]').exists()).toBe(true);
  })

  it('renders team label', () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="team-label"]').exists()).toBe(true);
  })

  it('renders input for team name', () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="team-name"]').exists()).toBe(true);
  })

  it('renders user title', () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="user-title"]').exists()).toBe(true);
  })

  it('renders user label', () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="user-label"]').exists()).toBe(true);
  })

  it('renders select for users', () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="user-select"]').exists()).toBe(true);
  })

  it('renders buttons', () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="buttons"]').exists()).toBe(true);
  })

  it('renders submit button', () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="submit-button"]').exists()).toBe(true);
  })

  it('renders return button', () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue })
    expect(wrapper.find('[data-test-id="return-button"]').exists()).toBe(true);
  })

  it("sets team name", async () => {
    const wrapper = shallowMount(CreateTeam, {store,localVue})
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

  it('creates team', async () => {
    const wrapper = shallowMount(CreateTeam, { store, localVue})
    await wrapper.find('[data-test-id="create-team-form"]').trigger('submit')

    expect(actions.createTeam).toHaveBeenCalled()
  })

  it('routes to profile page', async () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(CreateTeam, { store, localVue, mocks: { $router: mockRouter} })
    await wrapper.find('[data-test-id="return-button"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/profile')
  })
})