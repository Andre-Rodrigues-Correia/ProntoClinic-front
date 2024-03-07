<template>
    <div>
      <h1>
        Tela inicial do atendimetno, quem sabe um resumo com ia do paciente ?
      </h1>
    </div>
  </template>
  
  <script>
import userService from '@/services/userService';

  export default {
        name: 'Historical',
        components: {
        
        },
        data () {
            return {
                appointments: [],
                existsAppoiments: false,
                showModal: false,
                patientId: null,
                doctorId: null,
                clinicId: null,
            } 
        },
        created (){
            this.getData();
        },
        methods: {
            async getData(){
              this.patientId = this.$route.query.patientId;  
              this.verifyClinicAndDoctorIds();
              this.createAppointment();
            },
            async createAppointment(){
              console.log(this.doctorId)
              const appointment ={
                patientId: this.patientId,
                doctorId: this.doctorId,
                clinicId: this.clinicId,
                status: 'started',
                local: this.clinicId,
                date: new Date()
              }
              await this.$store.dispatch('appointment/setAppointment', appointment);
            },
            verifyClinicAndDoctorIds(){
                this.setClinicAndDoctorIds();
            },
            setClinicAndDoctorIds(){
              this.doctorId = userService.getDoctorId();
              this.clinicId = userService.getClinicId();
            }
        }
    }
  </script>
  
  <style scoped>
  /* Adicione estilos específicos para o componente Inicio aqui */
  </style>
  