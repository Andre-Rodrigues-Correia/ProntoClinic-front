<template>
    <div class="modal-overlay">
      <div class="modal">
        <div class="modal-content">
          <h2>Agendar consulta para o dia {{ date }}</h2>
          <form @submit.prevent="saveChanges">
            <div class="form-group">
                <label for="">Médico</label>
                <Multiselect
                    :options="doctors"
                    v-model="appointmentDoctor"
                    mode="single"
                    :searchable="true"
                    :close-on-select="true"
                    @select="setDoctor"
                />
                <label for="">Paciente</label>
                <Multiselect
                    :options="patients"
                    v-model="appointmentPatient"
                    mode="single"
                    :searchable="true"
                    :close-on-select="true"
                    @select="setPatient"
                />
            </div>
            <div class="buttons-content">
              <button class="create-button" type="submit">Agendar</button>
              <button class="close-button" @click="closeModal">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import appointmentService from '@/services/appointmentsService';
import doctorService from '@/services/doctorService';
import patientService from '@/services/patientService';
import userService from '@/services/userService';
import appointment from '@/store/modules/appointment';
import patient from '@/store/modules/patient';
import Multiselect from '@vueform/multiselect'
import { mapActions } from 'vuex';

  export default {
    name: 'MakeAppointmentModal',
    components: {
        Multiselect
    },  
    props: {
      date: {
        type: String,
        required: true,
      },
      hour: {
        type: String,
        required: true,
      },
    },
    async created(){
        console.log(this.date)
        await this.getData()
    },
    data() {
      return {
        appointment: null, // Clone do card para edição
        appointmentDoctor: null,
        appointmentPatient: null,
        clinicId: this.$route.params.clinicId,
        doctors: [],
        patients: [],
      };
    },
    methods: {
        ...mapActions('appointments', ['addAppointment']),
      async getData(){
        this.doctors = await doctorService.getDoctorsForMakeAppointment();
        this.patients = await patientService.getPatientsForMakeAppointment();
      },
      setDoctor(){
        console.log(this.appointmentDoctor)
      },
      setPatient(){
        console.log(this.appointmentPatient)
      },
      async saveChanges() {
        console.log(this.date)
        this.appointment = {
            clinicId: this.clinicId,
            doctorId: this.appointmentDoctor,
            patientId: this.appointmentPatient,
            date: this.date,
            hour: this.hour,
            record: {},
            status: 'scheduled',
            local: this.clinicId,
        }

        const response = await this.addAppointment(this.appointment);
        console.log(response)
        //appointmentService.createAppointment(this.appointment);
        this.$emit('save', this.appointment);
        this.$emit('close');
      },
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para o modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 25px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  
  .modal-content {
    padding: auto;
  }
  
  form {
    max-width: 500px;
    width: 100%;
    margin: auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input {
    display: flex;
    width: 100%;
    margin-top: 0.3rem;
    margin-bottom: 0.5rem;
    border: solid 1px black;
    border-radius: 5px;
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  
  .readonly-input {
    background-color: #f2f2f2; /* Cor de fundo cinza */
    color: #888; /* Cor de texto mais escura para dar a aparência de desativado */
    pointer-events: none; /* Impede a interação do usuário com o campo */
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .color-buttons {
    display: flex;
    margin-bottom: 15px;
  }
  
  button {
    flex: 1; /* Ocupa o espaço disponível */
    margin: 0 5px;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
  
  
  
  .buttons-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  </style>
  