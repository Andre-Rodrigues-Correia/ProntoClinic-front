<template>
  <div class="content-calendar">
    <div class="controls">
      <button class="create-button" @click="previousWeek">Semana Anterior</button>
      <button class="create-button" @click="nextWeek">Próxima Semana</button>
    </div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="day in week" :key="day">{{ formatExibitionDate(day) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hour in hours" :key="hour">
          <td>{{ hour }}</td>
          <td v-for="day in week" :key="day">
            <div v-if="isCellEmpty(day, hour)">
              <button class="add-button" @click="showModal(day, hour)">Adicionar Consulta</button>
            </div>
            <div v-else class="appointment-content">
              <div class="appointment" v-for="appointment in getAppointments(day, hour)" :key="appointment.id">
                <div class="appointment-infos">
                  <p>
                    Médico: {{ getInfoForDoctor(appointment.doctorId)  }}
                  </p>
                  <p>
                    Paciente: {{ getInfoForPatient(appointment.patientId) }}
                  </p>
                  <p>

                    Status: {{ statusMap[appointment.status] }}
                  </p>
                
                  
                </div>

                <div class="appointment-buttons">
                  <button @click="showEditModal(appointment)">Editar</button>
                  <button @click="deleteAppointmentId(appointment._id)">Apagar</button>
                </div>
                
                
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <MakeAppointmentModal :date="dateAppointment" :hour="hourAppointment" v-if="showAppointmentModal" @save="saveChanges" @close="closeModal"/>
    <EditAppointmentModal :appointment="selectedAppointment" v-if="showEditAppointmentModal" @save="saveEditChanges" @close="closeEditModal"/>
  </div>
</template>

<script>
import { format } from 'date-fns'
import MakeAppointmentModal from '@/components/generic/MakeAppointmentModal.vue';
import appointmentService from '@/services/appointmentsService';
import userService from '@/services/userService';
import doctorService from '@/services/doctorService';
import EditAppointmentModal from '@/components/generic/EditAppointmentModal.vue';
import { mapActions } from 'vuex';
import patientService from '@/services/patientService';
export default {
  components: {
    MakeAppointmentModal,
    EditAppointmentModal
  },
  async created(){
    await this.getData()
  },
  data() {
    return {
      showAppointmentModal: false,
      showEditAppointmentModal: false,
      selectedAppointment: {},
      dateAppointment: null,
      hourAppointment: null,
      doctorName: null,
      week: [],
      hours: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
      appointments: [],
      doctorNames: [],
      patientNames: [],
      currentWeekStart: new Date(),
      statusMap: {
        scheduled: 'agendada',
        completed: 'finalizada',
        started: 'iniciada'
      }
    };
  },
  methods: {
    ...mapActions('appointments', ['setAppointments', 'deleteAppointment']),
    async getData(){
      await this.setAppointments();
      this.appointments = this.$store.state.appointments.appointments;
      console.log(this.appointments)
      this.doctorNames = await doctorService.getDoctorsForMakeAppointment();
      this.patientNames = await patientService.getPatients();
    },
    getInfoForDoctor(doctorId){
      const doctor = this.doctorNames.find((doctor) => doctor._id == doctorId)
      return doctor?.name ? doctor.name : ''
    },
    getInfoForPatient(patientId){
      const patient = this.patientNames.find((patient) => patient._id == patientId)
      return patient?.name ? patient.name : ''
    },
    updateWeek() {
      const weekStart = new Date(this.currentWeekStart);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      const formattedWeek = [];

      for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
        formattedWeek.push(format(d, 'MM-dd-yyyy'));
      }

      this.week.splice(0, this.week.length, ...formattedWeek);
    },
    async deleteAppointmentId(appointmentId) {
      if (confirm("Tem certeza que deseja apagar essa consulta?")) {
        const response = await this.deleteAppointment(appointmentId);
        await this.setAppointments();
        this.appointments = this.$store.state.appointments.appointments;
        console.log(response)
      }
    },
    isCellEmpty(day, hour) {
      return this.getAppointments(day, hour).length === 0;
    },
    getAppointments(day, hour) {
      return this.appointments.filter(appointment => appointment.date === day && appointment.hour === hour);
    },
    previousWeek() {
      this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
      this.updateWeek();
    },
    nextWeek() {
      this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
      this.updateWeek();
    },
    showEditModal(appointment){
      this.selectedAppointment = appointment;
      this.showEditAppointmentModal = true
    },
    showModal(day, hour){
      console.log(day)
      this.dateAppointment = day;
      this.hourAppointment = hour
      this.showAppointmentModal = true
    },
    closeEditModal(){
      this.showEditAppointmentModal = false;
    },
    closeModal(){
      this.showAppointmentModal = false
    },
    async saveChanges(){
      this.showAppointmentModal = false
      await this.setAppointments();
      this.appointments = this.$store.state.appointments.appointments;
    },
    saveEditChanges(){
      this.showEditAppointmentModal = false;
    },
    formatExibitionDate(day){
      return format(day, 'dd-MM-yyyy')
    }
  },
  mounted() {
    this.updateWeek();
  }
};
</script>

<style scoped>

.content-calendar{
  width: 80%;
  margin: auto;
  margin-bottom: 20px;
}

.add-button{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 35px;
  background-color: var(--green-color);;
  border: 1px solid var(--green-color);;
  border-radius: 5px;
  cursor: pointer
}

.add-button:hover {
  background-color: white;
  color: var(--secondary-color);
}

.controls{
  display: flex;
  justify-content: space-between
}

.appointment-content{
  width: 100%;

}

.appointment-infos{
  display: flex;
  flex-direction: column;
}

.appointment-buttons{
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 2px;
  justify-content: space-between;
}

table {
  margin-top: 1rem;
  background-color: var(--terciary-color);
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid black;
  padding: 8px;
}

p{
  font-size: small;
}

</style>
