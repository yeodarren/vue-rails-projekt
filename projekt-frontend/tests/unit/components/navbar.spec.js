import { mount, createLocalVue } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Navbar.vue', () => {
  let store
  let getters
  let actions
  const userInfo = {
    user: {
      name: "test"
    }
  }

  beforeEach(() => {
    getters = {
      getUserInfo: () => userInfo
    }
    actions = {
      logout: jest.fn()
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

  it('renders navbar', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="navbar"]').exists()).toBe(true);
  })

  it('renders logo', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="logo"]').exists()).toBe(true);
  })

  it('renders nav-links', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="nav-links"]').exists()).toBe(true);
  })

  it('does not render sign in link when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="sign-in"]').exists()).toBe(false);
  })

  it('does not render sign up link when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="sign-up"]').exists()).toBe(false);
  })

  it('renders edit user link when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="edit-user"]').exists()).toBe(true);
  })

  it('routes to edit user page', async () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = mount(Navbar, { store, localVue, mocks: {$router: mockRouter}, stubs: {transition: transitionStub() }})
    await wrapper.find('[data-test-id="edit-user"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/edit_user')
  })

  it('renders create project link when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="create-project"]').exists()).toBe(true);
  })

  it('routes to create project page', async () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = mount(Navbar, { store, localVue, mocks: {$router: mockRouter}, stubs: {transition: transitionStub() }})
    await wrapper.find('[data-test-id="create-project"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/create_project')
  })

  it('renders create team link when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="create-team"]').exists()).toBe(true);
  })

  it('routes to create team page', async () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = mount(Navbar, { store, localVue, mocks: {$router: mockRouter}, stubs: {transition: transitionStub() }})
    await wrapper.find('[data-test-id="create-team"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/create_team')
  })

  it('renders sign out link when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="sign-out"]').exists()).toBe(true);
  })

  it('logs user out', async () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, stubs: {transition: transitionStub() }})
    await wrapper.find('[data-test-id="sign-out"]').trigger('click')

    expect(actions.logout).toHaveBeenCalled()
  })

  it('renders menu button', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="menu-button"]').exists()).toBe(true);
  })

  it('renders navigation drawer', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="navigation-drawer"]').exists()).toBe(true);
  })

  it('renders close button in navigation drawer', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="close-button"]').exists()).toBe(true);
  })

  it('renders list items in navigation drawer', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="list-items"]').exists()).toBe(true);
  })

  it('does not render sign in link in navigation drawer when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="list-sign-in"]').exists()).toBe(false);
  })

  it('does not render sign up link in navigation drawer when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="list-sign-up"]').exists()).toBe(false);
  })

  it('renders edit user link in navigation drawer when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="list-edit-user"]').exists()).toBe(true);
  })

  it('routes to edit user page from navigation drawer', async () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });

    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, mocks: {$router: mockRouter}, stubs: {transition: transitionStub() }})
    await wrapper.find('[data-test-id="list-edit-user"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/edit_user')
  })

  it('renders create project link in navigation drawer when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="list-create-project"]').exists()).toBe(true);
  })

  it('routes to create project page from navigation drawer', async () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });

    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, mocks: {$router: mockRouter}, stubs: {transition: transitionStub() }})
    await wrapper.find('[data-test-id="list-create-project"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/create_project')
  })

  it('renders create team link in navigation drawer when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="list-create-team"]').exists()).toBe(true);
  })

  it('routes to create team page from navigation drawer', async () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });

    const mockRouter = {
      push: jest.fn()
    }
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, mocks: {$router: mockRouter}, stubs: {transition: transitionStub() }})
    await wrapper.find('[data-test-id="list-create-team"]').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/create_team')
  })

  it('renders sign out link in navigation drawer when logged in', () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, stubs: {transition: transitionStub() }})
    expect(wrapper.find('[data-test-id="list-sign-out"]').exists()).toBe(true);
  })

  it('logs user out from navigation drawer', async () => {
    const transitionStub = () => ({
      render: function(h) {
        return this.$options._renderChildren;
      },
    });
    const wrapper = mount(Navbar, { store, localVue, data(){ return { navigationDrawer: true }}, stubs: {transition: transitionStub() }})
    await wrapper.find('[data-test-id="list-sign-out"]').trigger('click')

    expect(actions.logout).toHaveBeenCalled()
  })
  
})