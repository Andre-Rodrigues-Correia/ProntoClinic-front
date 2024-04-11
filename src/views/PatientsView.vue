<template>
    <div class="content-container">
      <div class="sidebar">
        <ul>
          <li @click="showPatients">Pacientes</li>
          <li @click="showCreatePatient">Cadastrar Paciente</li>
        </ul>
      </div>
      <div class="inside-container">
        <div v-if="selectedOption === 'patients'"> 
          <Patients :clinicId="this.$route.params.clinicId" :userId="this.$route.params.userId"/>
        </div>
  
        <div v-if="selectedOption === 'createPatient'">
          <CreatePatient />
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import CreatePatient from '@/components/CreatePatient.vue';
    import Patients from '@/components/Patients.vue'
  
    export default {
      components: {
        CreatePatient,
        Patients
      },
      created (){
        console.log(this.$route.params.clinicId)
      },
      data() {
        return {
          selectedOption: 'patients',
        };
      },
      methods: {
      showPatients() {
        this.selectedOption = 'patients';
      },
      showCreatePatient() {
        this.selectedOption = 'createPatient';
      },
      }
    }
  
  </script>
  
  <style scoped>
  .content-container{
    display: flex;
    width: 80%;
    background-color: rgb(255, 255, 255);
    margin: 5rem auto 2rem; /* Add margin-top to make room for the header */
    padding: 2rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.40); /* Add a subtle box shadow */
    
  }
  
  .sidebar {
    padding: 10px;
    margin: 10px;
  }
  
  .inside-container {
    width: 80%;
    border: solid 1px;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.40); /* Add a subtle box shadow */
  }
  
  ul{
    list-style: none;
    font-weight: bold;
    text-align: center;
  
    padding: 10px;
  }
  
  li {
  
    margin: 10px;
    padding: 10px;
    cursor: pointer;
    border: solid 1px black;
    border-radius: 5px;
    background-color: white;
  }
  
  li:hover {
    background-color: #8188f5;
  }
  </style>
  
  