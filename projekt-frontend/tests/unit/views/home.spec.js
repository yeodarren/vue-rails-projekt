import { shallowMount } from "@vue/test-utils";
import Home from "@/views/Home.vue";

describe('Home.vue', () => {
  let wrapper 

  beforeEach(() => (
    wrapper = shallowMount(Home)
  ))

  it('renders container', () => {
    expect(wrapper.find('[data-test-id="container"]').exists()).toBe(true)
  })

  it('renders title', () => {
    expect(wrapper.find('[data-test-id="title"]').exists()).toBe(true)
  })

  it('renders description', () => {
    expect(wrapper.find('[data-test-id="description"]').exists()).toBe(true)
  })

  it('renders description text', () => {
    expect(wrapper.find('[data-test-id="description-text"]').exists()).toBe(true)
  })

  it('renders image', () => {
    expect(wrapper.find('[data-test-id="image"]').exists()).toBe(true)
  })
})