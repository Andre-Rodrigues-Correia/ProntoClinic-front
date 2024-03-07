import patientService from "@/services/patientService";

const state = {
  appointment: null,
};

const mutations = {
  SET_APPOINTMENT(state, appointment) {
    state.appointment = appointment;
    console.log(state.appointment)
  },
  UPDATE_APPOINTMENT(state, appointment) {
    state.appointment = appointment;
  },
  CANCEL_APPOINTMENT(state){
    state.appointment = null;
  }
};

const actions = {
 async setAppointment({ commit }, appointment) {
    try {
      commit('SET_APPOINTMENT', appointment);
    } catch (error) {
      console.error('Error fetching appointment', error);
    }
  },
  async updateAppointment({ commit }, appointment ) {
    try {
      console.log(appointment)
      commit('UPDATE_APPOINTMENT', appointment );
    } catch (error) {
      console.error('Error updating patient', error);
    }
  },

  async cancelAppointment({ commit }) {
    try {
      commit('CANCEL_APPOINTMENT');
    } catch (error) {
      console.error('Error updating patient', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
