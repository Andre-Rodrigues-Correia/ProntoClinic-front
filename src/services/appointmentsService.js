import axios from 'axios';
import userService from './userService';
import { format } from 'date-fns'

const BASE_URL = "http://localhost:3000/appointment"
//const BASE_URL = "https://prontoclinic.onrender.com/patient"


const appointmentService = {
  getAppointmentsForPatient: async (patientId) => {
    try {
      console.log(patientId)
      const token = userService.getToken()
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.get(`${BASE_URL}/patient/${patientId}`, config);
      return response.data.message;
    } catch (error) {
      console.error('Erro ao recuperar o usuário:', error);
      throw error;
    }
  },


  createAppointment: async (appointment) => {
    try {
      const token = userService.getToken()
      const config = {
        headers: {
            Authorization: token,
          },
      }
      console.log(appointment)
      const response = await axios.post(BASE_URL, appointment, config);
      return response.data.message;
    } catch (error) {
      console.error('Erro ao recuperar o usuário:', error);
      throw error;
    }
  },

  updateAppointment: async  (appointment) => {
    console.log(appointment)
    try {
      const token = userService.getToken()
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.put(`${BASE_URL}/${appointment._id}`, appointment, config);
      
      return response.data.message;
    } catch (error) {
      console.error('Erro ao atualizar o atendimento:', error);
      throw error;
    }
  },

  getAllAppointments: async  () => {
    try {
      const token = userService.getToken();
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.get(BASE_URL, config);

      const appointments = response.data.message.map((appointment) => {
        return {...appointment, date: format(appointment.date, 'MM-dd-yyyy')}
    });
      console.log(appointments)
      return appointments;
    } catch (error) {
      console.error('Erro ao atualizar o atendimento:', error);
      throw error;
    }
  },

  deleteAppointment: async  (appointmentId) => {
    console.log(appointmentId)
    try {
      const token = userService.getToken()
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.delete(`${BASE_URL}/${appointmentId}`, config);
      console.log(response)
      return response.data.message;
    } catch (error) {
      console.error('Erro ao deletar o atendimento:', error);
      throw error;
    }
  },


};

export default appointmentService;
