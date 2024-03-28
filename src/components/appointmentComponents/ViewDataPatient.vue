<template>
    <div >
         <button class="expand-button" type="button" @click="toggleExpanded">
            <font-awesome-icon :icon="expanded ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
        </button>

     </div>
     <div class="content" v-if="expanded">
         
         <h3>{{title}}</h3>
     <div class="content-view">
         <div v-for="appointment in patientAppointments" :key="appointment._id.$oid">
             <div class="anamnese">
                 <div class="anamnese-content">
                    Data: {{ formatDate(appointment.date) }} <br/>
                     {{ appointment.record.medicalRecord.anamnese[field]  || 'Sem dados para esse campo nesta consulta'}}
                 </div>
                 <div class="buttons-content">
                     <button type="button" @click="viewAppointment(appointment.record.medicalRecord.anamnese[field])"><font-awesome-icon class="icons" icon="eye" /></button>
                 </div>
             </div>
            
         </div>
     </div>

     <GenericModal title="Reclamações" :information="selectedAppointment" v-if="showModal" @close="closeModal"/>
     </div>


 </template>
 
 <script>
    import appointmentService from '@/services/appointmentsService';
    import appointment from '@/store/modules/appointment';
    import GenericModal from '../generic/GenericModal.vue';

 
     export default {
         name: 'ViewdataPatient',
         components: {
            GenericModal
         },
         props: {
             field: {
             type: String,
             required: true
             },
             title: {
                 type: String,
                 required: true
             }
         },
         data() {
             return {
                 patientAppointments: {},
                 expanded: false,
                 showModal: false,
                 selectedAppointment: null,
                 tooltipContent: 'Clique para Expandir/Fechar'
             }
         },
         created(){
             this.getData();
         },
         methods: {
             async getData(){
                 const patientId = this.$store.state.appointment.appointment.patientId;
                 const appointments = await appointmentService.getAppointmentsForPatient(patientId)
                 const removeActual = this.removeActualAppointment(appointments);
                 this.patientAppointments = removeActual;
                 console.log(this.patientAppointments)
             },
             formatDate(dateString) {
                 const date = new Date(dateString);
                 return date.toLocaleDateString('pt-BR'); // Formato de data "dia/mês/ano"
             },
             viewAppointment(appointment){
                this.selectedAppointment = appointment
                console.log(this.selectedAppointment)
                this.showModal = true;
             },
             closeModal(){
                this.showModal = false
             },
             toggleExpanded() {
                 this.expanded = !this.expanded;
             },
             removeActualAppointment(appointments){
                const filterAppointments = appointments.filter(appointment => appointment.hasOwnProperty('record'))
                console.log(filterAppointments)
                return filterAppointments
             }
             
         }
     }
 
 </script>
 
 
 <style scoped>

 .content{
     width: 100%;
 }
 
 .anamnese{
     display: flex;
     border: solid 1px ;
     padding: 0.5rem;
     margin-bottom: 0.3rem;
 }
 .content-view{
     width: 100%;
     height: 15vw;
     border: solid 1px ;
     margin: auto;
     overflow-y: auto;
     padding: 0.5rem;
     margin-bottom: 1rem;
 }
 
 .anamnese-content{
     font-display: flex;
     width: 100%;
     overflow-y: auto;
     height: 7vw;
     max-height: 7vw;
 }
 
 .buttons-content{
     display: flex;
     padding: 0.5rem;
     margin-left: auto;
   }

   .expand-button{
    width: 10%;
    padding: 0.5rem;
    cursor: pointer;
   }
 
   .icons{
     padding: 0.8rem 2rem;
   }
 
 li{
     display: flex;
     list-style: none;
     margin: 0.5rem;
     border: 1px solid;
     overflow-y: auto;
     padding: 0.5rem;
     border-radius: 10px;
     max-height: 5vw;
 }
 
 h3{
     margin-bottom: 0.5rem;
     text-align: center;
 }
 
 
 
 </style>