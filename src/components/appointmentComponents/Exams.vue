<template>
    <div class="exams-content">
      <div class="title">
        <h2>Exames</h2>
      </div>
      <table class="custom-table">
        <thead>
          <tr>
            <th>Exame</th>
            <th>Variações</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td>
              <select v-model="row.exame" @change="checkCustomExame(row, index)">
                <option v-for="option in examesOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
              </select>
              <!-- Adicione uma caixa de texto para exames personalizados -->
              <input
                v-if="row.exame === 'customizado'"
                type="text"
                placeholder="Nome do exame"
                v-model="row.exameNome"
              />
            </td>
            <td>
              <div class="variacao-inputs">
                <label>Min:</label>
                <input type="number" v-model="row.variacaoMin" />
                <label>Max:</label>
                <input type="number" v-model="row.variacaoMax" />
                <label>Posologia:</label>
                <input type="text" v-model="row.posologia" />
              </div>
            </td>
            <td>
              <input type="text" v-model="row.valor" />
            </td>
            <td>
              <button @click="removerLinha(index)">Remover</button>
            </td>
          </tr>
        </tbody>
        <button @click="adicionarLinha">Adicionar Nova Linha</button>
      </table>
  
      <div class="buttons-content">
        <button class="create-button" @click="sendData('record')">Voltar</button>
        <button class="create-button" @click="sendData('recipes')">Avançar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Exams',
    data() {
      return {
        record: null,
        examesOptions: [
          { label: 'Exame 1', value: 'exame1' },
          { label: 'Exame 2', value: 'exame2' },
          { label: 'Customizado', value: 'customizado' },
          // Adicione mais opções conforme necessário
        ],
        rows: [
          {
            exame: 'exame1',
            variacaoMin: 0,
            variacaoMax: 100,
            posologia: '',
            valor: '',
          },
        ],
      };
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        this.record = { ...this.$store.state.record.record };
      },
      async sendData(destiny) {
        // Verifique se o campo de valor não está vazio antes de adicionar ao array
        if (this.rows.every(row => row.valor !== '')) {
          // Mapeie as linhas para o formato desejado antes de adicionar ao array
          const examsData = this.rows.map(row => ({
            name: row.exame === 'customizado' ? row.exameNome : row.exame,
            variations: {
              min: row.variacaoMin,
              max: row.variacaoMax,
            },
            value: row.valor,
          }));

          console.log(examsData)
  
          this.record.prescriptions.exams = [...this.record.prescriptions.exams, ...examsData];
          
          await this.$store.dispatch('record/updateRecord', { ...this.record });
          this.$emit('sendMenu', destiny);
        } else {
          alert('Preencha todos os campos de valor antes de avançar.');
        }
      },
  
      adicionarLinha() {
        // Verifique se o campo de valor não está vazio antes de adicionar uma nova linha
        if (this.rows.every(row => row.valor !== '')) {
          this.rows.push({
            exame: 'exame1',
            variacaoMin: 0,
            variacaoMax: 100,
            posologia: '',
            valor: '',
          });
        } else {
          alert('Preencha todos os campos de valor antes de adicionar uma nova linha.');
        }
      },
  
      removerLinha(index) {
        this.rows.splice(index, 1);
      },
  
      checkCustomExame(row, index) {
        // Se a opção selecionada for "customizado", defina o nome do exame como vazio
        if (row.exame === 'customizado') {
          this.$set(this.rows, index, { exame: 'customizado', exameNome: '', variacaoMin: 0, variacaoMax: 0, posologia: '', valor: '' });
        }
      },
    },
  };
  </script>




<style>
.exams-content{
    width: 100%;
}

.title{
    text-align: center;
    margin-bottom: 1rem;
}
.custom-table {
    flex: 1;
    flex-direction: column;
    padding: 2rem;
    margin: auto;
    border: 1px solid;
}

.buttons-content{
    padding: 2rem;
    text-align: center;
}

.buttons-content button{
    margin-left: 1rem;
}

.custom-table th, .custom-table td {
  padding: 10px;
  text-align: left;
}

.custom-table th {
  background-color: #3498db;
  color: #fff;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #ecf0f1;
}

.custom-table select,
.custom-table input,
.custom-table button,
.custom-table label {
  width: 100%;
  padding: 0.7rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

}

.variacao-inputs {
  display: flex;
}


.custom-table button {
  padding: 10px;
  background-color: #2ecc71;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.custom-table button:hover {
  background-color: #27ae60;
}
</style>