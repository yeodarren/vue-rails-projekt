import actions from "@/store/modules/team/actions";

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
      resolve(true);
    });
  },
  put: (_url, _body) => {
    return new Promise((resolve) => {
      if (mockError) throw Error();

      url = _url;
      body = _body
      resolve(true);
    });
  },
  delete: (_url) => {
    return new Promise((resolve) => {
      if (mockError) throw Error();

      url = _url;
      resolve(true);
    });
  }
}));

describe("team actions", () => {
  it("creates a team", async () => {
    const dispatch = jest.fn();
    const payload = {
      name: "test",
      user_ids: [1,2,3]
    };

    await actions.createTeam({ dispatch }, payload);

    expect(url).toBe("http://localhost:3000/api/teams");
    expect(body).toEqual(payload);
    expect(dispatch).toHaveBeenCalledWith("user/setUserTeams", {}, {"root": true});
  });

  it("sets team details", async () => {
    const commit = jest.fn();
    const id = 1

    await actions.setTeamDetails({ commit }, id);

    expect(url).toBe("http://localhost:3000/api/teams/1");
    expect(commit).toHaveBeenCalledWith("setTeamDetails", undefined);
  });

  it("updates the team", async () => {
    const dispatch = jest.fn();
    const payload = {
      id: "1",
      name: "test",
      user_ids: [1,2,3]
    };

    await actions.updateTeam({ dispatch }, payload);

    expect(url).toBe("http://localhost:3000/api/teams/1");
    expect(body).toEqual(payload);
    expect(dispatch).toHaveBeenCalledWith("user/setUserTeams", {}, {"root": true});
  });

  it("deletes the team", async () => {
    const dispatch = jest.fn();
    const id = 1

    await actions.deleteTeam({ dispatch }, id);

    expect(url).toBe("http://localhost:3000/api/teams/1");
    expect(dispatch).toHaveBeenCalledWith("user/setUserTeams", {}, {"root": true});
  });

  it("catches an error when create team", async () => {
    mockError = true;

    await expect(
      actions.createTeam({ dispatch: jest.fn() }, {})
    ).rejects.toThrow("Error");
  });

  it("catches an error when set team details", async () => {
    mockError = true;

    await expect(
      actions.setTeamDetails({ commit: jest.fn() }, {})
    ).rejects.toThrow("Error");
  });

  it("catches an error when update team details", async () => {
    mockError = true;

    await expect(
      actions.setTeamDetails({ dispatch: jest.fn() }, {})
    ).rejects.toThrow("Error");
  });

  it("catches an error when delete team details", async () => {
    mockError = true;

    await expect(
      actions.deleteTeam({ dispatch: jest.fn() }, {})
    ).rejects.toThrow("Error");
  });
});
