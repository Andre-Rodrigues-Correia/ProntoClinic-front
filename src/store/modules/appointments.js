import patientService from "@/services/patientService";
import appointment from "./appointment";
import appointmentService from "@/services/appointmentsService";

const state = {
  appointment: [],
};

const mutations = {
  SET_APPOINTMENTS(state, appointments) {
    state.appointments = appointments;
    console.log(state.appointments)
  },
  ADD_APPOINTMENT(state, appointment){
    state.appointments.push(appointment);
  },
  UPDATE_APPOINTMENT(state, appointment) {
    const index = state.appointments.findIndex((app) => app._id === appointment._id);
    if (index !== -1) {
      state.appointments.splice(index, 1, appointment);
    }
  },
  DELETE_APPOINTMENT(state, appointmentId){
    state.appointments = state.appointments.filter((app) => app._id != appointmentId);
  }
};

const actions = {
 async setAppointments({ commit }) {
    try {
      const appointments = await appointmentService.getAllAppointments();
      console.log(appointments)
      commit('SET_APPOINTMENTS', appointments);
    } catch (error) {
      console.error('Error fetching appointment', error);
    }
  },
  async addAppointment ({ commit}, appointment){
    try {
      await appointmentService.createAppointment(appointment);
      commit('ADD_APPOINTMENT', appointment );
    } catch (error) {
      console.error('Error create patient', error);
    }
  },
  async updateAppointment({ commit }, appointments ) {
    try {
      console.log(appointments)
      commit('UPDATE_APPOINTMENT', appointments );
    } catch (error) {
      console.error('Error updating patient', error);
    }
  },

  async deleteAppointment({ commit }, appointmentId) {
    try {
      console.log('aqui')
      const response = await appointmentService.deleteAppointment(appointmentId);
      console.log(response)
      commit('DELETE_APPOINTMENT');
    } catch (error) {
      console.error('Error delete appointment', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
