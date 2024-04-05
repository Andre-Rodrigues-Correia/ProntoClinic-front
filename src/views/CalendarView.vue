<template>
  <div class="content-calendar">
    <div class="controls">
      <button @click="previousWeek">Semana Anterior</button>
      <button @click="nextWeek">Próxima Semana</button>
    </div>
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="day in week" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="hour in hours" :key="hour">
          <td>{{ hour }}</td>
          <td v-for="day in week" :key="day">
            <div v-if="isCellEmpty(day, hour)">
              <button @click="addAppointment(day, hour)">Adicionar Consulta</button>
            </div>
            <div v-else>
              <div v-for="appointment in getAppointments(day, hour)" :key="appointment.id">
                {{ appointment.doctor }} - {{ appointment.patient }}
                <button @click="editAppointment(appointment)">Editar</button>
                <button @click="deleteAppointment(appointment.id)">Apagar</button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      week: [],
      hours: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
      appointments: [
    {
        "id": 1712329478275,
        "doctor": "asd",
        "patient": "asd",
        "date": "31/03/2024",
        "hour": "09:00",
        "clinicId": "asd"
    },
    {
        "id": 1712329478275,
        "doctor": "asd",
        "patient": "asd",
        "date": "01/04/2024",
        "hour": "09:00",
        "clinicId": "asd"
    }
],
      currentWeekStart: new Date()
    };
  },
  methods: {
    updateWeek() {
      const weekStart = new Date(this.currentWeekStart);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      const formattedWeek = [];

      for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
        formattedWeek.push(d.toLocaleDateString("pt-BR"));
      }

      this.week.splice(0, this.week.length, ...formattedWeek);
    },
    addAppointment(day, hour) {
      const doctor = prompt("Digite o nome do médico:");
      const patient = prompt("Digite o nome do paciente:");
      const clinicId = prompt("Digite o ID da clínica:");
      if (doctor && patient && clinicId) {
        const appointment = {
          id: Date.now(),
          doctor: doctor,
          patient: patient,
          date: day,
          hour: hour,
          clinicId: clinicId
        };
        this.appointments.push(appointment);
      }
      console.log(this.appointments)
    },
    editAppointment(appointment) {
      const newDoctor = prompt("Digite o novo nome do médico:", appointment.doctor);
      const newPatient = prompt("Digite o novo nome do paciente:", appointment.patient);
      if (newDoctor && newPatient) {
        appointment.doctor = newDoctor;
        appointment.patient = newPatient;
      }
    },
    deleteAppointment(appointmentId) {
      if (confirm("Tem certeza que deseja apagar essa consulta?")) {
        this.appointments = this.appointments.filter(appointment => appointment.id !== appointmentId);
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
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid black;
  padding: 8px;
}

.controls {
  margin-bottom: 20px;
}

</style>
