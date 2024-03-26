<template>
    <div class="modal-overlay">
      <div class="modal">
        <h4>{{ title }}</h4>
        <div class="modal-content">
          <p>
            {{ information }}
          </p>
          <button type="button" class="close-button" @click="closeModal">Fechar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GenericModal',
    props: {
      title: {
        type: String,
        required: true,
      },
      information: {
        type: String,
        required: true,
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos para o modal */
  .modal-overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(68, 67, 67, 0.4);
    width: 100%;
    max-width: 80%;
    max-height: 80%;
    overflow-y: auto;
  }
  
  
  button {
    margin-top: 10px;
  }
  
  span {
      font-weight: bold;
  }
  
  h2{
    text-align: center;
  }
  
  button{
    margin: 1rem;
  }
  
  </style>
  