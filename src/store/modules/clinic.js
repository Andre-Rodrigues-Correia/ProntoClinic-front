import clinicService from "@/services/clinicService";

const state = {
  clinic: null,
};

const mutations = {
  SET_SELECTED_CLINIC(state, clinic) {
    state.clinic = clinic;
    console.log(clinic)
  },
  UPDATE_SELECTEDD_CLINIC(state, clinic) {
    state.clinic = clinic;
  },
};

const actions = {
 async setClinic({ commit }, clinicId) {
    try {
      //const response = await clinicService.getClinicById(clinicId);
      commit('SET_SELECTED_CLINIC', clinicId);
    } catch (error) {
      console.error('Error fetching clinics', error);
    }
  },
  async updateClinic({ commit }, clinic ) {
    try {
      console.log(clinic)
      const response = await clinicService.editPatient(clinic);
      commit('UPDATE_SELECTEDD_CLINIC', clinic );
    } catch (error) {
      console.error('Error updating clinic', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
