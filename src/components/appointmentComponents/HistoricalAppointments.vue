<template>
    <div>

    
      <h1>Ainda por fazer</h1>
      <div v-if="existsAppoiments">
        <h2>O paciente ainda não possui consultas aqui!</h2>
      </div>
      <div v-else>
        <h2>Histórico de Atendimentos</h2>
        <ul>
          <li v-for="appointment in appointments" :key="appointment._id">
            <div> 
            </div>
            <div>
              Nome: {{ appointment.patientName }}
              Data da consulta: {{ appointment.date }}
              Queixa principel: {{ appointment.complaint }}     
            </div>
            <div class="buttons-content">
              <button @click="viewAppointment(appointment)"><font-awesome-icon class="icons" icon="eye" /></button>
            </div>
            
          </li>
        </ul>
      </div>
      <button class="create-button" @click="sendMenuNavigation('record')">Avançar!</button>
      <button class="create-button" @click="cancelAppointment()">Cancelar!</button>
  </div>
</template>


<script>
import appointmentService from '@/services/appointmentsService';

    export default {
        name: 'Historical',
        components: {
        
        },
        data () {
            return {
                appointments: [],
                existsAppoiments: false,
                showModal: false,
                patientId: null
            } 
        },
        created (){
            this.getData();
        },
        methods: {
            async getData(){
              this.patientId = this.$route.query.patientId;
              //this.appointments = appointmentService.getAppointmentsForPatient(this.patientId);
              console.log(this.$store.state.record.record)
              this.existsAppoiments = true,
              this.appointments = [
                {
                  patientName: 'Paciente',
                  date: '10/10/2010',
                  complaint: 'dor na perna'
                }
              ] //remover essa linha
            },
            viewAppointment(){
              this.showModal = true
            },
            sendMenuNavigation(destiny){
              this.$emit('sendMenu', destiny)
            },
            async cancelAppointment(){
              console.log(this.$store.state.appointment.appointment);
              console.log(this.$store.state.record.record)
              await this.$store.dispatch('appointment/cancelAppointment');
              await this.$store.dispatch('record/cancelRecord');
              console.log(this.$store.state.appointment.appointment);
              console.log(this.$store.state.record.record)
            }
        }
    }

</script>
<style>


</style>