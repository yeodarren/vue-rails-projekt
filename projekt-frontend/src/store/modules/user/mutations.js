export default{
  setUserInfo(state, user){
    return state.userInfo = user
  },
  setError(state, error){
    return state.error = error
  },
  setUsers(state, payload){
    return state.users = payload
  },
  updateUserName(state, name){
    return state.userInfo.user.name = name
  },
  updateUserEmail(state, email){
    return state.userInfo.user.email = email
  }
}