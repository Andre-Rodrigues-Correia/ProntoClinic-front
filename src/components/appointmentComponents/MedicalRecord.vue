<template>

    <div class="medical-medical-content">
        <div>
            <form @submit.prevent="submitForm">
                <div>
                <label for="complaint">Reclamação:</label>
                <textarea id="complaint" v-model="medicalRecord.complaint"></textarea>
                </div>

                

                <div>
                <label for="historyPresentIllness">História do problema atual:</label>
                <textarea id="historyPresentIllness" v-model="medicalRecord.historyPresentIllness"></textarea>
                </div>

                <div>
                <label for="historyPreviousIllness">História de problema anterior</label>
                <textarea id="historyPreviousIllness" v-model="medicalRecord.historyPreviousIllness"></textarea>
                </div>

                <div>
                <label for="previousMedications">Medicamentos anteriores:</label>
                <textarea id="previousMedications" v-model="medicalRecord.previousMedications"></textarea>
                </div>

                <div>
                <label for="allergies">Alergias:</label>
                <textarea id="allergies" v-model="medicalRecord.allergies"></textarea>
                </div>

                <div>
                <label for="observations">Observações:</label>
                <textarea id="observations" v-model="medicalRecord.observations"></textarea>
                </div>

              
                
                <div>
                    <label for="othersInformations">Outras informações:</label>
                    <textarea id="othersInformations" v-model="medicalRecord.othersInformations"></textarea>
                </div>
                


                <button type="submit">Submit</button>
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
            medicalRecord: {
                complaint: '',
                historyPresentIllness: '',
                historyPreviousIllness: '',
                previousMedications: '',
                allergies: '',
                observations: '',
                othersInformations: ''
            },
            teste: '',
        }
    },
    created (){
        this.getData();
    },
    methods: {
        async getData(){

        },
        submitForm() {
            console.log(this.medicalRecord.othersInformations)
            this.$emit('form-submitted', this.medicalRecord);
            console.log(this.medicalRecord)

        },
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


    form {
        flex: 1;
        flex-direction: column;
        padding: 2rem;
    }

    textarea {
        width: 100%;
        height: 5vw; /* Ajuste a altura conforme necessário, usando vw para uma relação com a largura da tela */
        padding: 0.5rem;
        margin: auto;
    }

    label {
        display: flex;
        width: 100%;
    }
</style>