<template>
  <div class="user-infos-content">
    <div v-if="!editing">
      <h2>{{ user.name }}</h2>
      <p>E-mail: {{ user.mail }}</p>
      <p>Data de Nascimento: {{ user.birthday }}</p>
      <p>CPF: {{ user.cpf }}</p>
      <p>Telefone: {{ user.phone }}</p>
      <h4>Sugestões:</h4>
      <ul class="suggestions">
        <li v-for="(suggestion, index) in user.suggestions" :key="index">
          {{ suggestion.name }} - {{ suggestion.data }}
        </li>
      </ul>
      <br>
      <button class="create-button" @click="edit">Editar</button>
    </div>

    <div class="edit" v-else>
      <label for="">Nome:</label>
      <input type="text" v-model="user.name" placeholder="Nome">
      <label for="">Data de nascimento:</label>
      <input type="date" v-model="user.birthday" placeholder="Data de Nascimento">
      <label for="">CPF:</label>
      <input type="text" v-model="user.cpf" placeholder="CPF">
      <label for="">Telefone:</label>
      <input type="text" v-model="user.phone" placeholder="Telefone">
      <div>
        <h3>Sugestões:</h3>
        <div v-for="(suggestion, index) in user.suggestions" :key="index" class="suggestions">
          <input type="text" v-model="suggestion.name" placeholder="Nome">
          <input type="text" v-model="suggestion.data" placeholder="Data">
          <button class="close-button" @click="removeSuggestion(index)">Remover</button>
        </div>
        <button class="create-button buttons" @click="addSuggestion">Adicionar Sugestão</button>
      </div>
    </div>
    <br>
    <hr>
    <br>
      <button class="green-button" @click="save">Salvar</button>
      <button class="close-button" @click="cancel">Cancelar</button>
      
  </div>
</template>

<script>
import doctorService from '@/services/doctorService';
import userService from '@/services/userService';
export default {
  data() {
    return {
      user: {},
      editing: false
    };
  },
  async created(){
    await this.getData();
  },
  methods: {
    async getData(){
      this.user = this.$store.state.user.user;
      console.log(this.user)
    },
    edit() {
      this.editing = true;
    },
    async save() {
      // Aqui você pode adicionar a lógica para salvar as informações do médico
      this.editing = false;
      await this.$store.dispatch('user/updateDoctor', this.user);
      console.log(this.user)
    },
    cancel() {
      // Aqui você pode adicionar a lógica para cancelar a edição e reverter as alterações
      // this.user = { ...this.userData };
      this.editing = false;
    },
    addSuggestion() {
      this.user.suggestions.push({ name: '', data: '' });
    },
    removeSuggestion(index) {
      this.user.suggestions.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.user-infos-content{
  width: 80%;
  margin: auto;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
}

ul{
  list-style: none;
}

li{
  list-style: none;
}

select {
  width: 20%;
  height: 25px;
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
  border: solid 1px black;
  border-radius: 5px;
  padding: px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

input {
  width: 20%;
  height: 25px;
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
  border: solid 1px black;
  border-radius: 5px;
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

label {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bold;
}

.suggestions{
  border: 1px solid black;
  padding: 1rem;
  margin: 1rem;
}

.edit{
  display: flex;
  flex-direction: column;
}

p{
  margin-bottom: 0.3rem;
}
    
</style>



  