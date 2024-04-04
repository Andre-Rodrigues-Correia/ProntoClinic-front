<template>

    <div class="medical-medical-content">
        <div>
            <form class="form-content" @submit.prevent="submitForm('exams')">
                <div class="content-label-input">

                    <ViewDataPatient title="Reclamações anteriores" field="complaint"/>

                
                
                <label class="label-content" for="complaint">Reclamação:</label>
                <CustomTextArea
                        class="textarea-content"
                        :suggestions="suggestions"
                        :defaultValue="record.anamnese.complaint"
                        v-model="record.anamnese.complaint"
                        @setValue="(data)=> {
                            record.anamnese.complaint = data
                        }"/>
                </div>

                <hr>

                <div  class="content-label-input">
                
                <ViewDataPatient title="Histórias do problema atual" field="historyPresentIllness"/>

                <label class="label-content" for="historyPresentIllness">História do problema atual:</label>

                

                <CustomTextArea
                        class="textarea-content"
                        :suggestions="suggestions"
                        :defaultValue="record.anamnese.historyPresentIllness"
                        v-model="record.anamnese.historyPresentIllness"
                        @setValue="(data)=> {
                            record.anamnese.historyPresentIllness = data
                        }"/>
                </div>

                <hr>

                <div  class="content-label-input">

                <ViewDataPatient title="Histórias de problemas passados" field="historyPreviousIllness"/>
                <label class="label-content" for="historyPreviousIllness">História de problema anterior</label>

                <CustomTextArea
                        class="textarea-content"
                        :suggestions="suggestions"
                        :defaultValue="record.anamnese.historyPreviousIllness"
                        v-model="record.anamnese.historyPreviousIllness"
                        @setValue="(data)=> {
                            record.anamnese.historyPreviousIllness = data
                        }"/>
                </div>

                <hr>

                <div class="content-label-input">

                <ViewDataPatient title="Medicamentos anteriores" field="previousMedications"/>
                <label class="label-content" for="previousMedications">Medicamentos anteriores:</label>

                <CustomTextArea
                        class="textarea-content"
                        :suggestions="suggestions"
                        :defaultValue="record.anamnese.previousMedications"
                        v-model="record.anamnese.previousMedications"
                        @setValue="(data)=> {
                            record.anamnese.previousMedications = data
                        }"/>
                </div>

                <hr>

                <div class="content-label-input">

                <ViewDataPatient title="Alergias anteriores" field="allergies"/>
                <label class="label-content" for="allergies">Alergias:</label>

                <CustomTextArea
                        class="textarea-content"
                        :suggestions="suggestions"
                        :defaultValue="record.anamnese.allergies"
                        v-model="record.anamnese.allergies"
                        @setValue="(data)=> {
                            record.anamnese.allergies = data
                        }"/>
                </div>

                <hr>

                <div class="content-label-input">

                <ViewDataPatient title="Observações anteriores" field="observations"/>
                <label class="label-content" for="observations">Observações:</label>

                <CustomTextArea
                        class="textarea-content"
                        :suggestions="suggestions"
                        :defaultValue="record.anamnese.observations"
                        v-model="record.anamnese.observations"
                        @setValue="(data)=> {
                            record.anamnese.observations = data
                        }"/>
                </div>

                <hr>
  
                <div class="content-label-input">

                    <ViewDataPatient title="Outras informações anteriores" field="othersInformations"/>
                    <label class="label-content" for="othersInformations">Outras informações:</label>

                    <CustomTextArea
                        class="textarea-content"
                        :suggestions="suggestions"
                        :defaultValue="record.anamnese.othersInformations"
                        v-model="record.anamnese.othersInformations"
                        @setValue="(data)=> {
                            record.anamnese.othersInformations = data
                        }"/>
                </div>

        
                
                <button class="create-button" @click="previous('historic')">Voltar</button>
                <button class="create-button" type="submit">Avaçar</button>
            </form>
        </div>
    </div>


</template>


<script>
import record from '@/store/modules/record';
import CustomTextArea from '../generic/CustomTextArea.vue';
import ViewDataPatient from './ViewDataPatient.vue';
export default {
    danme: 'MedicalRecord',
    components: {
        CustomTextArea,
        ViewDataPatient
    },
    data() {
        return {
            record: {
                patientId: this.$store.state.appointment.appointment.patientId,
                doctorId: this.$route.params.doctorId,
                anamnese: {
                complaint: '',
                historyPresentIllness: '',
                historyPreviousIllness: '',
                previousMedications: '',
                allergies: '',
                observations: '',
                othersInformations: ''
                },
            },
            doctorId: this.$route.params.doctorId,
            clinicId: this.$route.params.clinicId,
            teste: '',
            suggestions: [],
        }
    },
    created (){
        this.getData();
    },
    methods: {
        async getData(){
            this.record.anamnese.complaint = this.$store.state.record.record?.anamnese?.complaint  || '';
            this.record.anamnese.historyPresentIllness = this.$store.state.record.record?.anamnese?.historyPresentIllness  || '';
            this.record.anamnese.historyPreviousIllness = this.$store.state.record.record?.anamnese?.historyPreviousIllness  || '';
            this.record.anamnese.previousMedications = this.$store.state.record.record?.anamnese?.previousMedications  || '';
            this.record.anamnese.allergies = this.$store.state.record.record?.anamnese?.allergies  || '';
            this.record.anamnese.observations = this.$store.state.record.record?.anamnese?.observations  || '';
            this.record.anamnese.othersInformations = this.$store.state.record.record?.anamnese?.othersInformations  || '';

            this.suggestions = this.$store.state.doctor.doctor?.suggestions || [];
        },
        async submitForm(destiny) {
            await this.$store.dispatch('record/setRecord', this.record);
            this.$emit('sendMenu', destiny)
        },
        previous(destiny){
            this.$emit('sendMenu', destiny)
        }
    }
}


</script>

<style scoped>
    .medical-medical-content {
        width: 100%;
        border: solid 2px;
        border-radius: 10px;
        margin-bottom: 2rem;
    }


    .form-content {
        flex: 1;
        flex-direction: column;
        padding: 2rem;
    }

    .textarea-content {
        width: 100%;
        height: 5vw; /* Ajuste a altura conforme necessário, usando vw para uma relação com a largura da tela */
        padding: 0.5rem;
        margin: auto;
    }

    .label-content {
        display: flex;
        width: 100%;
    }

    .content-label-input{
        margin-bottom: 2rem;
    }

    hr{
        margin-bottom: 0.5rem;
    }
</style>