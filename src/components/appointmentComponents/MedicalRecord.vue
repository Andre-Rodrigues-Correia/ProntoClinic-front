<template>

    <div class="medical-medical-content">
        <div>
            <form class="form-content" @submit.prevent="submitForm('exams')">
                <div>
                <label class="label-content" for="complaint">Reclamação:</label>
                <textarea class="textarea-content" id="complaint" v-model="record.anamnese.complaint"></textarea>
                </div>

                

                <div>
                <label class="label-content" for="historyPresentIllness">História do problema atual:</label>
                <textarea class="textarea-content" id="historyPresentIllness" v-model="record.anamnese.historyPresentIllness"></textarea>
                </div>

                <div>
                <label class="label-content" for="historyPreviousIllness">História de problema anterior</label>
                <textarea class="textarea-content" id="historyPreviousIllness" v-model="record.anamnese.historyPreviousIllness"></textarea>
                </div>

                <div>
                <label class="label-content" for="previousMedications">Medicamentos anteriores:</label>
                <textarea class="textarea-content" id="previousMedications" v-model="record.anamnese.previousMedications"></textarea>
                </div>

                <div>
                <label class="label-content" for="allergies">Alergias:</label>
                <textarea class="textarea-content" id="allergies" v-model="record.anamnese.allergies"></textarea>
                </div>

                <div>
                <label class="label-content" for="observations">Observações:</label>
                <textarea class="textarea-content" id="observations" v-model="record.anamnese.observations"></textarea>
                </div>
  
                <div>
                    <label class="label-content" for="othersInformations">Outras informações:</label>
                    <textarea class="textarea-content" id="othersInformations" v-model="record.anamnese.othersInformations"></textarea>
                </div>
                


                
                <button class="create-button" @click="previous('historic')">Voltar</button>
                <button class="create-button" type="submit">Avaçar</button>
            </form>
        </div>
    </div>


</template>


<script>
import CustomTextArea from '../generic/CustomTextArea.vue';
export default {
    danme: 'MedicalRecord',
    components: {
        CustomTextArea
    },
    data() {
        return {
            record: {
                anamnese: {
                complaint: '',
                historyPresentIllness: '',
                historyPreviousIllness: '',
                previousMedications: '',
                allergies: '',
                observations: '',
                othersInformations: ''
                },
                prescriptions: {
                    exams: [],
                    medicines: [],
                    otherPrescriptions: ''
                }
            }
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

<style>
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
</style>