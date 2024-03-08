<template>
    <div>
      <h1>
        Tela inicial do atendimetno, quem sabe um resumo com ia do paciente ?
        Ajustar a rota no back para retornar os nomes certos nome do peciente e do medico ao invés do ID
      </h1>
      
      <div>
        <h2>Lista de Atendimentos</h2>
        <ul>
          <li v-for="appointment in appointments" :key="appointment._id.$oid">
            <strong>Médico:</strong> {{ appointment.doctorId.$oid }}<br>
            <strong>paciente:</strong> {{ appointment.patientId.$oid }}<br>
            <hr>
          </li>
        </ul>
      </div>

    </div>
  </template>
  
  <script>
import appointmentService from '@/services/appointmentsService';
import recordService from '@/services/recordService';
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
              this.appointments = await recordService.getRecordsForPatient(this.patientId)
              console.log(this.appointments)
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
  