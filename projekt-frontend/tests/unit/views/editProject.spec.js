import { shallowMount, createLocalVue } from "@vue/test-utils";
import EditProject from "@/views/EditProject.vue";
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

describe('EditProject.vue', () => {
  let actions
  let getters
  let store

  const projectDetails = {
    project: {}
  }

  beforeEach(() => {
    fetch.mockClear()
    actions = {
      updateTitle: jest.fn(),
      updateDescription: jest.fn(),
      updateProject: jest.fn()
    }
    getters = {
      getProjectDetails: () => projectDetails
    }
    store = new Vuex.Store({
      modules: {
        project: {
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
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="container"]').exists()).toBe(true);
  })

  it('renders edit project form', () => {
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="edit-project-form"]').exists()).toBe(true);
  })

  it('renders edit project title', () => {
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="edit-project-title"]').exists()).toBe(true);
  })

  it('renders three project labels', () => {
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.findAll('[data-test-id="edit-project-label"]').length).toBe(3);
  })

  it('renders input for project title', () => {
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="edit-project-name"]').exists()).toBe(true);
  })

  it('renders textarea for project description', () => {
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="edit-project-description"]').exists()).toBe(true);
  })

  it('renders upload actions', () => {
    const wrapper = shallowMount(EditProject, { store, localVue })
    expect(wrapper.find('[data-test-id="upload-actions"]').exists()).toBe(true);
  })

  it('renders input for image', () => {
    const wrapper = shallowMount(EditProject, { store, localVue })
    expect(wrapper.find('[data-test-id="image-input"]').exists()).toBe(true);
  })

  it('renders upload button', () => {
    const wrapper = shallowMount(EditProject, { store, localVue })
    expect(wrapper.find('[data-test-id="upload-button"]').exists()).toBe(true);
  })

  it('sets image on change', () => {
    const wrapper = shallowMount(EditProject, { store, localVue })

    wrapper.vm.setImage(event)

    expect(wrapper.vm.$data.image).toBe(event.target.files[0])
  })

  it('uploads the image to cloud', async () => {
    const wrapper = shallowMount(EditProject, { store, localVue })

    await wrapper.find('[data-test-id="upload-button"]').trigger('click')
    await flushPromises()
    expect(wrapper.vm.$data.uploaded).toBe(true)
  })
  
  it('renders upload text', () => {
    const wrapper = shallowMount(EditProject, { store, localVue, data(){
      return {
        uploaded: true
      }
    } })
    expect(wrapper.find('[data-test-id="upload-text"]').exists()).toBe(true);
  })

  it('renders buttons', () => {
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="buttons"]').exists()).toBe(true);
  })

  it('renders submit button', () => {
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="submit-button"]').exists()).toBe(true);
  })

  it('renders return button', () => {
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute } })
    expect(wrapper.find('[data-test-id="return-button"]').exists()).toBe(true);
  })

  it("sets project title and description", async () => {
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute } })
    const projectName = wrapper.find('[data-test-id="edit-project-name"]')
    const projectDescription = wrapper.find('[data-test-id="edit-project-description"]')
    // const team = wrapper.find('[data-test-id="team-select"]')
    await projectName.setValue('testing')
    await projectDescription.setValue('testing')
    // await team.setValue('test')

    expect(projectName.element.value).toMatch('testing')
    expect(projectDescription.element.value).toMatch('testing')
    // expect(team.element.value).toBe('test')
  });

  it('updates project', async () => {
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute } })
    await wrapper.find('[data-test-id="edit-project-form"]').trigger('submit')

    expect(actions.updateProject).toHaveBeenCalled()
  })

  it('routes to profile page', async () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(EditProject, { store, localVue, mocks: { $route: mockRoute, $router: mockRouter} })
    await wrapper.find('[data-test-id="return-button"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/profile')
  })



})