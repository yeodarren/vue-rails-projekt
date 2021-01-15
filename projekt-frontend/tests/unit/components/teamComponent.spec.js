import { shallowMount, createLocalVue } from "@vue/test-utils";
import Team from "@/components/Team.vue";

const localVue = createLocalVue()
localVue.filter('formatDate', jest.fn())

describe('Team.vue', () => {
  let wrapper 

  const team = {
    name: '',
    created_at: ''
  }

  beforeEach(() => (
    wrapper = shallowMount(Team, {localVue, propsData: {
      team
    }})
  ))

  it('renders team item', () => {
    expect(wrapper.find('[data-test-id="team-item"]').exists()).toBe(true)
  })

  it('renders team name', () => {
    expect(wrapper.find('[data-test-id="team-name"]').exists()).toBe(true)
  })

  it('renders team created at', () => {
    expect(wrapper.find('[data-test-id="team-created-at"]').exists()).toBe(true)
  })
})