import axios from 'axios';
import userService from './userService';

const BASE_URL = "http://localhost:3000/doctor"
//const BASE_URL = "https://prontoclinic.onrender.com/patient"


const doctorService = {


  getDoctorById: async (doctorId) => {
    try {
      const token = userService.getToken();
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.get(`${BASE_URL}/${doctorId}`, config);
      console.log(doctorId)
      return response.data.message;
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      throw error;
    }
  },

};

export default doctorService;
