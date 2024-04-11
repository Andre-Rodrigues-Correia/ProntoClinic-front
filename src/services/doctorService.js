import axios, { all } from 'axios';
import userService from './userService';

const BASE_URL = "http://localhost:3000/doctor"
//const BASE_URL = "https://prontoclinic.onrender.com/patient"


const doctorService = {

  getDoctorsForMakeAppointment: async () => {
    try {
      const token = userService.getToken();
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.get(BASE_URL, config);
      const allDoctor = response.data.message.map((doctor) => {
        return {...doctor, label: doctor.name, value: doctor._id}
      })
      return allDoctor;
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      throw error;
    }
  },

  // getDoctorById: async (doctorId) => {
  //   try {
  //     const token = userService.getToken();
  //     const config = {
  //       headers: {
  //           Authorization: token,
  //         },
  //     }
  //     const response = await axios.get(`${BASE_URL}/${doctorId}`, config);
  //     console.log(doctorId)
  //     return response.data.message;
  //   } catch (error) {
  //     console.error('Erro ao atualizar o usuário:', error);
  //     throw error;
  //   }
  // },

  // updateDoctor: async (doctor) => {
  //   try {
  //     const token = userService.getToken()
  //     const config = {
  //       headers: {
  //           Authorization: token,
  //         },
  //     }
  //     const response = await axios.put(`${BASE_URL}/${doctor._id}`, doctor, config);
  //     console.log(response)
  //     return response.data.message;
  //   } catch (error) {
  //     console.error('Erro ao atualizar o usuário:', error);
  //     throw error;
  //   }
  // },

};

export default doctorService;
