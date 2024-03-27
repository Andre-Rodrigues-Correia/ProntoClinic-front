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

        props: {
          clinicId: {
            type: String,
            required: true,
          },
          doctorId: {
            type: String,
            required: true,
          },
          appointmentId: {
            type: String,
            required: true,
          }
        },
        data () {
            return {
                appointments: [],
                existsAppoiments: false,
                showModal: false,
            } 
        },
        created (){
            this.getData();
        },
        methods: {
            async getData(){
              this.appointments = await recordService.getRecordsForPatient(this.$store.state.appointment.appointment.patientId)
            },
        }
    }
  </script>
  
  <style scoped>
  /* Adicione estilos específicos para o componente Inicio aqui */
  </style>
  