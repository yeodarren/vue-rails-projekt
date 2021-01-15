import getters from "@/store/modules/team/getters";

describe('team getters', () => {
  it('returns team details', () => {
    const teamDetails = {
      team: {
        id: 1,
      name: "default"
      },
      users: [
        {
          name: "test",
          email: "test@example.com"
        }
      ],
      projects: [{
        title: "title",
        description: "description"
      }]
    }
    
    const state = { teamDetails }

    const actual = getters.getTeamDetails(state)

    expect(actual).toEqual({
      team: {
        id: 1,
      name: "default"
      },
      users: [
        {
          name: "test",
          email: "test@example.com"
        }
      ],
      projects: [{
        title: "title",
        description: "description"
      }]
    })
  })
})