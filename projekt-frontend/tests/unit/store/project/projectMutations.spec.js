import mutations from "@/store/modules/project/mutations";

describe("project mutations", () => {
  it("sets project details", () => {
    const payload = {
      project: {
        title: 'title',
        description: 'description'
      },
      team: {
        name: "team"
      },
      user: {
        name: "test",
        email: "test@example.com",
      }
    };
    const state = {
      project: null,
    };

    mutations.setProjectDetails(state, payload);

    expect(state).toEqual({
      project: {
        project: {
          title: 'title',
          description: 'description'
        },
        team: {
          name: "team"
        },
        user: {
          name: "test",
          email: "test@example.com",
        },
      },
    });
  });

  it("updates project title", () => {
    const payload = "project title"
    const state = {
      project: {
        project: {
          title: 'title',
          description: 'description'
        },
        team: {
          name: "team"
        },
        user: {
          name: "test",
          email: "test@example.com",
        },
      },
    };

    mutations.updateTitle(state, payload);

    expect(state).toEqual({
      project: {
        project: {
          title: 'project title',
          description: 'description'
        },
        team: {
          name: "team"
        },
        user: {
          name: "test",
          email: "test@example.com",
        },
      },
    });
  });

  it("updates project description", () => {
    const payload = "project description"
    const state = {
      project: {
        project: {
          title: 'title',
          description: 'description'
        },
        team: {
          name: "team"
        },
        user: {
          name: "test",
          email: "test@example.com",
        },
      },
    };

    mutations.updateDescription(state, payload);

    expect(state).toEqual({
      project: {
        project: {
          title: 'title',
          description: 'project description'
        },
        team: {
          name: "team"
        },
        user: {
          name: "test",
          email: "test@example.com",
        },
      },
    });
  });
});
