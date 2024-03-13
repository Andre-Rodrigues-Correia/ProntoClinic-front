<template>
  <div>

    <div>
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
          <tr v-if="patient.examsResults.length > 0" v-for="(exam, index) in examsWithResults" :key="index">
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
              <select v-model="newExam.name" @change="updateNewExam">
                <option v-for="exam in examsNotInResults" :key="exam.name" :value="exam.name">{{ exam.name }}</option>
              </select>
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
              <button @click="deleteExam(newExam)" class="action-button delete-button">Excluir</button>
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
              <button @click="deleteExam(newExam)" class="action-button delete-button">Excluir</button>
            </td>
          </tr>

          
        </tbody>
      </table>
      <button @click="addExam">Adicionar Exame</button>
      <button @click="addCustomExam">Adicionar Exame Customizado</button>
    </div>

    <div>
      <button @click="sendData">Enviar</button>
    </div>


  </div>


</template>

<script>
  import Multiselect from '@vueform/multiselect'

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      patient: {
        examsResults: [
        { name: 'Exame A', results: [{ result: 10, date: '01/02/2021'}], min: 50, max: 100 },
        { name: 'Exame B', results: [{ result: 50, date: '04/03/2022'}], min: 10, max: 50 },
      ],
      },
      examDate: this.getCurrentDate(),
      newExam: {
        name: '',
        date: '',
        result: '',
        min: '',
        max: '',
        results: []
      },
      addNewExam: false,
      customExam: false,
      newResult: '',
      currentDate: this.getCurrentDate(),
      exams: [
        { name: 'Exame A', min: 50, max: 100, label: 'Exame A', value: 'Exame A' },
        { name: 'Exame B', min: 10, max: 50, label: 'Exame B', value: 'Exame B' },
        { name: 'Exame C', min: null, max: null, label: 'Exame C', value: 'Exame C' },
        // Adicione outros exames conforme necessário
      ],
    };
  },
  created(){
    this.currentDate = this.getCurrentDate();
  },
  computed: {
    examsDates() {
      const dates = new Set();
      this.patient.examsResults.forEach((exam) => {
        exam.results.forEach((result) => {
          dates.add(result.date);
        });
      });
      console.log(dates)
      return dates;
    },
    examsWithResults() {
      return this.patient.examsResults;
    },
    examsNotInResults() {
    return this.exams.filter((exam) => {
      // Verifica se o nome do exame não está presente nos examsResults do paciente
      return !this.patient.examsResults.some((result) => result.name === exam.name);
    });
  },
  },
  methods: {
    getCurrentDate() {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      return `${day}/${month}/${year}`;
    },
    getResults(exam, date) {
      const result = this.patient.examsResults.find(
        (examResult) => examResult.name === exame.name && examResult.date === date
      );
      return resultado ? resultado.resultado : undefined;
    },
    verifyRange(exam){
      const result = parseFloat(exam.newResult);
      return result < exam.min || result > exam.max;
    },
    addResult(exam){
      const existingExamIndex = this.patient.examsResults.findIndex(e => e.name === exam.name);
      const newResult = {
        result: exam.newResult,
        date: this.examDate,
        }
        console.log(exam)
        if (existingExamIndex !== -1) {
          
          this.patient.examsResults[existingExamIndex].results.push(newResult);
        } else {
          this.patient.examsResults.push({
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
      const index = this.patient.examsResults.findIndex(e => e.name === exam.name);
      if (index !== -1) {
        console.log(this.patient.examsResults)
        this.patient.examsResults.splice(index, 1);
      }
    },

    getExamResult(date, exam) {
    for (const e of this.patient.examsResults) {
      const result = exam.results.find((result) => result.date === date && exam.name == e.name);
      if (result) {
        return result.result;
      }
    }
    return 'Não fez esse exame nesse dia';
  },
  sendData(){
    console.log(this.patient)
  }

  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
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



::v-deep ul{
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
}

</style>
