<template>
    <div class="clinic-infos-content">
      <div v-if="!editing">
        <label for="">Nome:</label>
        <p>{{ clinic.name }}</p>
        <label for="">Dono:</label>
        <p>{{ user.name }}</p>
        <div v-if="clinicUsers.length > 0">
            <h4>Médicos:</h4>
            <ul class="suggestions">
                <li v-for="(doc, index) in clinicUsers" :key="index">
                {{ doc.name }}
                </li>
            </ul>
        </div>
        
        <div v-if="clinic.receptionists.length > 0">
            <h4>Recepcionistas:</h4>
            <ul class="suggestions">
                <li v-for="(rec, index) in clinic.receptionists" :key="index">
                {{ rec.name }}
                </li>
            </ul>
        </div>
       
        <button class="create-button" @click="edit">Editar</button>
      </div>
  
      <div class="edit" v-else>
        <label for="">Nome:</label>
        <input type="text" v-model="clinic.name" placeholder="Nome">
        <button class="green-button" @click="save">Salvar</button>
        <button class="close-button" @click="cancel">Cancelar</button>
      </div>
    </div>
  </template>
  
  <script>
  import clinicService from '@/services/clinicService';
  import userService from '@/services/userService';
  export default {
    data() {
      return {
        clinic: {},
        user: {},
        clinicUsers: [],
        editing: false
      };
    },
    async created(){
      await this.getData();
    },
    methods: {
      async getData(){
        this.clinic = await clinicService.getClinicId(this.$route.params.clinicId);
        await this.getUsers();
        this.user = await userService.getUserById(this.$route.params.userId);
        console.log(this.user)
        console.log(this.$store.state.clinic.clinic)
      },
      edit() {
        this.editing = true;
      },
      async getUsers(){
        const users = this.clinic.users;
        users.map(async (u) => {
            try {
                console.log(doc)
                const user = await userService.getUserById(u);
                console.log(user)
                this.clinicUsers.push(user)
            } catch (error) {
                
            }
        })
      },
      async save() {
        // Aqui você pode adicionar a lógica para salvar as informações do médico
        this.editing = false;
        //await this.$store.dispatch('user/updateUser', this.user);
        console.log(this.clinic)
      },
      cancel() {
        // Aqui você pode adicionar a lógica para cancelar a edição e reverter as alterações
        // this.user = { ...this.userData };
        this.editing = false;
      },
    //   addSuggestion() {
    //     this.user.professionals.push({ name: '', data: '' });
    //   },
    //   removeSuggestion(index) {
    //     this.user.professionals.splice(index, 1);
    //   }
    }
  };
  </script>
  
  <style scoped>
  .clinic-infos-content{
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
  
  
  
    