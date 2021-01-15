import { shallowMount, createLocalVue } from "@vue/test-utils";
import Project from "@/components/Project.vue";

const localVue = createLocalVue()
localVue.filter('formatDate', jest.fn())

describe('Project.vue', () => {
  let wrapper 

  const project = {
    title: '',
    created_at: ''
  }

  beforeEach(() => (
    wrapper = shallowMount(Project, {localVue, propsData: {
      project
    }})
  ))

  it('renders project item', () => {
    expect(wrapper.find('[data-test-id="project-item"]').exists()).toBe(true)
  })

  it('renders project title', () => {
    expect(wrapper.find('[data-test-id="project-title"]').exists()).toBe(true)
  })

  it('renders project created at', () => {
    expect(wrapper.find('[data-test-id="project-created-at"]').exists()).toBe(true)
  })
})