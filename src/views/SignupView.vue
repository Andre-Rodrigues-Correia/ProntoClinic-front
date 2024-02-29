<template>
    <div class="login-container">
        <div class="title">
            <h2>Cadastre-se</h2> <h5 @click="this.$router.push({ name: 'login' });">já possui uma conta ?</h5>
        </div>
      <br/>
      <form @submit.prevent="login" class="form-container">
        <label for="name">Nome completo:</label>
        <input type="text" v-model="user.name" placeholder="Nome completo" required>

        <label for="mail">E-mail:</label>
        <input type="mail" v-model="user.mail" placeholder="E-mail" required>
        
        <label for="password">Senha:</label>
        <input type="password" v-model="user.password" placeholder="Senha" required>

        <label for="cpf">CPF:</label>
        <input v-model="user.cpf" type="text" id="cpf" placeholder="CPF" required>

        <label for="phone">Telefone:</label>
        <input v-model="user.phone" type="text" id="phone" placeholder="Telefone" required>

        <label for="birthday">Data de Nascimento:</label>
        <input v-model="user.birthday" type="date" id="birthday" required>

        <label for="sex">Sexo:</label>
        <select v-model="user.biologicalSex" id="sex" required>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
        </select>

        <label for="specialty">Especialidade:</label>
        <input v-model="user.specialty" type="text" id="specialty" placeholder="Especialidade" required>


        <br/><br/>
        <button type="submit">Cadastre-se</button>
      </form>

    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
            name: null,
            mail: null,
            password: null,
            birthday: null,
            phone: null,
            biologicalSex: null,
            cpf: null,
            specialty: null,
        }
      };
    },
    methods: {
      async login() {
        try {
          const response = await this.$axios.post('/doctor', this.user);
  
          // Salvar o token JWT no armazenamento local
          console.log(response)
  
          // Redirecionar para a rota "home"
          this.$router.push({ name: 'validateAccount', query: { mail: this.user.mail } });
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

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

  }

  h5 {
    color: var(--primary-color);
    cursor: pointer;
  }

  
  label, select {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: bold;
    margin-bottom: 5px;
  }

  
  input {
    margin-bottom: 10px;
    padding: 8px;
  }
  
  button {
    background-color: var(--primary-color);
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--secondary-color);
  }
  </style>
  