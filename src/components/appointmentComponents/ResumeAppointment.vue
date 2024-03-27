<template>
    <div class="appointment-summary">
      <h2>Resumo da Consulta</h2>
      <div id="pdf-content">
        <!-- Anamnese -->
        <div class="section">
          <h3>Anamnese</h3>
          <div class="info">
            <p><strong>Queixa:</strong> {{ appointment.anamnese.complaint }}</p>
            <p><strong>História do Problema Atual:</strong> {{ appointment.anamnese.historyPresentIllness }}</p>
            <p><strong>História de Problema Anterior:</strong> {{ appointment.anamnese.historyPreviousIllness }}</p>
            <p><strong>Medicamentos Anteriores:</strong> {{ appointment.anamnese.previousMedications }}</p>
            <p><strong>Alergias:</strong> {{ appointment.anamnese.allergies }}</p>
            <p><strong>Observações:</strong> {{ appointment.anamnese.observations }}</p>
            <p><strong>Outras Informações:</strong> {{ appointment.anamnese.othersInformations }}</p>
          </div>
        </div>
  
        <!-- Prescrições -->
        <div class="section">
          <h3>Prescrições</h3>
  
          <!-- Exames -->
          <div class="sub-section">
            <h4>Exames</h4>
            <ul>
              <li v-for="exam in appointment.prescriptions.exams" :key="exam._id" :class="{ 'out-of-range': isOutOfRange(exam) }">
                {{ exam.name }} - Resultado: 
                <span v-for="(result, index) in exam.results" :key="index">
                  {{ result.date }}: {{ result.result }}{{ index !== exam.results.length - 1 ? ', ' : '' }}
                </span>
              </li>
            </ul>
    </div>
  
          <!-- Medicamentos -->
          <div class="sub-section">
            <h4>Medicamentos</h4>
            <ul>
              <li v-for="medicine in appointment.prescriptions.medicines" :key="medicine.medicine">
                <div class="medicine-info">
                  <p><strong>Medicamento:</strong> {{ medicine.medicine }}</p>
                  <p><strong>Dosagem:</strong> {{ medicine.dosage }}</p>
                  <p><strong>Instruções:</strong> {{ medicine.instructions }}</p>
                </div>
              </li>
            </ul>
          </div>
  
          <!-- Outras Prescrições -->
          <p class="info"><strong>Outras Prescrições:</strong> {{ appointment.prescriptions.otherPrescriptions }}</p>
        </div>
      </div>
      <button @click="exportToPDF">Export to PDF</button>
    </div>
  </template>
  
  <script>
  import html2pdf from 'html2pdf.js';
  
  export default {
    name: 'resumeAppointment',
    created() {
      console.log(this.$store.state.appointment.appointment);
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
        console.log(this.$store.state.record.record);
        this.appointment = this.$store.state.record.record;
        console.log(this.appointment)
        this.getAllInformationsAppointment()
      },
      async getAllInformationsAppointment(){
        this.patient = this.$store.state?.patient?.patient;
        this.exams = this.$store.state?.exam?.exam;
        this.recipes = this.$store.state?.recipe?.recipe;


        this.medicalRecord = this.$store.state.record.record;


        this.resumeAppointment = {
          anamnese: {
            complaint: '',
          }
        }

        console.log(this.patient)
        console.log(this.exams)
        console.log(this.recipes)
      },


















      /////export pdf
      exportToPDF() {
        const element = document.getElementById('pdf-content');
        const opt = {
            margin: 10,
            filename: 'consulta_summary.pdf',
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
            filename: 'consulta_summary.pdf',
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
  .appointment-summary {
    font-family: 'Arial', sans-serif;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  