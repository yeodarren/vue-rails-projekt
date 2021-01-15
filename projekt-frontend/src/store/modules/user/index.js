import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default{
    namespaced: true,
    state(){
        return {
            userInfo: null,
            error: null,
            users: [],
        }
    },
    actions,
    mutations,
    getters
}