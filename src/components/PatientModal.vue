<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Informações do paciente</h2>
      <div class="modal-content">
        <h3>{{ patient.name }}</h3>
        <p>Telefone: <span>{{ patient.phone }}</span> </p>
        <p>Email: <span>{{ patient.mail }}</span></p>
        <p>Sexo Biológico: <span>{{ getGenderName(patient.biologicalSex)}}</span></p>
        <p>CPF: <span>{{ patient.cpf }}</span></p>
        <p>Data de Nascimento: <span>{{ patient.birthday }}</span></p>

        <!-- Adicione mais campos conforme necessário -->

        <button class="close-button" @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientModal',
  props: {
    patient: {
      type: Object,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    getGenderName(gender) {
      const genderMap = {
        'M': 'Masculino',
        'F': 'Feminino',
        'O': 'Outro' // Adicione mais opções conforme necessário
      };

      return genderMap[gender] || 'Desconhecido';
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
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(68, 67, 67, 0.4);
}

.modal-content {
  /* Adicione estilos conforme necessário */
}

button {
  margin-top: 10px;
}

p, h3 {
  margin: 1rem;
}

span {
    font-weight: bold;
}

h2{
  text-align: center;
}

button{
  margin: 1rem;
}

</style>
