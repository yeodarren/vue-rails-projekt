import actions from "@/store/modules/user/actions";

let url = "";
let body = {};
let mockError = false;

jest.mock("axios", () => ({
  post: (_url, _body) => {
    return new Promise((resolve) => {
      if (mockError) throw Error();

      url = _url;
      body = _body;
      resolve(true);
    });
  },
  get: (_url) => {
    return new Promise((resolve) => {
      if (mockError) throw Error();

      url = _url;
      // config = _config;
      resolve(true);
    });
  },
  put: (_url, _body) => {
    return new Promise((resolve) => {
      if (mockError) throw Error();

      url = _url;
      body = _body;
      resolve(true);
    });
  },
}));


describe("user actions", () => {
  it("authenticates a user", async () => {
    const commit = jest.fn();
    const user = {
      email: "test@example.com",
      password: "testing",
    };

    await actions.login({ commit }, user);

    expect(url).toBe("http://localhost:3000/api/login");
    expect(body).toEqual(user);
    expect(commit).toHaveBeenCalledWith("setUserInfo", undefined);
    expect(commit).toHaveBeenCalledWith("setError", null);
  });

  it("registers a user", async () => {
    const commit = jest.fn();
    const user = {
      name: "test",
      email: "test@example.com",
      password: "testing",
    };

    await actions.register({ commit }, user);

    expect(url).toBe("http://localhost:3000/api/register");
    expect(body).toEqual(user);
    expect(commit).toHaveBeenCalledWith("setUserInfo", undefined);
    expect(commit).toHaveBeenCalledWith("setError", null);
  });

  it("logs user out", async () => {
    const commit = jest.fn();

    await actions.logout({ commit });

    expect(commit).toHaveBeenCalledWith("setUserInfo", null);
  });

  it("updates user info", async () => {

    const commit = jest.fn();

    await actions.updateUserInfo({ commit });

    expect(url).toBe("http://localhost:3000/api/auto_login");
    expect(commit).toHaveBeenCalledWith("setUserInfo", undefined);
  });

  it("updates user to the database", async () => {

    const commit = jest.fn();
    const payload = {
      id: 1,
      name: "test",
      email: "test@example.com",
      password: "testing",
    };

    await actions.updateUser({ commit }, payload);

    expect(url).toBe("http://localhost:3000/api/user/1");
    expect(commit).toHaveBeenCalledWith("setUserInfo", undefined);
  });

  it("updates user name in the state", async () => {
    const name = "test"
    const commit = jest.fn();

    await actions.updateUserName({ commit }, name);

    expect(commit).toHaveBeenCalledWith("updateUserName", name);
  });

  it("updates user email in the state", async () => {
    const email = "test@example.com"
    const commit = jest.fn();

    await actions.updateUserEmail({ commit }, email);

    expect(commit).toHaveBeenCalledWith("updateUserEmail", email);
  });

  it("sets user teams", async () => {
    const dispatch = jest.fn();

    await actions.setUserTeams({ dispatch });

    expect(dispatch).toHaveBeenCalledWith("updateUserInfo");
  });

  it("set user projects", async () => {
    const dispatch = jest.fn();

    await actions.setUserProjects({ dispatch });

    expect(dispatch).toHaveBeenCalledWith("updateUserInfo");
  });

  it("sets users to the state", async () => {

    const commit = jest.fn();

    await actions.setUsers({ commit });

    expect(url).toBe("http://localhost:3000/api/users");
    expect(commit).toHaveBeenCalledWith("setUsers", undefined);
  });

  it("catches an error when login", async () => {
    mockError = true;

    await expect(actions.login({ commit: jest.fn() }, {})).rejects.toThrow(
      "Error"
    );
  });

  it("catches an error when register", async () => {
    mockError = true;

    await expect(actions.register({ commit: jest.fn() }, {})).rejects.toThrow(
      "Error"
    );
  });

  it("catches an error when update user info", async () => {
    mockError = true;

    await expect(
      actions.updateUserInfo({ commit: jest.fn() }, {})
    ).rejects.toThrow("Error");
  });

  it("catches an error when update user info", async () => {
    mockError = true;

    await expect(
      actions.updateUser({ commit: jest.fn() }, {})
    ).rejects.toThrow("Error");
  });

  it("catches an error when set users", async () => {
    mockError = true;

    await expect(
      actions.setUsers({ commit: jest.fn() }, {})
    ).rejects.toThrow("Error");
  });
});
