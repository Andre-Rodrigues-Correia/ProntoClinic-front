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
          <button class="header-button" @click="selectOption('finish')">Finalizar</button>
        </nav>
      </header>
    </div>

    <div class="appointment-content">
      <div v-if="selectedOption === 'initial'">
        <h1>
          Ainda por fazer, clique em iniciar
        </h1>
      </div>

      <div v-if="selectedOption === 'historic'">
        <h1>Historico - A fazer</h1>
      </div>

      <div v-if="selectedOption === 'record'">

      </div>

      <div v-if="selectedOption === 'exams'">

      </div>

      <div v-if="selectedOption === 'recipes'">

      </div>
      <div v-if="selectedOption === 'recipes'">

      </div>

    </div>

    <!-- <footer>
      <button @click="navigate('previous')">Voltar</button>
      <button @click="navigate('next')">Próximo</button>
    </footer> -->
    </div>
  </div>
</template>

<script>
import AppointmentHeader from '@/components/AppointmentHeader.vue'
import AutoCompleteText from '@/components/AutoCompleteText.vue';
import InitialAppointment from '@/components/appointmentComponents/InitialAppointment.vue'
export default {
  components: {
    AppointmentHeader,
    AutoCompleteText,
    InitialAppointment
  
  },
  data() {
    return {
      selectedOption: 'initial',
      appointmentStarted: false,
      time: 0,
      stopwatch: null
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
    }
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

.header-button:hover {
    background-color: #8188f5;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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
