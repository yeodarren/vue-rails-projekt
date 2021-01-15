import { shallowMount, createLocalVue } from "@vue/test-utils";
import Profile from "@/views/Profile.vue";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin({
  methods: {
    $elvis: jest.fn()
  }
});

describe('Profile.vue', () => {
  let store
  let getters

  const userInfo = {
    user: {
      name: "Test"
    }
  }

  beforeEach(() => {
    getters = {
      getUserInfo: () => userInfo
    },
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          getters
        }
      }
    })
  })

  it('renders profile', () => {
    const wrapper = shallowMount(Profile, { store, localVue })
    expect(wrapper.find('[data-test-id="profile"]').exists()).toBe(true);
  })

  it('renders title', () => {
    const wrapper = shallowMount(Profile, { store, localVue })
    expect(wrapper.find('[data-test-id="title"]').exists()).toBe(true);
  })

  it('renders actions', () => {
    const wrapper = shallowMount(Profile, { store, localVue })
    expect(wrapper.find('[data-test-id="actions"]').exists()).toBe(true);
  })

})