import patientService from "@/services/patientService";

const state = {
  patient: null,
};

const mutations = {
  SET_SELECTED_PATIENT(state, patient) {
    state.patient = patient;
  },
  UPDATE_SELECTEDD_PATIENT(state, patient) {
    state.patient = patient;
  },
};

const actions = {
 async setPatient({ commit }, patientId) {
    try {
      const response = await patientService.getPatientById(patientId);
      commit('SET_SELECTED_PATIENT', response);
    } catch (error) {
      console.error('Error fetching patients', error);
    }
  },
  async updatePatient({ commit }, patient ) {
    try {
      console.log(patient)
      const response = await patientService.editPatient(patient);
      commit('UPDATE_SELECTEDD_PATIENT', patient );
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
