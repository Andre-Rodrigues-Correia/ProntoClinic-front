<template>
  <div>
    <button @click="adicionarExame">Adicionar Exame</button>
    <table>
      <thead>
        <tr>
          <th>Nome do Exame</th>
          <th>Variação Min/Max</th>
          <th v-for="data in datasExames" :key="data">
            Resultado {{ data }}
          </th>
          <th>Resultado do Dia Atual</th>
          <th>Adicionar Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(exame, index) in examesComResultados" :key="index">
          <td>{{ exame.nome }}</td>
          <td>
            <input v-model="exame.min" type="number" />
            a
            <input v-model="exame.max" type="number" />
          </td>
          <td v-for="data in datasExames" :key="data">
            {{ obterResultado(exame, data) !== undefined ? obterResultado(exame, data) : 'Não fez esse exame nesse dia' }}
          </td>
          <td>
            <input v-model="exame.resultadoAtual" :style="{ backgroundColor: verificarIntervalo(exame) ? 'red' : '' }" />
          </td>
          <td>
            <button @click="adicionarResultadoAtual(exame)">Adicionar</button>
          </td>
        </tr>
        <tr v-if="novaLinhaVisivel || examesComResultados.length === 0">
          <td>
            <select v-model="novaLinha.nome" @change="atualizarMinEMax">
              <option v-for="exameDisponivel in examesDisponiveis" :key="exameDisponivel.nome" :value="exameDisponivel.nome">
                {{ exameDisponivel.nome }}
              </option>
            </select>
          </td>
          <td>
            <input v-model="novaLinha.min" type="number" />
            a
            <input v-model="novaLinha.max" type="number" />
          </td>
          <td v-for="data in datasExames" :key="data">
            <!-- Lógica para exibir os resultados do novo exame -->
          </td>
          <td>
            <input v-model="novaLinha.resultadoAtual" :style="{ backgroundColor: verificarIntervalo(novaLinha) ? 'red' : '' }" />
          </td>
          <td>
            <button @click="adicionarResultadoAtual(novaLinha)">Adicionar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="atualizarExames">Atualizar e Log</button>
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
    atualizarMinEMax() {
      const exameSelecionado = this.examesDisponiveis.find((exame) => exame.nome === this.novaLinha.nome);

      if (exameSelecionado) {
        this.novaLinha.min = exameSelecionado.min;
        this.novaLinha.max = exameSelecionado.max;
      }
    },
    atualizarExames() {
      console.log('Exames Atualizados:', this.paciente.resultadoExames);
    },
  },
};
</script>

<style scoped>
/* Estilos opcionais para personalizar a aparência da tabela, inputs, etc. */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

input, select {
  width: 100%;
  box-sizing: border-box;
}
</style>
