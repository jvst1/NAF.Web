export const state = () => ({
    user: null
})

export const mutations = {
    setUser(state, value) {
        state.user = value
    }
}

export const actions = {
    async setUser({ commit }, data) {
        commit('setUser', data)
    }
}

export const getters = {
    user: state => state.user
}
