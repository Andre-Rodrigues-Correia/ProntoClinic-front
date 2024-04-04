import doctorService from "@/services/doctorService";



const state = {
  doctor: null,
};

const mutations = {
  SET_SELECTED_DOCTOR(state, doctor) {
    state.doctor = doctor;
  },
  UPDATE_SELECTEDD_DOCTOR(state, doctor) {
    state.doctor = doctor;
  },
};

const actions = {
 async setDoctor({ commit }, doctorId) {
    try {
      const response = await doctorService.getDoctorById(doctorId);
      commit('SET_SELECTED_DOCTOR', response);
    } catch (error) {
      console.error('Error fetching doctors', error);
    }
  },
  async updateDoctor({ commit }, doctor ) {
    try {
      console.log(doctor)
      const response = await doctorService.updateDoctor(doctor);
      commit('UPDATE_SELECTEDD_DOCTOR', doctor );
    } catch (error) {
      console.error('Error updating doctor', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
