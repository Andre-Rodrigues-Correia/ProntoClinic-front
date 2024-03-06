import axios from 'axios';
import userService from './userService';

const BASE_URL = "http://localhost:3000/patient"
//const BASE_URL = "https://prontoclinic.onrender.com/patient"


const patientService = {
  getPatients: async () => {
    try {
      const token = userService.getToken()
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.get(BASE_URL, config);
      return response.data.message;
    } catch (error) {
      console.error('Erro ao recuperar o usuário:', error);
      throw error;
    }
  },

  getPatientById: async (patientId) => {
    try {
      const token = userService.getToken()
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.get(`${BASE_URL}/${patientId}`, config);
      return response.data.message;
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      throw error;
    }
  },

  createPatient: async (patient) => {
    try {
      const token = userService.getToken()
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.post(`${BASE_URL}`, patient, config);
      return response.data.message;
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      throw error;
    }
  },

  editPatient: async (patient) => {
    try {
      const token = userService.getToken()
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.put(`${BASE_URL}/${patient._id}`, patient, config);
      return response.data.message;
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      throw error;
    }
  },


  deletePatient: async (patientId) => {
    try {
      const token = userService.getToken()
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.delete(`${BASE_URL}/${patientId}`, config);
      return response.data.message;
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      throw error;
    }
  },





};

export default patientService;
