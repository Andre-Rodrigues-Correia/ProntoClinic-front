<template>
    <div class="code-validation-container">
      <div class="title">
        <h2>Validação de Código</h2>
        <p>Um código de validação foi enviado para o e-mail: {{ userEmail }}.</p>
      </div>
      
      <div class="code-content">
        <label for="validationCode">Digite o código para validar sua conta: </label>
        <input v-model="validationCode" type="text" id="validationCode" placeholder="Código de validação" required>
        <button @click="validateCode">Validar</button>
      </div>
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        validationCode: null,
      };
    },
    computed: {
      userEmail() {
        return this.$route.query.mail;
      },
    },
    methods: {
      async validateCode() {
        try {
          const response = await this.$axios.post('/doctor/activate', {
          mail: this.$route.query.mail,
          code: this.validationCode
        });

        alert('Sua conta foi validada!')
        this.$router.push({ name: 'home' });
        }catch (e){
          alert('Erro ao validar conta!')
          console.error('Erro ao validar conta:', error);
        }
        
      },
    },
  };
  </script>
  
  <style scoped>
  .code-validation-container{
    max-width: 400px;
    margin: 2rem auto;

    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.40);
  }

  .title{
    margin-bottom: 1rem;
  }
  .code-content{
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
  }

  label {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: bold;
    text-align: start;
  }

  button {
    background-color: var(--primary-color);
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 0.2rem;
  }

  button:hover {
    background-color: var(--secondary-color);
  }

  </style>
  