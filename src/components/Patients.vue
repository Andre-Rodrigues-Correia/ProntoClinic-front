<template>
    <div>
      <h2>Lista de Pacientes</h2>
      <ul>
        <li v-for="patient in patients" :key="patient.id">
          <div>
            <div v-if="patient.picture" class="picture">
              <img :src="patient.picture" alt="" width="40">
            </div>
            <div v-else class="picture">
              <font-awesome-icon :icon="['fas', 'user']" />
            </div>
            
          </div>
          <div>
            Nome: {{ patient.name }}<br/>
            Informações: {{ patient.mail }}<br/>
            Tel: {{ patient.phone }}
            
          </div>
          <div class="buttons-content">
            <button @click="appointment(patient)"><span>Iniciar atendimento</span></button>
            <button @click="viewPatient(patient)"><font-awesome-icon class="icons" icon="eye" /></button>
            <button @click="editPatient(patient)"><font-awesome-icon class="icons" :icon="['fas', 'pen-to-square']" /></button>
            <button @click="deletePatient(patient)"><font-awesome-icon class="icons" :icon="['fas', 'trash']" /></button>
          </div>
          
        </li>
      </ul>
    </div>
    <PatientDetailsModal :patient="selectedPatient" v-if="showModal" @close="closeModal"/>
    <EditPatientModal :patient="selectedPatient" v-if="showModalEdit" @save="saveChanges" @close="closeEditModal"/>

  </template>
  
  <script>
import patientService from '@/services/patientService';
import PatientDetailsModal from './PatientDetailsModal.vue';
import EditPatientModal from './EditPatient.vue'




export default {
    name: 'Patients',
    components: {
      PatientDetailsModal,
      EditPatientModal
    },
    data () {
        return {
            patients: [],
            showModal: false,
            showModalEdit: false,
            selectedPatient: null
        } 
    },
    created (){
      this.getData();
    },
    methods: {
      async getData(){
        // this.patients = await patientService.getPatients();
        await this.$store.dispatch('patients/fetchPatients');
        this.patients = this.$store.state.patients.patients;
      },
      closeModal(){
        this.showModal = false
      },
      closeEditModal(){
        this.showModalEdit = false
      },
      viewPatient(patient){
        this.selectedPatient = patient
        this.showModal = true
      },
      editPatient(patient){
        this.selectedPatient = patient
        this.showModalEdit = true
      },
      async saveChanges(editedPatient){
        await this.$store.dispatch('patients/updatePatient', editedPatient);
        this.showModalEdit = false
      },
      async deletePatient(patient){
        await this.$store.dispatch('patients/deletePatient', patient._id);
        this.patients = this.$store.state.patients.patients;
      },
      appointment(patient){
        this.$router.push({ name: 'atendimentos', query: { patientId: patient._id } });
      }
    }
}
  </script>

<style scoped>

  ul {
    padding: 1rem;
    
  }

  li {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-weight: bold;
    list-style: none;
    display: flex;
    margin-bottom: 0.5rem;
  }

  h4{
    display: inline;
  }

  .buttons-content{
    display: flex;
    padding: 0.5rem;
    margin-left: auto;
  }

  .icons{
    padding: 0.8rem 2rem;
  }

  .picture {
    border: solid 1px;
    padding: 20px;
    min-width: 30px;
    max-width: 30px;
    min-height: 30px;
    max-height: 30px;
    text-align: center;
    margin-right: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.40); /* Add a subtle box shadow */
  }

  button {
    margin-right: 10px;
    cursor: pointer;
  }

  button:hover {
    background-color: var(--primary-color);
  }

</style>
  ./PatientDetailsModal.vue