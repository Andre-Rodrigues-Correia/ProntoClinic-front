<template>
    <footer>
      <p>&copy; {{ currentYear }} ProntoClinic</p>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear()
      };
    }
  }
  </script>
  
  <style scoped>
  /* Adicione seus estilos específicos do componente aqui */
  footer {
    background-color: #525ceb;
    color: #3d3b40;
    padding: 10px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
  }
  </style>
  