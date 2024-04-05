import userService from "@/services/userService";

const state = {
  user: null,
};

const mutations = {
  SET_SELECTED_USER(state, user) {
    state.user = user;
  },
  UPDATE_SELECTEDD_USER(state, user) {
    state.user = user;
  },
};

const actions = {
 async setUser({ commit }, userId) {
    try {
      console.log(userId)
      const response = await userService.getUserById(userId);
      console.log(response)
      commit('SET_SELECTED_USER', response);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  },
  async updateUser({ commit }, user ) {
    try {
      console.log(user)
      const response = await userService.updateUser(user);
      commit('UPDATE_SELECTEDD_USER', user );
    } catch (error) {
      console.error('Error updating user', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
