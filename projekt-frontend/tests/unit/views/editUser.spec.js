import { shallowMount, createLocalVue } from "@vue/test-utils";
import EditUser from "@/views/EditUser.vue";
import Vuelidate from "vuelidate";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuelidate);
localVue.use(Vuex);
localVue.mixin({
  methods: {
    $elvis: jest.fn()
  }
});

describe("EditUser.vue", () => {
  let actions;
  let getters;
  let store;

  const userInfo = {
    user: {
      name: "test",
      email: "test@example.com",
    },
  };

  beforeEach(() => {
    actions = {
      updateUser: jest.fn(),
      updateUserName: jest.fn(),
      updateUserEmail: jest.fn(),
    };
    getters = {
      getUserInfo: () => userInfo,
    };
    store = new Vuex.Store({
      modules: {
        user: {
          namespaced: true,
          actions,
          getters,
        },
      },
    });
  });

  it("renders a container", () => {
    const wrapper = shallowMount(EditUser, { store, localVue });
    expect(wrapper.find('[data-test-id="container"]').exists()).toBe(true);
  });

  it("renders a edit form", async () => {
    const wrapper = shallowMount(EditUser, { store, localVue });
    expect(wrapper.find('[data-test-id="edit-form"]').exists()).toBe(true);
  });

  it("renders title", () => {
    const wrapper = shallowMount(EditUser, { store, localVue });
    expect(wrapper.find('[data-test-id="title"]').exists()).toBe(true);
  });

  it("renders three labels", () => {
    const wrapper = shallowMount(EditUser, { store, localVue });
    expect(wrapper.findAll('[data-test-id="label"]').length).toBe(3);
  });

  it("renders input for name", async () => {
    const wrapper = shallowMount(EditUser, { store, localVue });
    expect(wrapper.find('[data-test-id="name"]').exists()).toBe(true);
  });

  it("renders input for email", async () => {
    const wrapper = shallowMount(EditUser, { store, localVue });
    expect(wrapper.find('[data-test-id="email"]').exists()).toBe(true);
  });

  it("renders input for password", async () => {
    const wrapper = shallowMount(EditUser, { store, localVue });
    expect(wrapper.find('[data-test-id="password"]').exists()).toBe(true);
  });

  it("renders button to update", async () => {
    const wrapper = shallowMount(EditUser, { store, localVue });
    expect(wrapper.find('[data-test-id="update-button"]').exists()).toBe(
      true
    );
  });

  // it("matches email and password to userInfo", async () => {
  //   const wrapper = shallowMount(EditUser, { store, localVue });
  //   const name = wrapper.find('[data-test-id="name"]');
  //   const email = wrapper.find('[data-test-id="email"]');

  //   expect(name.element.value).toMatch("test");
  //   expect(email.element.value).toMatch("test@example.com");
  // });

  it("updates user", async () => {
    const wrapper = shallowMount(EditUser, { store, localVue });
    const name = wrapper.find('[data-test-id="name"]');
    const email = wrapper.find('[data-test-id="email"]');
    const password = wrapper.find('[data-test-id="password"]');
    await name.setValue("test");
    await email.setValue("test@example.com");
    await password.setValue("testing");
    await wrapper.find('[data-test-id="edit-form"]').trigger("submit");

    expect(actions.updateUser).toHaveBeenCalled();
  });
});
