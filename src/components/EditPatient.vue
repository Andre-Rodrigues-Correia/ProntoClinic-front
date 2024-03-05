<template>
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <h2>Editar Informações</h2>
          <form @submit.prevent="saveChanges">
            <div class="form-group">
              <label for="clinicId">Id da clínica:</label>
              <input class="readonly-input " v-model="editedPatient.clinic" :readonly="true"/>
            </div>
            <div class="form-group">
              <label for="name">Nome:</label>
              <input v-model="editedPatient.name" />
            </div>
            <div class="form-group">
              <label for="phone">Telefone:</label>
              <input v-model="editedPatient.phone" />
            </div>
            <div class="form-group">
              <label for="mail">Email:</label>
              <input v-model="editedPatient.mail" />
            </div>
            <div class="form-group">
              <label for="biologicalSex">Sexo Biológico:</label>
              <input v-model="editedPatient.biologicalSex" />
            </div>
            <div class="form-group">
              <label for="cpf">CPF:</label>
              <input v-model="editedPatient.cpf" />
            </div>
            <div class="form-group">
              <label for="birthday">Data de Nascimento:</label>
              <input v-model="editedPatient.birthday" />
            </div>
  
            <!-- Adicione mais campos conforme necessário -->
            <div class="buttons-content">
                <button class="create-button" type="submit">Salvar Alterações</button>
                <button class="close-button" @click="closeEditModal">Fechar</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EditPatientModal',
    props: {
      patient: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        editedPatient: { ...this.patient }, // Clone do paciente para edição
      };
    },
    methods: {
      saveChanges() {
        // Lógica para salvar as alterações no paciente
        this.$emit('save', this.editedPatient);
        this.$emit('close');
      },
      closeEditModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para o modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .modal-content {
    padding: auto;
  }
  
  form {
    max-width: 500px;
    width: 100%;
    margin: auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }

  input {
    display: flex;
    width: 100%;
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
    border: solid 1px black;
    border-radius: 5px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

  .readonly-input {
      background-color: #f2f2f2; /* Cor de fundo cinza */
      color: #888; /* Cor de texto mais escura para dar a aparência de desativado */
      pointer-events: none; /* Impede a interação do usuário com o campo */
    }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .buttons-content{
    width: 100%;
    display: flex;
    
  }
  button{
    width: 100%;
  }
  </style>
  