<template>
    <div class="exams-content">
      <table>
        <thead>
          <tr>
            <th>Exame</th>
            <th>Variações (min - max)</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>
              <select v-model="item.exame" @change="updateVariations(item)">
                <option v-for="exam in exams" :key="exam.name" :value="exam.name">{{ exam.name }}</option>
                <option value="custom">Outro (customizado)</option>
              </select>
              <input v-if="item.exame === 'custom'" v-model="item.customExame" type="text" placeholder="Nome do exame customizado" />
            </td>
            <td>
              <input v-if="(item.exame === 'custom' || exams.find(exam => exam.name === item.exame))" v-model="item.variations.min" type="number" placeholder="Mínimo" />
              -
              <input v-if="(item.exame === 'custom' || exams.find(exam => exam.name === item.exame))" v-model="item.variations.max" type="number" placeholder="Máximo" />
              <span v-else>{{ item.variations.min }} - {{ item.variations.max }}</span>
            </td>
            <td>
              <input v-model="item.value" type="text" :class="{ 'invalid-input': item.value !== '' && !isValueValid(item) }" />
            </td>
            <td>
              <button @click="removeItem(index)">Remover</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addItem">Adicionar Linha</button>
      <button @click="saveData('recipes')" :disabled="!isDataValid">Salvar</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        record: null,
        exams: [
          { name: 'Exame A', min: 10, max: 20 },
          { name: 'Exame B', min: 5, max: 15 },
        ],
        items: [],
      };
    },
    created() {
      this.getData();
        this.items = [...this.record.prescriptions.exams] || [];
      
    },
    methods: {
      getData() {
        this.record = { ...this.$store.state.record.record };
      },
      addItem() {
        this.items.push({
          exame: '',
          customExame: '',
          variations: { min: null, max: null },
          value: '',
        });
      },
      removeItem(index) {
        this.items.splice(index, 1);
      },
      updateVariations(item) {
        if (item.exame !== 'custom' && this.exams.find(exam => exam.name === item.exame)) {
          const selectedExam = this.exams.find(exam => exam.name === item.exame);
          item.variations.min = selectedExam.min;
          item.variations.max = selectedExam.max;
        } else {
          item.variations.min = null;
          item.variations.max = null;
        }
      },
      async saveData(destiny) {
        this.record.prescriptions.exams = this.items;
        await this.$store.dispatch('record/updateRecord', { ...this.record });
  
        this.$emit('sendMenu', destiny);
      },
      isValueValid(item) {
        const min = item.variations.min;
        const max = item.variations.max;
        const value = parseFloat(item.value);
  
        if (min !== null && max !== null && !isNaN(value)) {
          return value >= min && value <= max;
        }
  
        return false;
      },
    },
    computed: {
      isDataValid() {
        return this.items.every(item => {
          if (item.exame !== 'custom') {
            return item.exame && item.variations.min !== null && item.variations.max !== null && item.value !== '';
          } else {
            return item.customExame && item.variations.min !== null && item.variations.max !== null && item.value !== '';
          }
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .exams-content {
    width: 100%;
    margin-bottom: 2rem;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
    font-family: 'Arial', sans-serif;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #4caf50;
    color: white;
  }
  
  td select,
  td input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    margin: 4px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  td select {
    height: 38px;
  }
  
  td input[type='number'] {
    width: 60px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
  
  .invalid-input {
    background-color: red;
  }
  </style>
  
  

  



<!-- export default {
    name: 'Exams',
    data() {
        return {
            record: null,
            rows: [{
                exame: 'exame1',
                variacaoMin: 0,
                variacaoMax: 100,
                unidadeMedida: 'metros',
                valor: ''
            }]
        }
    },
    created(){
        this.getData()
    },
    methods: {
        getData(){
            this.record = { ...this.$store.state.record.record };
        },
        async sendData(destiny){
           
            this.record.prescriptions.exams.push({
                name: 'exam 01',
                variation: {
                    min: 1,
                    max: 99
                },
                value: 88
            });

            
            await this.$store.dispatch('record/updateRecord', { ...this.record }); // Cria uma cópia reativa do objeto
            this.$emit('sendMenu', destiny);
        },
        adicionarLinha() {
            this.rows.push({
                exame: 'exame1',
                variacaoMin: 0,
                variacaoMax: 100,
                unidadeMedida: 'metros',
                valor: ''
            });
            },
        removerLinha(index) {
            this.rows.splice(index, 1);
        }
    }
} -->