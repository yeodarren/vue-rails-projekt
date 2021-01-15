import mutations from "@/store/modules/user/mutations";

describe("user mutations", () => {
  it("sets userInfo to the state", () => {
    const user = {
      id: 1,
      name: "test",
      email: "test@example.com",
      password: "testing",
    };
    const state = {
      userInfo: null,
    };

    mutations.setUserInfo(state, user);

    expect(state).toEqual({
      userInfo: {
        id: 1,
        name: "test",
        email: "test@example.com",
        password: "testing",
      },
    });
  });

  it("sets error to the state", () => {
    const error = "error";
    const state = {
      error: null,
    };

    mutations.setError(state, error);

    expect(state).toEqual({
      error: "error",
    });
  });

  it("sets users to the state", () => {
    const users = [
      {
        id: 1,
        name: "test",
        email: "test@example.com",
        password: "testing",
      },
      {
        id: 2,
        name: "test",
        email: "test@example.com",
        password: "testing",
      },
    ];
    const state = {
      users: [],
    };

    mutations.setUsers(state, users);

    expect(state).toEqual({
      users: [
        {
          id: 1,
          name: "test",
          email: "test@example.com",
          password: "testing",
        },
        {
          id: 2,
          name: "test",
          email: "test@example.com",
          password: "testing",
        },
      ],
    });
  });

  it("updates user name in user info", () => {
    const name = "default";
    const state = {
      userInfo: {
        user: {
          id: 1,
          name: "test",
          email: "test@example.com",
          password: "testing",
        },
      },
    };

    mutations.updateUserName(state, name);

    expect(state).toEqual({
      userInfo: {
        user: {
          id: 1,
          name: "default",
          email: "test@example.com",
          password: "testing",
        }
      }
    });
  });

  it("updates user email in user info", () => {
    const email = "default@example.com";
    const state = {
      userInfo: {
        user: {
          id: 1,
          name: "test",
          email: "test@example.com",
          password: "testing",
        },
      },
    };

    mutations.updateUserEmail(state, email);

    expect(state).toEqual({
      userInfo: {
        user: {
          id: 1,
          name: "test",
          email: "default@example.com",
          password: "testing",
        }
      }
    });
  });
});
