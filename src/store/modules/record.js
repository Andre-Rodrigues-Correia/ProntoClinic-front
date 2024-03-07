import recordService from "@/services/recordService";



const state = {
  record: null,
};

const mutations = {
  SET_RECORD(state, record) {
    state.record = record;
  },
  UPDATE_RECORD(state, record) {
    state.record = record;
  },
  CANCEL_RECORD(state){
    state.record = null;
  }
};

const actions = {
 async setRecord({ commit }, record) {
    try {
      commit('SET_RECORD', record);
    } catch (error) {
      console.error('Error fetching records', error);
    }
  },
  async updateRecord({ commit }, record ) {
    try {
      commit('UPDATE_RECORD', record );
    } catch (error) {
      console.error('Error updating record', error);
    }
  },
  async cancelRecord({ commit } ) {
    try {
      commit('CANCEL_RECORD' );
    } catch (error) {
      console.error('Error updating record', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
