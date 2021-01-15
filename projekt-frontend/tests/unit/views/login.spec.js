import { shallowMount, createLocalVue } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuelidate)
localVue.use(Vuex)

describe("Login.vue", () => {
  let actions
  let getters
  let store

  beforeEach(() => {
    actions = {
      login: jest.fn()
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
    const wrapper = shallowMount(Login, {store,localVue})
    expect(wrapper.find('[data-test-id="container"]').exists()).toBe(true);
  });

  it("renders a login form", () => {
    const wrapper = shallowMount(Login, {store,localVue})
    expect(wrapper.find('[data-test-id="login-form"]').exists()).toBe(true);
  });

  it("renders title", () => {
    const wrapper = shallowMount(Login, {store,localVue})
    expect(wrapper.find('[data-test-id="title"]').exists()).toBe(true);
  });

  it("renders two labels", () => {
    const wrapper = shallowMount(Login, {store,localVue})
    expect(wrapper.findAll('[data-test-id="label"]').length).toBe(2);
  });

  it("renders input for email", () => {
    const wrapper = shallowMount(Login, {store,localVue})
    expect(wrapper.find('[data-test-id="email"]').exists()).toBe(true);
  });

  it("renders input for password", () => {
    const wrapper = shallowMount(Login, {store,localVue})
    expect(wrapper.find('[data-test-id="password"]').exists()).toBe(true);
  });

  it("renders button to login", () => {
    const wrapper = shallowMount(Login, {store,localVue})
    expect(wrapper.find('[data-test-id="login-button"]').exists()).toBe(true);
  });

  it("renders switch form text", () => {
    const wrapper = shallowMount(Login, {store,localVue})
    expect(wrapper.find('[data-test-id="switch-form-text"]').exists()).toBe(true);
  });

  it("switches to register page", async () => {
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = shallowMount(Login, {store,localVue, mocks: { $router: mockRouter }})
    await wrapper.find('[data-test-id="switch-form"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/register')
  });
  
  it("sets email and password", async () => {
    const wrapper = shallowMount(Login, {store,localVue})
    const email = wrapper.find('[data-test-id="email"]')
    const password = wrapper.find('[data-test-id="password"]')
    await email.setValue('test@example.com')
    await password.setValue('Default')

    expect(email.element.value).toMatch('test@example.com')
    expect(password.element.value).toMatch('Default')
  });

  it("log user in", async () => {
    const wrapper = shallowMount(Login, {store,localVue})
    const email = wrapper.find('[data-test-id="email"]')
    const password = wrapper.find('[data-test-id="password"]')
    await email.setValue('test@example.com')
    await password.setValue('testing')
    await wrapper.find('[data-test-id="login-form"]').trigger('submit')

    expect(actions.login).toHaveBeenCalled()
  });
});
