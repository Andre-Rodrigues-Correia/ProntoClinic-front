<template>
    <div>
      <button @click="iniciarAtendimento" v-if="!atendimentoIniciado">Iniciar</button>
      <div v-else>
        <p>Cronômetro: {{ tempoFormatado }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        atendimentoIniciado: false,
        tempo: 0,
        cronometro: null
      };
    },
    computed: {
      tempoFormatado() {
        const minutos = Math.floor(this.tempo / 60);
        const segundos = this.tempo % 60;
        return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
      }
    },
    methods: {
      iniciarAtendimento() {
        this.atendimentoIniciado = true;
        this.cronometro = setInterval(() => {
          this.tempo++;
        }, 1000);
      }
    },
    beforeDestroy() {
      clearInterval(this.cronometro);
    }
  };
  </script>
  
  <style scoped>
  /* Adicione estilos específicos para o componente Inicio aqui */
  </style>
  