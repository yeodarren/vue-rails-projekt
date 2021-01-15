import { shallowMount, createLocalVue } from "@vue/test-utils";
import Register from "@/views/Register.vue";
import Vuelidate from "vuelidate";
import Vuex from 'vuex'

const localVue = createLocalVue();
localVue.use(Vuelidate);
localVue.use(Vuex)

describe("Register.vue", () => {
  let actions
  let getters
  let store

  beforeEach(() => {
    actions = {
      register: jest.fn()
    }
    getters = {
      getError: () => {}
    }
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          actions,
          getters
        }
      }
    })
  })

  it("renders a container", () => {
    const wrapper = shallowMount(Register, {store,localVue})
    expect(wrapper.find('[data-test-id="container"]').exists()).toBe(true);
  });

  it("renders a register form", async () => {
    const wrapper = shallowMount(Register, { store, localVue })
    expect(wrapper.find('[data-test-id="register-form"]').exists()).toBe(true);
  });

  it("renders title", () => {
    const wrapper = shallowMount(Register, {store,localVue})
    expect(wrapper.find('[data-test-id="title"]').exists()).toBe(true);
  });

  it("renders three labels", () => {
    const wrapper = shallowMount(Register, {store,localVue})
    expect(wrapper.findAll('[data-test-id="label"]').length).toBe(3);
  });

  it("renders input for name", async () => {
    const wrapper = shallowMount(Register, {store,localVue})
    expect(wrapper.find('[data-test-id="name"]').exists()).toBe(true);
  });

  it("renders input for email", async () => {
    const wrapper = shallowMount(Register, {store,localVue})
    expect(wrapper.find('[data-test-id="email"]').exists()).toBe(true);
  });

  it("renders input for password", async () => {
    const wrapper = shallowMount(Register, {store,localVue})
    expect(wrapper.find('[data-test-id="password"]').exists()).toBe(true);
  });

  it("renders button to register", async () => {
    const wrapper = shallowMount(Register, {store,localVue})
    expect(wrapper.find('[data-test-id="register-button"]').exists()).toBe(
      true
    );
  });

  it("renders switch form text", () => {
    const wrapper = shallowMount(Register, {store,localVue})
    expect(wrapper.find('[data-test-id="switch-form-text"]').exists()).toBe(true);
  });

  it("switches to register page", async () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(Register, {store,localVue, mocks: { $router: mockRouter }})
    await wrapper.find('[data-test-id="switch-form"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/login')
  });

  it("sets name, email and password", async () => {
    const wrapper = shallowMount(Register, {store,localVue})
    const name = wrapper.find('[data-test-id="name"]');
    const email = wrapper.find('[data-test-id="email"]');
    const password = wrapper.find('[data-test-id="password"]');
    await name.setValue("Default");
    await email.setValue("test@example.com");
    await password.setValue("Default");

    expect(name.element.value).toMatch("Default");
    expect(email.element.value).toMatch("test@example.com");
    expect(password.element.value).toMatch("Default");
  });

  it("register user", async () => {
    const wrapper = shallowMount(Register, {store,localVue})
    const name = wrapper.find('[data-test-id="name"]')
    const email = wrapper.find('[data-test-id="email"]')
    const password = wrapper.find('[data-test-id="password"]')
    await name.setValue('test')
    await email.setValue('test@example.com')
    await password.setValue('testing')
    await wrapper.find('[data-test-id="register-form"]').trigger('submit')

    expect(actions.register).toHaveBeenCalled()
  });
});