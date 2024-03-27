

const state = {
  exam: null,
};

const mutations = {
  SET_EXAM(state, exam) {
    state.exam = exam;
  },
  UPDATE_EXAM(state, exam) {
    state.exam = exam;
  },
  CANCEL_EXAM(state){
    state.exam = null;
  }
};

const actions = {
 async setExam({ commit }, exam) {
    try {
      commit('SET_EXAM', exam);
    } catch (error) {
      console.error('Error fetching exams', error);
    }
  },
  async updateExam({ commit }, exam ) {
    try {
      commit('UPDATE_EXAM', exam );
    } catch (error) {
      console.error('Error updating exam', error);
    }
  },
  async cancelExam({ commit } ) {
    try {
      commit('CANCEL_EXAM' );
    } catch (error) {
      console.error('Error updating exam', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
