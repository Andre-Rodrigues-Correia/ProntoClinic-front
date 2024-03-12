<template>
  <div class="container">
    <table v-if="paciente.resultadoExames.length >= 0" class="result-table">
      <thead>
        <tr>
          <th>Nome do Exame</th>
          <th>Variação Min/Max</th>
          <th v-for="data in datasExames" :key="data">
            Resultado {{ data }}
          </th>
          <th>Resultado do Dia Atual</th>
          <th>Adicionar Resultado</th>
          <th>Excluir Exame</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="paciente.resultadoExames.length === 0 || novaLinhaVisivel">
          <td>
            <select v-model="novaLinha.nome" @change="atualizarMinEMax" class="select-box">
              <option v-for="exameDisponivel in examesDisponiveis" :key="exameDisponivel.nome" :value="exameDisponivel.nome">
                {{ exameDisponivel.nome }}
              </option>
            </select>
          </td>
          <td>
            <input v-model="novaLinha.min" type="number" class="input-number" /> a
            <input v-model="novaLinha.max" type="number" class="input-number" />
          </td>
          <td v-for="data in datasExames" :key="data">
            <!-- Lógica para exibir os resultados do novo exame -->
          </td>
          <td>
            <input v-model="novaLinha.resultadoAtual" :style="{ backgroundColor: verificarIntervalo(novaLinha) ? 'red' : '' }" class="input-number" />
          </td>
          <td>
            <button @click="adicionarResultadoAtual(novaLinha)" class="action-button">Adicionar</button>
          </td>
          <td>
            <button @click="excluirNovaLinha" class="action-button delete-button">Excluir</button>
          </td>
        </tr>
        <tr v-for="(exame, index) in examesComResultados" :key="index">
          <td>{{ exame.nome }}</td>
          <td>
            <input v-model="exame.min" type="number" class="input-number" /> a
            <input v-model="exame.max" type="number" class="input-number" />
          </td>
          <td v-for="data in datasExames" :key="data">
            {{ obterResultado(exame, data) !== undefined ? obterResultado(exame, data) : 'Não fez esse exame nesse dia' }}
          </td>
          <td>
            <input v-model="exame.resultadoAtual" :style="{ backgroundColor: verificarIntervalo(exame) ? 'red' : '' }" class="input-number" />
          </td>
          <td>
            <button @click="adicionarResultadoAtual(exame)" class="action-button">Adicionar</button>
          </td>
          <td>
            <button @click="excluirExame(exame)" class="action-button delete-button">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="adicionarNovaLinha" class="action-button">Adicionar Nova Linha</button>
    <button @click="atualizarExames" class="action-button">Atualizar e Log</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paciente: {
        resultadoExames: [
          { nome: 'Exame A', data: '01/02/2021', resultado: 10, min: 50, max: 100 },
          { nome: 'Exame B', data: '04/03/2022', resultado: 85, min: 10, max: 50 },
        ],
      },
      examesDisponiveis: [
        { nome: 'Exame A', min: 50, max: 100 },
        { nome: 'Exame B', min: 10, max: 50 },
        { nome: 'Exame C', min: null, max: null },
        // Adicione outros exames conforme necessário
      ],
      novaLinhaVisivel: false,
      novaLinha: {
        nome: '',
        min: 0,
        max: 0,
        resultadoAtual: '',
      },
    };
  },
  computed: {
    datasExames() {
      const datas = new Set();
      this.paciente.resultadoExames.forEach((resultadoExame) => {
        datas.add(resultadoExame.data);
      });
      return Array.from(datas);
    },
    examesComResultados() {
      return this.paciente.resultadoExames;
    },
  },
  methods: {
    adicionarExame() {
      this.novaLinhaVisivel = true;
    },
    adicionarResultadoAtual(exame) {
      const dataAtual = new Date().toLocaleDateString();
      exame.resultadoAtual = parseFloat(exame.resultadoAtual);
      const resultadoExistente = this.paciente.resultadoExames.find(
        (resultadoExame) => resultadoExame.nome === exame.nome && resultadoExame.data === dataAtual
      );

      if (resultadoExistente) {
        resultadoExistente.resultado = exame.resultadoAtual;
        resultadoExistente.min = exame.min;
        resultadoExistente.max = exame.max;
      } else {
        this.paciente.resultadoExames.push({
          nome: exame.nome,
          data: dataAtual,
          resultado: exame.resultadoAtual,
          min: exame.min,
          max: exame.max,
        });
      }

      exame.resultadoAtual = '';
    },
    verificarIntervalo(exame) {
      const resultadoAtual = parseFloat(exame.resultadoAtual);
      return resultadoAtual < exame.min || resultadoAtual > exame.max;
    },
    obterResultado(exame, data) {
      const resultado = this.paciente.resultadoExames.find(
        (resultadoExame) => resultadoExame.nome === exame.nome && resultadoExame.data === data
      );
      return resultado ? resultado.resultado : undefined;
    },
    adicionarNovaLinha() {
      this.novaLinhaVisivel = true;
    },
    atualizarMinEMax() {
      const exameSelecionado = this.examesDisponiveis.find((exame) => exame.nome === this.novaLinha.nome);

      if (exameSelecionado) {
        this.novaLinha.min = exameSelecionado.min;
        this.novaLinha.max = exameSelecionado.max;
      }
    },
    excluirNovaLinha() {
      this.novaLinha = {
        nome: '',
        min: 0,
        max: 0,
        resultadoAtual: '',
      };
      this.novaLinhaVisivel = false;
    },
    excluirExame(exame) {
      const index = this.paciente.resultadoExames.indexOf(exame);
      if (index !== -1) {
        this.paciente.resultadoExames.splice(index, 1);
      }
    },
    atualizarExames() {
      console.log('Exames Atualizados:', this.paciente.resultadoExames);
    },
  },
};
</script>

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

</style>
