import mutations from "@/store/modules/team/mutations";

describe("team mutations", () => {
  it("sets selected team details", () => {
    const payload = {
      team: {
        id: 1,
        name: "default",
      },
      users: [
        {
          name: "test",
          email: "test@example.com",
        },
      ],
      projects: [
        {
          title: "title",
          description: "description",
        },
      ],
    };
    const state = {
      teamDetails: null,
    };

    mutations.setTeamDetails(state, payload);

    expect(state).toEqual({
      teamDetails: {
        team: {
          id: 1,
          name: "default",
        },
        users: [
          {
            name: "test",
            email: "test@example.com",
          },
        ],
        projects: [
          {
            title: "title",
            description: "description",
          },
        ],
      },
    });
  });

  it("deletes selected team user", () => {
    const id = 1
    const state = {
      teamDetails: {
        team: {
          id: 1,
          name: "default",
        },
        users: [
          {
            id: 1,
            name: "test",
            email: "test@example.com",
          },
          {
            id: 2,
            name: "test",
            email: "test@example.com",
          },
        ],
        projects: [
          {
            title: "title",
            description: "description",
          },
        ],
      }
    };

    mutations.deleteTeamUser(state, id);

    expect(state).toEqual({
      teamDetails: {
        team: {
          id: 1,
          name: "default",
        },
        users: [
          {
            id: 2,
            name: "test",
            email: "test@example.com",
          },
        ],
        projects: [
          {
            title: "title",
            description: "description",
          },
        ],
      }
    });
  });
});
