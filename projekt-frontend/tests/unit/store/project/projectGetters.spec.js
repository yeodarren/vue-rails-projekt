import getters from "@/store/modules/project/getters";

describe('project getters', () => {
  it('returns userInfo', () => {
    const project = {
      project: {
        id: 1,
        title: 'title',
        description: 'description'
      }
    }
    
    const state = { project }

    const actual = getters.getProjectDetails(state)

    expect(actual).toEqual({
      project: {
        id: 1,
        title: 'title',
        description: 'description'
      }
    })
  })
})