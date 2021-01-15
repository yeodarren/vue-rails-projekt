import { createLocalVue, shallowMount } from "@vue/test-utils";
import MyTeams from "@/components/MyTeams.vue";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin({
  methods: {
    $elvis: jest.fn()
  }
});

describe('MyTeams.vue', () => {
  let getters
  let store
  
  const userInfo = {
    teams: []
  }

  beforeEach(() => {
    getters = {
      getUserInfo: () => userInfo
    }
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          getters
        }
      }
    })
  })

  it('renders my-teams', () => {
    const wrapper = shallowMount(MyTeams, { store, localVue })
    expect(wrapper.find('[data-test-id="my-teams"]').exists()).toBe(true);
  })

  it('renders my-teams-title', () => {
    const wrapper = shallowMount(MyTeams, { store, localVue })
    expect(wrapper.find('[data-test-id="my-teams-title"]').exists()).toBe(true);
  })

  it('renders team-list', () => {
    const wrapper = shallowMount(MyTeams, { store, localVue })
    expect(wrapper.find('[data-test-id="team-list"]').exists()).toBe(true);
  })

})