
const BASE_URL = "http://localhost:3000/doctor"
import axios from 'axios';

const userService = {
  getToken(){
    return localStorage.getItem('token');
  },
  getPayloadToken(token){
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload
  },
  async setClinicAndDoctorId(store){
    const token = this.getToken()
    const payloadToken = this.getPayloadToken(token);
    console.log(payloadToken)
    
    await store.dispatch('doctor/setDoctor', payloadToken._id);

    await store.dispatch('clinic/setClinic', payloadToken.clinicId);

  },
  getClinicId(){
    const token = this.getToken();
    const payloadToken = this.getPayloadToken(token);

    return payloadToken.clinicId;
  },
  getDoctorId(){
    const token = this.getToken()
    const payloadToken = this.getPayloadToken(token);

    return payloadToken._id;
  },
  async getUserById (userId) {
    try {
      const token = this.getToken();
      const config = {
        headers: {
            Authorization: token,
          },
      }
      console.log(userId)
      const response = await axios.get(`${BASE_URL}/${userId}`, config);
      console.log(response)
      return response.data.message;
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      throw error;
    }
  },

  async updateUser (user) {
    try {
      const token = this.getToken();
      const config = {
        headers: {
            Authorization: token,
          },
      }
      const response = await axios.put(`${BASE_URL}/${user._id}`, user, config);
      console.log(response)
      return response.data.message;
    } catch (error) {
      console.error('Erro ao atualizar o usuário:', error);
      throw error;
    }
  },
};

export default userService;
