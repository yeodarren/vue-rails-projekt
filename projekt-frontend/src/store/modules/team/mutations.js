export default {
  setTeamDetails(state, payload){
    return state.teamDetails = payload
  },
  deleteTeamUser(state, id){
    const deletedUser = state.teamDetails.users.find(user => {
      return user.id === id
    })
    const indexOfDeletedUser = state.teamDetails.users.indexOf(deletedUser)
    return state.teamDetails.users.splice(indexOfDeletedUser, 1)
  }
}