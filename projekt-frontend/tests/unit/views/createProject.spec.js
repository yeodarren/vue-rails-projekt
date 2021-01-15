import { shallowMount, createLocalVue } from "@vue/test-utils";
import CreateProject from "@/views/CreateProject.vue";
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin({
  methods: {
    $elvis: jest.fn()
  }
});

const event = {
  target: {
    files: [
      {
        name: 'image.png',
        size: 50000,
        type: 'image/png',
      },
    ],
  },
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(true),
  })
);

describe('CreateProject.vue', () => {
  let actions
  let getters
  let store

  const userInfo = {
    teams: []
  }

  beforeEach(() => {
    fetch.mockClear()
    actions = {
      createProject: jest.fn(),
    }
    getters = {
      getUserInfo: () => userInfo
    }
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          getters
        },
        project: {
          namespaced: true,
          actions
        }
      }
    })
  })

  it('renders container', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="container"]').exists()).toBe(true);
  })

  it('renders create project form', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="create-project-form"]').exists()).toBe(true);
  })

  it('renders project title', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="project-title"]').exists()).toBe(true);
  })

  it('renders three project labels', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.findAll('[data-test-id="project-label"]').length).toBe(3);
  })

  it('renders input for project name', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="project-name"]').exists()).toBe(true);
  })

  it('renders input for project description', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="project-description"]').exists()).toBe(true);
  })

  it('renders upload actions', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="upload-actions"]').exists()).toBe(true);
  })

  it('renders input for image', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="image-input"]').exists()).toBe(true);
  })

  it('renders upload button', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="upload-button"]').exists()).toBe(true);
  })

  it('sets image on change', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })

    wrapper.vm.setImage(event)

    expect(wrapper.vm.$data.image).toBe(event.target.files[0])
  })

  it('uploads the image to cloud', async () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })

    await wrapper.find('[data-test-id="upload-button"]').trigger('click')
    await flushPromises()

    expect(wrapper.vm.$data.uploaded).toBe(true)
  })
  
  it('renders upload text', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue, data(){
      return {
        uploaded: true
      }
    } })
    expect(wrapper.find('[data-test-id="upload-text"]').exists()).toBe(true);
  })

  it('renders select for team', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="team-select"]').exists()).toBe(true);
  })


  it('renders buttons', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="buttons"]').exists()).toBe(true);
  })

  it('renders submit button', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="submit-button"]').exists()).toBe(true);
  })

  it('renders return button', () => {
    const wrapper = shallowMount(CreateProject, { store, localVue })
    expect(wrapper.find('[data-test-id="return-button"]').exists()).toBe(true);
  })

  it("sets project title and description", async () => {
    const wrapper = shallowMount(CreateProject, {store,localVue})
    const projectName = wrapper.find('[data-test-id="project-name"]')
    const projectDescription = wrapper.find('[data-test-id="project-description"]')
    // const team = wrapper.find('[data-test-id="team-select"]')
    // const team = wrapper.find('select')
    await projectName.setValue('testing')
    await projectDescription.setValue('testing')
    // await team.setValue('test')

    expect(projectName.element.value).toMatch('testing')
    expect(projectDescription.element.value).toMatch('testing')
    // expect(team.element.value).toBe('test')
  });

  it('creates project', async () => {
    const wrapper = shallowMount(CreateProject, { store, localVue})
    await wrapper.find('[data-test-id="create-project-form"]').trigger('submit')

    expect(actions.createProject).toHaveBeenCalled()
  })

  it('routes to profile page', async () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(CreateProject, { store, localVue, mocks: { $router: mockRouter} })
    await wrapper.find('[data-test-id="return-button"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/profile')
  })
})