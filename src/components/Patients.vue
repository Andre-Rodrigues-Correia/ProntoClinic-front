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
            Informações: {{ patient.details }}<br/>
            Tel: {{ patient.phone }}
            
          </div>
          <div class="buttons-content">
            <button @click="confirmDelete(patient)"><font-awesome-icon class="icons" icon="eye" /></button>
            <button @click="editPatient(patient)"><font-awesome-icon class="icons" :icon="['fas', 'pen-to-square']" /></button>
            <button @click="viewPatient(patient)"><font-awesome-icon class="icons" :icon="['fas', 'trash']" /></button>
          </div>
          
        </li>
      </ul>
    </div>
  </template>
  
  <script>
//   import PatientDetails from './PatientDetails.vue'; // Substitua pelo caminho correto do seu componente
//   import EditPatientForm from './EditPatientForm.vue'; // Substitua pelo caminho correto do seu componente
//   import DeleteConfirmationModal from './DeleteConfirmationModal.vue'; // Substitua pelo caminho correto do seu componente



export default {
    name: 'Patients',
    data () {
        return {
            patients: [
                { id: 1, name: 'Paciente 1', details: 'Detalhes do paciente 1', phone: 28999999999, picture: 'https://media.licdn.com/dms/image/D4D03AQFQy51Nx2tyvQ/profile-displayphoto-shrink_800_800/0/1694208030122?e=2147483647&v=beta&t=OpDnha5BZuRD8Cf2wBvRcziHOqAlcyl9yDj78h0VohI'},
                { id: 2, name: 'Paciente 2', details: 'Detalhes do paciente 2', phone: 28999999999, picture: ''},
            ]
        } 
    }
}
  
  
  let selectedPatient = null;
  let selectedAction = null;
  
  const viewPatient = (patient) => {
    selectedPatient = patient;
    selectedAction = 'view';
  };
  
  const editPatient = (patient) => {
    selectedPatient = patient;
    selectedAction = 'edit';
  };
  
  const confirmDelete = (patient) => {
    selectedPatient = patient;
    selectedAction = 'delete';
  };
  
  const closeDetails = () => {
    selectedPatient = null;
    selectedAction = null;
  };
  
  const deletePatient = () => {
    // Lógica para excluir o paciente
    const index = patients.findIndex((p) => p.id === selectedPatient.id);
    if (index !== -1) {
      patients.splice(index, 1);
    }
    closeDetails();
  };
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
  