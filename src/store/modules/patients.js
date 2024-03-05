import patientService from "@/services/patientService";

const state = {
  patients: [],
};

const mutations = {
  SET_PATIENTS(state, patients) {
    state.patients = patients;
  },
  ADD_PATIENT(state, patient) {
    state.patients.push(patient);
  },
  UPDATE_PATIENT(state, patient) {
    const index = state.patients.findIndex((p) => p._id === patient._id);
    if (index !== -1) {
      state.patients.splice(index, 1, patient);
    }
  },
  DELETE_PATIENT(state, patientId) {
    state.patients = state.patients.filter((p) => p._id != patientId);
  },
};

const actions = {
 async fetchPatients({ commit }) {
    try {
      const response = await patientService.getPatients();
      console.log(response)
      commit('SET_PATIENTS', response);
    } catch (error) {
      console.error('Error fetching patients', error);
    }
  },
  async addPatient({ commit }, patient) {
    try {
      const response = await patientService.createPatient(patient)
      commit('ADD_PATIENT', response.data);
    } catch (error) {
      console.error('Error adding patient', error);
    }
  },
  async updatePatient({ commit }, patient ) {
    try {
      console.log(patient)
      const response = await patientService.editPatient(patient);
      commit('UPDATE_PATIENT', patient );
    } catch (error) {
      console.error('Error updating patient', error);
    }
  },
  async deletePatient({ commit }, patientId) {
    try {
      const response = await patientService.deletePatient(patientId);
      commit('DELETE_PATIENT', patientId);
    } catch (error) {
      console.error('Error deleting patient', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
