<template>
    <div class="patient-header-content">
      <h2 class="title">Informações do paciente</h2>
      <LoadingSpinner class="patient-content" v-if="isLoading"/>
      <div v-else class="patient-content">
        <div class="patient-photo">
          <div v-if="patient.picture" class="picture">
            <img :src="patient.picture" alt="" width="40">
          </div>
          <div v-else class="picture">
            <font-awesome-icon :icon="['fas', 'user']" />
          </div>
        </div>
        <div class="patient-informations-content">
          <div class="details-content">
            <label>Nome:</label>
            <label>{{ patient.name }}</label>
          </div>
          <div class="details-content">
            <label>Data de nascimento:</label>
            <label>{{ new Date(patient.birthday).toLocaleDateString('pt-BR')}}</label>
          </div>
          <div class="details-content">
            <label>Telefone:</label>
            <label>{{ patient.name }}</label>
          </div>
        </div>
  
        <div class="cards-content">
          <div v-for="(card, index) in patient.cards" :key="index" :style="{ backgroundColor: card.backgroundColor }" class="card-content">
            <div class="header-card">
              <div class="header-card-title" >
                <label>{{card.title}}</label>
              </div>
              <div class="header-card-buttons">
                <button @click="viewCard(card)"><font-awesome-icon class="icons" icon="eye" /></button>
                <button @click="viewEditCard(card)"><font-awesome-icon class="icons" :icon="['fas', 'pen-to-square']" /></button>
                <button @click="deleteCard(card)"><font-awesome-icon class="icons" :icon="['fas', 'trash']" /></button>
              </div>
            </div>
            
            <textarea v-model="card.information" placeholder="Nenhuma informação" :class="`patient-textarea${index} textarea`" :readonly="true"></textarea>
          </div>
          <div class="card-content">
            <button type="button" class="add-card-btn" @click="addCard">
              <span>
                <span>+</span>
                <br />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <CardModal :card="selectedCard" v-if="showCard" @close="closeCardModal"/>
    <EditCardModal :card="selectedCard" v-if="showEditCard" @save="saveChanges" @close="closeEditCardModal"/>
  </template>
  
  <script>
  import CardModal from '@/components/CardModal.vue'
  import EditCardModal from '@/components/EditCardModal.vue'
  import LoadingSpinner
   from './generic/LoadingSpinner.vue';
  export default {
    name: 'AppointmentHeader',
    components: {
      CardModal,
      EditCardModal,
      LoadingSpinner
    },
    data() {
      return {
        patient: {},
        selectedCard: null,
        showCard: false,
        showEditCard: false,
        cards: [],
        isLoading: true,
      };
    },
    created (){
        this.getData();
    },
    methods: {
      async getData(){
          const patientId = this.$route.query.patientId;
          await this.$store.dispatch('patient/setPatient', patientId);
          this.patient = this.$store.state.patient.patient;
          this.patient.cards = this.patient.cards  || [];
          this.isLoading = false;
        },
      async addCard() {
        const newCardId = this.patient.cards.length + 1;
        this.patient.cards.push({ id: newCardId, information: "", backgroundColor: "" });
        await this.$store.dispatch('patient/updatePatient', this.patient);
        this.reloadPatient()
      },
      closeCardModal(){
        this.showCard = false;
      },
      viewCard(card){
        this.selectedCard = card;
        this.showCard = true;
      },
      closeEditCardModal(){
        this.showEditCard = false;
      },
      viewEditCard(card){
        this.selectedCard = card;
        this.showEditCard = true;
      },
      async deleteCard(card){
        const updatedCards = this.patient.cards.filter((c) => c.id !== card.id);
        const updatedPatient = { ...this.patient, cards: updatedCards };
        await this.$store.dispatch('patient/updatePatient', updatedPatient);
        this.reloadPatient();
      },
      async saveChanges(editedCard){
        const index = this.patient.cards.findIndex((c) => c.id === editedCard.id);
        if (index !== -1) {
            this.patient.cards.splice(index, 1, editedCard);
            await this.$store.dispatch('patient/updatePatient', this.patient);
            this.reloadPatient()
        }
      },
      reloadPatient(){
        this.patient = this.$store.state.patient.patient;
      }
    },
  };
  </script>
  <style scoped>
  .patient-header-content {
    width: 100%;

    display: flex;
    overflow: auto;
    align-items: center;
    flex-direction: column;
  }
  .patient-content{
    width: 80%;
    height: 150px;
    display: flex;
    border: solid 2px;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
  }
  
  
  
  .patient-photo{
    align-items: center;
    justify-content: center;
    display: flex;
    width: 10%;
    height: 100%;
    border: solid 2px;
    border-radius: 10px;
  }
  
  .patient-informations-content{
    width: 30%;
    max-width: 30%;
    border: solid 2px;
    border-radius: 10px;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }
  
  .details-content{
    margin-bottom: 0.7rem;
  }
  
  .cards-content{
    width: 60%;
    border: solid 2px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    overflow-y: auto;
    align-items: stretch;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 1rem;
  }
  
  .card-content{
    margin-left: 0.5rem;
    margin-top: 0.5rem;
    padding: 0.3rem;
    width: 28%;
    height: 60%;
    display: flex;
    flex-direction: column;
    border: solid 2px;
    border-radius: 10px;
  }
  
  
  .add-card-btn {
    margin: auto;
    width: 100%;
    height: 100%;
    align-self: stretch;
    border-style: dashed;
    border-width: 2px;
  }
  
  .header-card{
    display: flex;
    justify-content: space-between;
  }
  
  .header-card-buttons{
    display: flex;
    justify-content: space-between;
    
  
  }
  
  .icons{
    padding: 0.1rem 0.2rem;
    margin-left: 0.1rem;
  
  }

  .title{
    margin: 0.5rem;
  }
  
  label{
    margin-right: 0.5rem;
  }
  
  textarea {
    height: 100%;
  }
  
  button {
      cursor: pointer;
    }
  
    button:hover {
      background-color: var(--primary-color);
    }
  
  </style>