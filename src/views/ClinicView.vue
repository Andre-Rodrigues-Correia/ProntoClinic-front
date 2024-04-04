<template>
    <div class="clinic-infos-content">
      <div v-if="!editing">
        <label for="">Nome:</label>
        <p>{{ clinic.name }}</p>
        <label for="">Dono:</label>
        <p>{{ doctor.name }}</p>
        <div v-if="clinicDoctors.length > 0">
            <h4>Médicos:</h4>
            <ul class="suggestions">
                <li v-for="(doc, index) in clinicDoctors" :key="index">
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
import doctorService from '@/services/doctorService';
  export default {
    data() {
      return {
        clinic: {},
        doctor: {},
        clinicDoctors: [],
        editing: false
      };
    },
    async created(){
      await this.getData();
    },
    methods: {
      async getData(){
        this.clinic = await clinicService.getClinicId(this.$route.params.clinicId);
        await this.getDoctors();
        this.doctor = await doctorService.getDoctorById(this.$route.params.doctorId);
        console.log(this.doctor)
        console.log(this.$store.state.clinic.clinic)
      },
      edit() {
        this.editing = true;
      },
      async getDoctors(){
        const doctors = this.clinic.doctors;
        doctors.map(async (doc) => {
            try {
                console.log(doc)
                const doctor = await doctorService.getDoctorById(doc);
                console.log(doctor)
                this.clinicDoctors.push(doctor)
            } catch (error) {
                
            }
        })
      },
      async save() {
        // Aqui você pode adicionar a lógica para salvar as informações do médico
        this.editing = false;
        //await this.$store.dispatch('doctor/updateDoctor', this.doctor);
        console.log(this.clinic)
      },
      cancel() {
        // Aqui você pode adicionar a lógica para cancelar a edição e reverter as alterações
        // this.doctor = { ...this.doctorData };
        this.editing = false;
      },
    //   addSuggestion() {
    //     this.doctor.professionals.push({ name: '', data: '' });
    //   },
    //   removeSuggestion(index) {
    //     this.doctor.professionals.splice(index, 1);
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
  
  
  
    