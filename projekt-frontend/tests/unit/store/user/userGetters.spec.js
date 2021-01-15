import getters from "@/store/modules/user/getters";

describe('user getters', () => {
  it('returns userInfo', () => {
    const userInfo = {
      user: {
        id: 1,
        name: "test",
        email: "test@example.com",
        password: "testing",
      }
    }
    
    const state = { userInfo }

    const actual = getters.getUserInfo(state)

    expect(actual).toEqual({
      user: {
        id: 1,
        name: "test",
        email: "test@example.com",
        password: "testing",
      }
    })
  })

  it('returns userInfo', () => {
    const error = "error"
    
    const state = { error }
    
    const actual = getters.getError(state)

    expect(actual).toEqual("error")
  })

  it('returns users', () => {
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
      }
    ],
    
    state = { users }
    
    const actual = getters.getUsers(state)

    expect(actual).toEqual([
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
    ],)
  })
})