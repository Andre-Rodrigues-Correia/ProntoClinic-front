<template>
    <div class="loading-spinner">
      <div class="spinner"></div>
    </div>
  </template>
  
  <style scoped>
  .loading-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db; /* Cor do spinner, pode ser ajustada conforme necessário */
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  