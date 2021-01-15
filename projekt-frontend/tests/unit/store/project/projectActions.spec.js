import actions from "@/store/modules/project/actions";

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
      body = _body;
      resolve(true);
    });
  },
  delete: (_url) => {
    return new Promise((resolve) => {
      if (mockError) throw Error();

      url = _url;
      resolve(true);
    });
  },
}));

describe("project actions", () => {
  it("creates a project", async () => {
    const dispatch = jest.fn();
    const payload = {
      title: "title",
      description: "description",
      team_id: 1,
      image_url: "imageUrl"
    };

    await actions.createProject({ dispatch }, payload);

    expect(url).toBe("http://localhost:3000/api/projects");
    expect(body).toEqual(payload);
    expect(dispatch).toHaveBeenCalledWith("user/setUserProjects", {}, {"root": true});
  });

  it("sets project details", async () => {
    const commit = jest.fn();
    const id = 1

    await actions.setProjectDetails({ commit }, id);

    expect(url).toBe("http://localhost:3000/api/projects/1");
    expect(commit).toHaveBeenCalledWith("setProjectDetails", undefined);
  });

  it("updates project title", async () => {
    const commit = jest.fn();
    const title = "title"

    await actions.updateTitle({ commit }, title);

    // expect(url).toBe("http://localhost:3000/api/projects/1");
    expect(commit).toHaveBeenCalledWith("updateTitle", title);
  });

  it("updates project description", async () => {
    const commit = jest.fn();
    const description = "description"

    await actions.updateDescription({ commit }, description);

    // expect(url).toBe("http://localhost:3000/api/projects/1");
    expect(commit).toHaveBeenCalledWith("updateDescription", description);
  });

  it("updates a project", async () => {
    const dispatch = jest.fn();
    const payload = {
      title: "title",
      description: "description",
      id: 1,
      image_url: "imageUrl"
    };

    await actions.updateProject({ dispatch }, payload);

    expect(url).toBe("http://localhost:3000/api/projects/1");
    expect(body).toEqual(payload);
    expect(dispatch).toHaveBeenCalledWith("user/setUserProjects", {}, {"root": true});
  });

  it("deletes a project", async () => {
    const dispatch = jest.fn();
    const id = 1

    await actions.deleteProject({ dispatch }, id);

    expect(url).toBe("http://localhost:3000/api/projects/1");
    expect(dispatch).toHaveBeenCalledWith("user/setUserProjects", {}, {"root": true});
  });

  it("catches an error when create project", async () => {
    mockError = true;

    await expect(
      actions.createProject({ dispatch: jest.fn() }, {})
    ).rejects.toThrow("Error");
  });

  it("catches an error when set project details", async () => {
    mockError = true;

    await expect(
      actions.setProjectDetails({ commit: jest.fn() }, {})
    ).rejects.toThrow("Error");
  });

  it("catches an error when update project", async () => {
    mockError = true;

    await expect(
      actions.updateProject({ dispatch: jest.fn() }, {})
    ).rejects.toThrow("Error");
  });

  it("catches an error when delete project", async () => {
    mockError = true;

    await expect(
      actions.deleteProject({ dispatch: jest.fn() }, {})
    ).rejects.toThrow("Error");
  });
});
