<template>
    <div class="recipe-container">
      <h2>Receitas Médicas</h2>
  
      <div class="recipe-form">
        <label for="medicine">Medicamento:</label>
        <input v-model="newRecipe.medicine" type="text" id="medicine" />
  
        <label for="dosage">Dosagem:</label>
        <input v-model="newRecipe.dosage" type="text" id="dosage" />
  
        <label for="instructions">Instruções:</label>
        <textarea v-model="newRecipe.instructions" id="instructions"></textarea>
  
        <button @click="addRecipe" class="add-recipe-btn">Adicionar Receita</button>
      </div>
  
      <div class="recipe-list">
        <h3>Lista de Receitas:</h3>
        <ul>
          <li v-for="(recipe, index) in recipes" :key="index">
            <span class="recipe-details">
              {{ recipe.medicine }} - {{ recipe.dosage }} - {{ recipe.instructions }}
            </span>
            <button @click="removeRecipe(index)" class="remove-recipe-btn">Remover</button>
          </li>
        </ul>
      </div>
  
      <button @click="saveRecipes" class="save-recipes-btn">Salvar Receitas</button>
  
      <div class="navigation-buttons">
        <button @click="sendData('exams')" class="back-btn">Voltar</button>
        <button @click="sendData('finish')" class="next-btn">Avançar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Exams',
    data() {
      return {
        record: null,
        newRecipe: {
          medicine: '',
          dosage: '',
          instructions: '',
        },
        recipes: [],
      };
    },
    created() {
        this.getData();
    },
    methods: {
      async getData(){
        this.record = { ...this.$store.state.record.record };
        this.recipes = [...this.record.prescriptions.medicines] || [];
        console.log(this.recipes)
      },
      async sendData(destiny) {
        console.log(this.record);
        await this.$store.dispatch('record/updateRecord', this.record);
        this.$emit('sendMenu', destiny);
      },
      addRecipe() {
        if (this.newRecipe.medicine && this.newRecipe.dosage && this.newRecipe.instructions) {
          this.recipes.push({ ...this.newRecipe });
          this.clearForm();
        } else {
          alert('Por favor, preencha todos os campos da receita.');
        }
      },
      removeRecipe(index) {
        this.recipes.splice(index, 1);
      },
      saveRecipes() {
        // Chamada para a API para salvar as receitas (Exemplo: axios.post('sua/api/receitas', this.recipes))
        this.record.prescriptions.medicines = this.recipes;
        console.log(this.record)
        console.log('Receitas salvas:', this.recipes);
      },
      clearForm() {
        this.newRecipe = {
          medicine: '',
          dosage: '',
          instructions: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .recipe-container {
    width: 100%;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
    margin-bottom: 2rem;
  }
  
  .recipe-form {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .add-recipe-btn,
  .remove-recipe-btn,
  save-recipes-btn,
  .back-btn,
  .next-btn {
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .add-recipe-btn:hover,
  .remove-recipe-btn:hover,
  save-recipes-btn:hover,
  .back-btn:hover,
  .next-btn:hover {
    background-color: #45a049;
  }
  
  .recipe-list {
    margin-top: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .recipe-details {
    flex-grow: 1;
  }
  
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  </style>
  