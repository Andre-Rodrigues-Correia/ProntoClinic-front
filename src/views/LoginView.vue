<template>
    <div class="login-container">
      <h2>Login</h2><br/>
      <form @submit.prevent="login" class="form-container">
        <label for="mail">E-mail:</label>
        <input type="mail" v-model="mail" required>
        
        <label for="password">Senha:</label>
        <input type="password" v-model="password" required>
        <div class="buttons-content">
          <button type="submit">Entrar</button>
          <button @click="this.$router.push({ name: 'signup' });">Cadastre-se</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
import userService from '@/services/userService';

  export default {
    data() {
      return {
        mail: '',
        password: '',
        clinic: null,
        doctor: null
      };
    },
    methods: {
      async login() {
        try {
          const response = await this.$axios.post('/auth/signin-doctor', {
            mail: this.mail,
            password: this.password,
          });
          
          console.log(response)
          
          const token = response.data.token

          localStorage.setItem('token', token);

          const payloadToken = userService.getPayloadToken(token)

          await this.$store.dispatch('doctor/setDoctor', payloadToken._id);
          this.doctor = this.$store.state.doctor.doctor;

          await this.$store.dispatch('clinic/setClinic', payloadToken.clinicId);
          this.clinic = this.$store.state.clinic.clinic;
          
          this.$router.push({ name: 'home', params: {clinicId: this.clinic, doctorId: this.doctor._id} });
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          // Tratar erros de login, exibir mensagem ao usuário, etc.
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 2rem auto;

    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.40);
  }

  .form-container {
    display: flex;
    flex-direction: column;
  }

  .buttons-content{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  
  label {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 8px;
  }
  
  button {
    width: 100%;
    background-color: var(--primary-color);
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 0.5rem;
  }

  button:hover {
    background-color: var(--secondary-color);
  }
  </style>
  