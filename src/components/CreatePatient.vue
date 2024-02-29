<template>
  <div class="create-container">
    <h2>Cadastrar Paciente</h2><br/>
    <form @submit.prevent="createPatient" class="form-content">
      <label for="patientName">Nome:</label><br/>
      <input v-model="patient.name" type="text" id="patientName" placeholder="Nome" required><br/>
      <label for="patientMail">E-mail:</label><br/>
      <input v-model="patient.mail" type="text" id="patientMail" placeholder="E-mail" required><br/>
      <label for="patientCpf">CPF:</label><br/>
      <input v-model="patient.cpf" type="text" id="patientCpf" placeholder="CPF" required><br/>
      <label for="patientPhone">Telefone:</label><br/>
      <input v-model="patient.phone" type="text" id="patientPhone" placeholder="Telefone" required><br/>
      <label for="patientBirthday">Data de Nascimento:</label><br/>
      <input v-model="patient.birthday" type="date" id="patientBirthday" required><br/>
      <label for="patientSex">Sexo:</label><br/>
      <select v-model="patient.biologicalSex" id="patientSex" required>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
      </select><br/><br/>

      

      <button type="submit" class="create-button">Cadastrar</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'CreatePatient',
    data() {
      return {
        patient: {
          name: null,
          mail: null,
          cpf: null,
          phone: null,
          birthday: null,
          biologicalSex: null,
        }
      };
    },
    methods: {
      createPatient(){
        alert(this.patient.name)
        console.log(this.patient)
      }
    }
  }

</script>


<style scoped>

.create-container {
  margin: 1.5rem;
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
    
</style>