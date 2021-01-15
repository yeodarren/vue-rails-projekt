export default {
  setProjectDetails(state, payload){
    return state.project = payload
  },
  updateTitle(state, payload){
    return state.project.project.title = payload
  },
  updateDescription(state, payload){
    return state.project.project.description = payload
  }
}