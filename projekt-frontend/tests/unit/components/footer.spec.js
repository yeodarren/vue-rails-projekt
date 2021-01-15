import { shallowMount } from "@vue/test-utils";
import Footer from "@/components/Footer.vue";

describe('Footer.vue', () => {
  let wrapper

  beforeEach(() => (
    wrapper = shallowMount(Footer)
  ))

  it('renders footer', () => {
    expect(wrapper.find('[data-test-id="footer"]').exists()).toBe(true);
  })
})