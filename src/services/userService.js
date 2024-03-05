import axios from 'axios';

const userService = {
  getUser: async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao recuperar o usuário:', error);
      throw error;
    }
  },
  getToken(){
    return localStorage.getItem('token');
  }
};

export default userService;
