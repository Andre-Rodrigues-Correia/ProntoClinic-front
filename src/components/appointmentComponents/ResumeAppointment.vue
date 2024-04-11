<template>


  <div class="container">

    <div id="resume-container">

    

    <div class="title">
      <h2>Resumo do atendimento</h2>
    </div>


    <div class="resume-content">

      <div class="infos" v-if="patient.cards?.length > 0">
        <ul>
              <li v-for="card in patient.cards" :key="card.id">
                <div class="card">
                  Título: {{ card.title }}<br/>
                  Informação: {{ card.information }}
                </div>
                
              </li>
              <br>
        </ul>
      </div>

      
      <div class="infos">
        <h3>Anamnese</h3>
            <p><strong>Queixa:</strong> {{ medicalRecord.anamnese.complaint }}</p>
            <p><strong>História do Problema Atual:</strong> {{ medicalRecord.anamnese.historyPresentIllness }}</p>
            <p><strong>História de Problema Anterior:</strong> {{ medicalRecord.anamnese.historyPreviousIllness }}</p>
            <p><strong>Medicamentos Anteriores:</strong> {{ medicalRecord.anamnese.previousMedications }}</p>
            <p><strong>Alergias:</strong> {{ medicalRecord.anamnese.allergies }}</p>
            <p><strong>Observações:</strong> {{ medicalRecord.anamnese.observations }}</p>
            <p><strong>Outras Informações:</strong> {{ medicalRecord.anamnese.othersInformations }}</p>
      </div>

      <div class="infos">
        <h3>Exames</h3>
        <ul>
              <li v-for="exam in exams" :key="exam._id">
                {{ exam.name }}:
                <br>
                <span v-for="(result, index) in exam.results" :key="index">
                  data: {{ result.date }}
                  resultado: {{ result.result }}<br/>
                </span>
              </li>
              <br>
        </ul>
      </div>
    </div>

    <div class="infos" v-if="recipes?.length > 0">
            <h4>Medicamentos</h4>
            <ul>
              <li v-for="medicine in recipes" :key="medicine.medicine">
                <div class="medicine-info">
                  <p><strong>Medicamento:</strong> {{ medicine.medicine }}</p>
                  <p><strong>Dosagem:</strong> {{ medicine.dosage }}</p>
                  <p><strong>Instruções:</strong> {{ medicine.instructions }}</p>
                </div>
              </li>
            </ul>
    </div>

  </div>
  <button @click="exportToPDF">Export to PDF</button>
  </div>
   
  </template>
  
  <script>
  import recordService from '@/services/recordService';
import html2pdf from 'html2pdf.js';
  
  export default {
    name: 'resumeAppointment',
    created() {
      this.getData();
    },
    data() {
      return {
        appointment: {
          anamnese: {
            complaint: "",
            historyPresentIllness: "",
            historyPreviousIllness: "",
            previousMedications: "",
            allergies: "",
            observations: "",
            othersInformations: ""
          },
          prescriptions: {
            exams: [],
            medicines: [],
            otherPrescriptions: ""
          }
        },
        resumeAppointment: {},
        medicalRecord: {},
        patient: {},
        exams: [],
        recipes: [],
      };
    },
    methods: {
      getData() {
        this.appointment = this.$store.state.appointment.appointment;
        this.getAllInformationsAppointment()
      },
      async getAllInformationsAppointment(){
        this.patient = this.$store.state?.patient?.patient;
        console.log(this.patient)
        this.exams = this.$store.state?.exam?.exam;
        this.recipes = this.$store.state?.recipe?.recipe;


        this.medicalRecord = this.$store.state.record.record;
        const teste = {
          patientId: this.$store.state.appointment.appointment.patientId,
          doctorId: this.$store.state.appointment.appointment.doctorId,
          medicalRecord: {...this.$store.state.record.record}
        }
        const newRecord = await recordService.createRecord(teste)

        this.resumeAppointment = {
          ...this.appointment,
          record: newRecord,
          exams: this.exams,
          prescriptions: {
            recipes: this.recipes
          }
        }
        console.log(this.resumeAppointment)
        await this.$store.dispatch('appointment/updateAppointment', this.resumeAppointment);
      },

      /////export pdf
      exportToPDF() {
        const element = document.getElementById('resume-container');
        const opt = {
            margin: 10,
            filename: 'resume-container.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all'] }, // Evita quebras de página
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            image: { type: 'jpeg', quality: 0.98 },
            margin: 10,
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: 'avoid-all' }, // Evita quebras de página
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            margin: 10,
            filename: 'resume-container.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
        };

        html2pdf(element, opt).then(pdf => {
            pdf.save(opt.filename);
        });
        },
        isOutOfRange(exam) {
          console.log(exam)
            const value = parseFloat(exam.value);
            const min = parseFloat(exam.min);
            const max = parseFloat(exam.max);
            return isNaN(value) || value < min || value > max;
        },




    },
  };
  </script>
  
<style scoped>
.container{
  width: 100%;
  border: solid 2px;
  border-radius: 10px;
  margin-bottom: 2rem;
}

.infos{
  padding: 1rem;
}

.title{
  text-align: center
}

.resume-container {
  margin: auto;
}
.resume-content {
  margin-top: 1rem;
  padding: 1rem;
}

p{
  margin-bottom: 0.3rem;
}

  .content {
    width: 100%;
        border: solid 2px;
        border-radius: 10px;
        margin-bottom: 2rem;
    
  }
  .appointment-summary {
    width: 100%;
    flex-direction: column;
    padding: 2rem;
    margin: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: aqua;
  }

  .pdf-content{

    justify-content: center;
  }
  
  .section {
  margin-bottom: 20px;
}

.info {
  line-height: 1.6;
}

.sub-section {
  margin-top: 10px;
}

.medicine-info {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
}

h2, h3, h4 {
  color: #333;
}

strong {
  color: #555;
}

ul {
  padding: 0;
  list-style: none;
}

li {
  margin-bottom: 5px;
}

.out-of-range {
    background-color: #ffcccc; /* Cor de fundo vermelho para indicar valor fora do intervalo */
  }
  
  </style>
  