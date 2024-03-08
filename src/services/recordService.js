import axios from 'axios';
import userService from './userService';

const BASE_URL = "http://localhost:3000/record"
//const BASE_URL = "https://prontoclinic.onrender.com/patient"


const recordService = {

  createRecord: async (record) => {
    try {
      const token = userService.getToken();
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.post(BASE_URL, record, config);
      console.log(response)
      return response.data.message;
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      throw error;
    }
  },

  getRecordsForPatient: async (patientId) => {
    try {
      const token = userService.getToken()
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.get(`${BASE_URL}/patient/${patientId}`, config);
      console.log(response)
      return response.data.message;
    } catch (error) {
      console.error('Erro ao recuperar o usuário:', error);
      throw error;
    }
  },


};

export default recordService;
