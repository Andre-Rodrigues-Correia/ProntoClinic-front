<template>
  <div class="view-content">
    <div class="header-patient-content">
      <AppointmentHeader />
    </div>
    
    <div class="main-content">
      <div class="header-appointment-content">
      <header>
        <nav>
          <button v-if="!appointmentStarted" class="header-button" @click="startAppointiment('initial')">Iniciar</button>
          <button v-else class="header-button">{{ appointmentTime }}</button>
          <button class="header-button" @click="selectOption('historic')">Histórico</button>
          <button class="header-button" @click="selectOption('record')">Prontuário</button>
          <button class="header-button" @click="selectOption('exams')">Exames</button>
          <button class="header-button" @click="selectOption('recipes')">Receitas</button>
          <button class="header-button" @click="finishAppointment('finish')">Finalizar</button>
        </nav>
      </header>
    </div>

    <div class="appointment-content">
      <div v-if="selectedOption === 'initial'">
        <InitialAppointment />
      </div>

      <div v-if="selectedOption === 'historic'">
        <HistoricalAppointments  @sendMenu="navigateAppointment"/>
      </div>

      <div class="medical-record" v-if="selectedOption === 'record'">
        <MedicalRecord @sendMenu="navigateAppointment"/>
      </div>

      <div class="medical-record" v-if="selectedOption === 'exams'">
        <Exams @sendMenu="navigateAppointment"/>
      </div>

      <div v-if="selectedOption === 'recipes'">
        <Recipes @sendMenu="navigateAppointment"/>
      </div>

      <div v-if="selectedOption === 'finish'">

        <ResumeAppointment />
      
        <button @click="navigateAppointment('recipes')">Voltar</button>
        <button @click="finishAppointment">Finalizar atendimetno</button>
      </div>

    </div>
    </div>
  </div>
</template>

<script>
import AppointmentHeader from '@/components/AppointmentHeader.vue'
import AutoCompleteText from '@/components/AutoCompleteText.vue';
import InitialAppointment from '@/components/appointmentComponents/InitialAppointment.vue'
import HistoricalAppointments from '@/components/appointmentComponents/HistoricalAppointments.vue'
import MedicalRecord from '@/components/appointmentComponents/MedicalRecord.vue'
import Exams from '@/components/appointmentComponents/Exams.vue';
import Recipes from '@/components/appointmentComponents/Recipes.vue';
import recordService from '@/services/recordService';
import ResumeAppointment from '@/components/appointmentComponents/ResumeAppointment.vue'
import userService from '@/services/userService';


export default {
  components: {
    AppointmentHeader,
    AutoCompleteText,
    InitialAppointment,
    HistoricalAppointments,
    MedicalRecord,
    Exams,
    Recipes,
    ResumeAppointment
  
  },
  data() {
    return {
      selectedOption: 'initial',
      appointmentStarted: false,
      time: 0,
      stopwatch: null,
    }
  },
  computed: {
      appointmentTime() {
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    },
  created (){
      this.getData();
  },
  methods: {
    async getData(){
    },
    selectOption(option){
      this.selectedOption = option;
    },
    startAppointiment(){
      this.selectedOption = 'historic'
      this.appointmentStarted = true
      this.stopwatch = setInterval(() => {
          this.time++;
        }, 1000);
    },
    finishAppointment(){
      this.appointmentStarted = false
      this.time= 0
      this.stopwatch = null
      this.createAppointment();
    },
    navigateAppointment(menu){
      this.selectedOption = menu;
    },
    async createAppointment(){
      const doctorid = userService.getDoctorId();
      const patientId = this.$route.query.patientId;

      const record = {
        patientId: patientId,
        doctorId: doctorid,
        medicalRecord: {...this.$store.state.record.record}
      }
      const response = await recordService.createRecord(record);
      console.log(response)
      console.log(this.$store.state.appointment.appointment)
    },
  },
};
</script>


<style scoped>

  .main-content{
    width: 100%;

    display: flex;
    overflow: auto;
    align-items: center;
    flex-direction: column;
  }

  .header-appointment-content{
    width: 100%;
    display: flex;
  }

  .view-content{
    margin-bottom: 2rem;
  }

  .header-button {
    text-decoration: none;
    color: black;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
    padding: 0.5rem 1.0rem;
    border: solid 1px;
    border-radius: 10px;
    margin-left: 2rem;

  }

  .appointment-content{
    display: flex;
    width: 80%;
    margin: auto;
  }

.header-button:hover {
    background-color: #8188f5;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.medical-record{
  display: flex;
  width: 100%;
}

header {
  display: flex;
    flex-direction: column;
    width: 80%;
    
    justify-content: space-between;
    align-items: center;
    margin: auto;
    padding: 1rem;
  }


</style>
