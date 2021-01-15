import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import Vuex from 'vuex'
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

const localVue = createLocalVue()
localVue.use(Vuex)

describe('App.vue', () => {
  let actions
  let store

  beforeEach(() => {
    actions = {
      updateUserInfo: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          actions
        }
      }
    })
  })

  it('renders navbar components', () => {
    const wrapper = shallowMount(App, {store, localVue, stubs: ['router-view']})

    expect(wrapper.findComponent(Navbar).exists()).toBe(true)
  })

  it('renders footer components', () => {
    const wrapper = shallowMount(App, {store, localVue, stubs: ['router-view']})

    expect(wrapper.findComponent(Footer).exists()).toBe(true)
  })

  // it('dispatches actions when created', () => {
  //   const wrapper = shallowMount(App, {store, localVue, stubs: ['router-view']})

  //   expect(actions.updateUserInfo).toHaveBeenCalled()
  // })
})