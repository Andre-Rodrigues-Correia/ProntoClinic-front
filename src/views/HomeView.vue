<template>
  <div class="content-container">
    <div class="message-user-content">
      <h2>
        Olá {{ user?.name ? user.name : 'Doutor' }}, abaixo suas consultas de hoje, dia {{ getFormatedDate() }}
      </h2>
    </div>


    <div class="appointments-content">
      <div v-for="(appointment, index) in appointments" :key="index">
        <div class="appointment-content">
          <p>Paciente: {{ getInfoForPatient(appointment.patientId) }}</p>
          <p>horário: {{ appointment.hour }}</p>
          <p>Status: {{ statusMap[appointment.status] }}</p>
          
          <div class="appointments-buttons">
            <button @click="startAppointment(appointment)" >Iniciar atendimento</button>
            <button>Ver peciete</button>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import CreatePatient from '@/components/CreatePatient.vue';
  import Patients from '@/components/Patients.vue'
  import appointmentService from '@/services/appointmentsService';
  import doctorService from '@/services/doctorService';
  import patientService from '@/services/patientService';
  import appointment from '@/store/modules/appointment';
  import { format } from 'date-fns';
  import { mapActions } from 'vuex';

  export default {
    components: {
      
    },
    async created (){
      console.log(this.$route.params.clinicId)
      await this.getData()
    },
    data() {
      return {
        user: null,
        appointments: [],
        today: new Date(),
        doctorNames: [],
        patientNames: [],
        statusMap: {
          scheduled: 'agendada',
          completed: 'finalizada',
          started: 'iniciada'
      }

      };
    },
    methods: {
      ...mapActions('appointment', ['setAppointment']),
      async getData(){
        const appointments = await appointmentService.getAllAppointments();
        this.appointments = this.getAppointmentsForDay(appointments)
        console.log(this.appointments)
        this.doctorNames = await doctorService.getDoctorsForMakeAppointment();
        this.patientNames = await patientService.getPatients();
        this.user = this.$store.state.user.user;
      },
      getAppointmentsForDay(appointments){
        console.log(this.getFormatedDate(this.today))
        console.log(appointments)
          return appointments.filter((appointment) => format(appointment.date, 'dd-MM-yyyy') == this.getFormatedDate(this.today) && appointment.status !== 'completed')
      },
      getFormatedDate(){
        return format(this.today, 'dd-MM-yyyy')
      },
      getInfoForDoctor(doctorId){
        const doctor = this.doctorNames.find((doctor) => doctor._id == doctorId)
        return doctor?.name ? doctor.name : ''
      },
      getInfoForPatient(patientId){
        const patient = this.patientNames.find((patient) => patient._id == patientId)
        return patient?.name ? patient.name : ''
      },
      async startAppointment(appointment){
        console.log(appointment)
        await this.setAppointment(appointment)
        console.log(this.$store.state.appointment.appointment)
        // await this.$store.dispatch('appointment/setAppointment', appointment);
        // console.log(this.$store.state.appointment.appointment)
        this.$router.push({ name: 'atendimento', params: { appointmentId: appointment._id } });
      }
    }
  }

</script>

<style scoped>
.content-container{
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: rgb(255, 255, 255);
  margin: 5rem auto 2rem; /* Add margin-top to make room for the header */
  padding: 2rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.40); /* Add a subtle box shadow */
  
}

.message-user-content{
  margin: auto;
  margin-bottom: 1rem;
}

.appointments-content{
  margin: auto;
}

.appointment-content{
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 1rem;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.appointments-buttons{
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
}
</style>

