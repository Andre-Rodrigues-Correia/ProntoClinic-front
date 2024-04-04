import axios from 'axios';
import userService from './userService';

const BASE_URL = "http://localhost:3000/clinic"
//const BASE_URL = "https://prontoclinic.onrender.com/patient"


const clinicService = {


  getClinicId: async (clinicId) => {
    try {
      const token = userService.getToken();
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.get(`${BASE_URL}/${clinicId}`, config);
      console.log(clinicId)
      return response.data.message;
    } catch (error) {
      console.error('Erro ao atualizar o clinica:', error);
      throw error;
    }
  },

};

export default clinicService;
