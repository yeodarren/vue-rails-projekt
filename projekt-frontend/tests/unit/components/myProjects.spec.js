import { createLocalVue, shallowMount } from "@vue/test-utils";
import MyProjects from "@/components/MyProjects.vue";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin({
  methods: {
    $elvis: jest.fn()
  }
});

describe('MyProjects.vue', () => {
  let getters
  let store
  
  const userInfo = {
    projects: [{
      title: "test",
      created_at: ""
    },
    {
      title: "test",
      created_at: ""
    }]
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

  it('renders my-projects', () => {
    const wrapper = shallowMount(MyProjects, { store, localVue })
    expect(wrapper.find('[data-test-id="my-projects"]').exists()).toBe(true);
  })

  it('renders my-projects-title', () => {
    const wrapper = shallowMount(MyProjects, { store, localVue })
    expect(wrapper.find('[data-test-id="my-projects-title"]').exists()).toBe(true);
  })

  it('renders project-list', () => {
    const wrapper = shallowMount(MyProjects, { store, localVue })
    expect(wrapper.find('[data-test-id="project-list"]').exists()).toBe(true);
  })

  // it('renders projects', () => {
  //   const wrapper = shallowMount(MyProjects, { store, localVue })
  //   expect(wrapper.find('[data-test-id="project"]').exists()).toBe(true);
  //   // expect(wrapper.find('[data-test-id="project"]').length).toBe(2);
  // })

  // it('routes to project page', async () => {
  //   const mockRouter = {
  //     push: jest.fn()
  //   }
  //   const wrapper = shallowMount(MyProjects, { store, localVue, mocks: { $router: mockRouter } })
  //   const project = wrapper.findAll('[data-test-id="project"]').at(0)
  //   // expect(projects.length).toBe(0)
  //   // console.log(projects)
  //   await project.trigger('click')

  //   expect(mockRouter.push).toHaveBeenCalled()
  // })

})