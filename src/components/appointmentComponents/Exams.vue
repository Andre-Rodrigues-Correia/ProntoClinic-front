<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Exame</th>
          <th>Variações (min/max)</th>
          <th v-for="exam in patientExams" :key="exam.date">{{ formatDate(exam.date) }}</th>
          <th>{{ currentDate }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="examsList.length > 0">
          <tr v-for="(exam, index) in examsList" :key="index">
            <td>
              <select v-model="exam.name">
                <option v-for="e in exams" :key="e.name" :value="e.name">{{ e.name }}</option>
              </select>
            </td>
            <td>
              <input v-model="examsList[index].variation.min" type="number" />
              <input v-model="examsList[index].variation.max" type="number" />
            </td>
            <td v-for="patientExam in patientExams" :key="patientExam.date">
              <span v-if="patientExam.name === exam.name">{{ patientExam.value }}</span>
            </td>
            <td>
              <input
                type="text"
                v-model="examResults[index].value"
                :style="{ background: isValueOutOfRange(examResults[index]) ? 'red' : 'none' }"
              />
              <button @click="saveExamResult(exam, examResults[index].value)">Salvar</button>
              <button @click="deleteExamRow(index)">Excluir</button>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="4">Nenhum exame adicionado.</td>
          </tr>
        </template>
      </tbody>
    </table>
    <button @click="addExamRow">Adicionar Exame</button>
    <button @click="addCustomExam">Adicionar Exame Customizável</button>
    <button @click="showAllExams">Exibir Todos os Exames do Paciente</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exams: [
        { name: 'Exame A', variation: { min: 10, max: 20 } },
        { name: 'Exame B', variation: { min: 10, max: 20 } },
        { name: 'Exame C', variation: { min: 10, max: 20 } },
      ],
      patientExams: [
        { name: 'Exame A', variation: { min: 1, max: 99 }, value: 88, date: '2024-03-07T20:03:59.478+00:00' },
        { name: 'Exame A', variation: { min: 1, max: 99 }, value: 88, date: '2024-03-06T20:03:59.478+00:00' },
      ],
      currentDate: new Date().toLocaleDateString(),
      examsList: [],
      examResults: [],
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    isValueOutOfRange(examResult) {
      return examResult.value < examResult.variation.min || examResult.value > examResult.variation.max;
    },
    saveExamResult(exam, value) {
      const date = new Date().toISOString();
      this.patientExams.push({ name: exam.name, variation: exam.variation, value, date });
    },
    addExamRow() {
      this.examsList.push({ name: this.exams[0].name, variation: { min: this.exams[0].variation.min, max: this.exams[0].variation.max } });
      this.examResults.push({ name: this.exams[0].name, variation: { min: this.exams[0].variation.min, max: this.exams[0].variation.max }, value: 0 });
    },
    addCustomExam() {
      const customExam = { name: prompt('Nome do Exame:'), variation: { min: 0, max: 0 } };
      if (customExam.name) {
        this.exams.push(customExam);
        this.examsList.push(customExam);
        this.examResults.push({ name: customExam.name, variation: customExam.variation, value: 0 });
      }
    },
    showAllExams() {
      alert(JSON.stringify(this.patientExams, null, 2));
    },
    deleteExamRow(index) {
      this.examsList.splice(index, 1);
      this.examResults.splice(index, 1);
    },
  },
  created() {
  // Verifica se há exames em patientExams e inicializa examsList com esses exames
  if (this.patientExams.length > 0) {
    const uniqueExamNames = new Set();  // Utilizando um Set para armazenar nomes únicos
    this.examsList = this.patientExams.map((exam) => {
      // Verifica se o nome já está presente na lista antes de adicioná-lo
      if (!uniqueExamNames.has(exam.name)) {
        uniqueExamNames.add(exam.name);
        return {
          name: exam.name,
          variation: { min: exam.variation.min, max: exam.variation.max },
        };
      }
      return null; // Retorna null se o nome já estiver presente para ser filtrado posteriormente
    }).filter(Boolean);

    this.examResults = this.examsList.map((exam) => ({ name: exam.name, variation: exam.variation, value: 0 }));
  }
},
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>
