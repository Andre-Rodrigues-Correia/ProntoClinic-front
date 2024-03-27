<template>
  <div class="container">

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Exames</th>
            <th>Variações min/máx</th>
            <th v-for="date in examsDates" :key="date">
            Resultado {{ date }}
            </th>
            <th><input type="date" v-model="examDate"></th>
            <th>Adicionar Resultado</th>
            <th>Excluir Exame</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="patientExams.length > 0" v-for="(exam, index) in examsWithResults" :key="index">
            <td>
              <span>{{ exam.name }}</span>
            </td>

            <td>
              <input v-model="exam.min" type="number"/>
              <input v-model="exam.max" type="number"/>
            </td>
            <td v-for="date in examsDates" :key="date">
              {{ getExamResult(date, exam) }}
            </td>
            <td>
              <input v-model="exam.newResult" :style="{ backgroundColor: verifyRange(exam) ? 'red' : '' }"/>
            </td>
            <td>
            <button @click="addResult(exam)" class="action-button">Adicionar</button>
            </td>
            <td>
              <button @click="deleteExam(exam)" class="action-button delete-button">Excluir</button>
            </td>
          </tr>
          <tr v-if="addNewExam">
            <td>
              <!-- <select v-model="newExam.name" @change="updateNewExam">
                <option v-for="exam in examsNotInResults" :key="exam.name" :value="exam.name">{{ exam.name }}</option>
              </select> -->
              <Multiselect
                :options="exams"
                v-model="newExam.name"
                mode="single"
                :searchable="true"
                :close-on-select="true"
                @select="updateNewExam"
              />
            </td>
            <td>
              <input v-model="newExam.min" type="number" class="input-number" />
              <input v-model="newExam.max" type="number" class="input-number" />
            </td>
            <td v-for="date in examsDates" :key="date">
              {{ getExamResult(date, newExam) }}
            </td>
            <td>
              <input v-model="newExam.newResult" :style="{ backgroundColor: verifyRange(newExam) ? 'red' : '' }"/>
            </td>
            <td>
              <button @click="addResult(newExam)" class="action-button">Adicionar</button>
            </td>
            <td>
              <button @click="deleteNotNewExam(newExam)" class="action-button delete-button">Excluir</button>
            </td>
          </tr>


          <tr v-if="customExam">
            <td>
              <input v-model="newExam.name" @change="updateNewExam" type="text">
            </td>
            <td>
              <input v-model="newExam.min" type="number" class="input-number" />
              <input v-model="newExam.max" type="number" class="input-number" />
            </td>
            <td v-for="date in examsDates" :key="date">
              {{ getExamResult(date, newExam) }}
            </td>
            <td>
              <input v-model="newExam.newResult" :style="{ backgroundColor: verifyRange(newExam) ? 'red' : '' }"/>
            </td>
            <td>
              <button @click="addResult(newExam)" class="action-button">Adicionar</button>
            </td>
            <td>
              <button @click="deleteNotCustomNewExam(newExam)" class="action-button delete-button">Excluir</button>
            </td>
          </tr>

          
        </tbody>
      </table>
      <div class="buttons">
        <button @click="addExam" class="action-button">Adicionar Exame</button>
        <button @click="addCustomExam" class="action-button">Adicionar Exame Customizado</button>
      </div>
      
    </div>

    <div class="menu-buttons">
      <button class="create-button" @click="previous('record')">Voltar</button>
      <button class="create-button" @click="sendData">Avaçar</button>
    </div>


  </div>


</template>

<script>
import examService from '@/services/examService';
import Multiselect from '@vueform/multiselect'
import "@vueform/multiselect/themes/default.css";


export default {
  components: {
    Multiselect
  },
  data() {
    return {
      //patient: {
        //examsResults: [],
        // { name: 'Exame A', results: [{ result: 10, date: '01-02-2021'}], min: 50, max: 100 },
        // { name: 'Exame B', results: [{ result: 50, date: '04-03-2022'}], min: 10, max: 50 },
      //},
      record: {
        exams: [],
      },
      patient: {},
      patientExams: [],
      newExam: {
        name: '',
        date: '',
        result: '',
        min: '',
        max: '',
        results: []
      },
      examDate: this.getCurrentDate(),
      addNewExam: false,
      customExam: false,
      currentDate: this.getCurrentDate(),
      exams: [
        { name: 'Exame A', min: 50, max: 100, label: 'Exame A', value: 'Exame A' },
        { name: 'Exame B', min: 10, max: 50, label: 'Exame B', value: 'Exame B' },
        { name: 'Exame C', min: null, max: null, label: 'Exame C', value: 'Exame C' },
        // Adicione outros exames conforme necessário
      ],

      /////////////////////////////////////////////
      item: []
    };
  },
  created(){
    this.currentDate = this.getCurrentDate();
    this.getData();
  },
  computed: {
    examsDates() {
      const dates = new Set();
      this.patientExams.forEach((exam) => {
        exam.results.forEach((result) => {
          dates.add(result.date);
        });
      });
      console.log(dates)
      return dates;
    },
    examsWithResults() {
      return this.patientExams;
    },
    examsNotInResults() {
    return this.exams.filter((exam) => {
      return !this.patientExams.some((result) => result.name === exam.name);
    });
  },
  },
  methods: {
    async getData(){
      await this.getPatientExams();
      this.patientExams = this.$store.state.exam.exam || []
      this.exams = await examService.getAllExams();
    },
    getCurrentDate() {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      return `${day}-${month}-${year}`;
    },
    verifyRange(exam){
      const result = parseFloat(exam.newResult);
      return result < exam.min || result > exam.max;
    },
    addResult(exam){
      const existingExamIndex = this.patientExams.findIndex(e => e.name === exam.name);
      const newResult = {
        result: exam.newResult,
        date: this.examDate,
      }

        if (existingExamIndex !== -1) {  
          this.patientExams[existingExamIndex].results.push(newResult);
        } else {
          this.patientExams.push({
            name: this.newExam.name,
            min: this.newExam.min,
            max: this.newExam.max,
            results: [newResult],
          });
        }

        this.newExam = {
          name: '',
          date: '',
          result: '',
          min: '',
          max: '',
          results: []
        }
        this.addNewExam = false;
        this.customExam = false;
    },
    addExam(){
      this.addNewExam = true;
    },
    addCustomExam(){
      this.customExam = true;
    },
    updateNewExam(){
      const selectedExam = this.exams.find((exam) => exam.name == this.newExam.name);


      if (selectedExam) {
        this.newExam.min = selectedExam.min;
        this.newExam.max = selectedExam.max;
        this.newExam.date = this.getCurrentDate()
      }
    },
    deleteExam(exam){
      const index = this.patientExams.findIndex(e => e.name === exam.name);
      if (index !== -1) {
        console.log(this.patientExams)
        this.patientExams.splice(index, 1);
      }
    },

    deleteNotCustomNewExam(){
      this.customExam = false;
    },
    deleteNotNewExam(){
      this.addNewExam = false;
    },

    getExamResult(date, exam) {
    for (const e of this.patientExams) {
      const result = exam.results.find((result) => result.date === date && exam.name == e.name);
      if (result) {
        return result.result;
      }
    }
    return 'Não fez esse exame nesse dia';
    },
    async getPatientExams(){
      this.patient = this.$store.state.patient.patient
      await this.$store.dispatch('exam/setExam', this.patient.exams);
    },
    previous(destiny){
        this.$emit('sendMenu', destiny)
    },
    async sendData(){
      //await this.$store.dispatch('exam/setExam', this.patientExams);

      const editedPatient = {
        ...this.patient,
        exams: [...this.patientExams]
      };
      await this.$store.dispatch('patients/updatePatient', editedPatient);
      this.$emit('sendMenu', 'recipes')
    }

  },
};
</script>



<!-- <style scoped src="@coreui/coreui/dist/css/coreui.min.css"></style> -->
<style scoped>
.container {
  width: 100%;
  margin-bottom: 2rem;

}

.table-container{
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 2rem;
  margin: auto;

}

.menu-buttons{
  text-align: center;
}

td{
  width: 100%;
}


button{
  margin: 0.2rem;
}

.action-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.input-number {
  width: 70px;
}

.select-box {
  width: 100%;
}

.output {
  font-family: Courier, Courier New, Lucida Console, Monaco, Consolas;
  background: #000000;
  color: #ffffff;
  padding: 20px;
  margin-bottom: 20px;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  font-size: 13px;
}

.multiselect{
  padding: 0.1rem;
  width: 80%;
}

li{
 background-color: #d32f2f;
}

/* ::v-deep ul{
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0.1rem;
}

::v-deep li{
  list-style: none;
  padding: 0.1rem;
  cursor: pointer;
}

::v-deep li:hover{
  list-style: none;
  background-color: blue;
  padding: 0.1rem;
} */

</style>
