<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="modal-content">
        <h2>{{ editedCard.title }}</h2>
        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label for="cartTitle">Título do card:</label>
            <input v-model="editedCard.title" />
          </div>
          <div class="form-group">
            <label for="information">Informações:</label>
            <input v-model="editedCard.information" />
          </div>

          <div class="form-group">
            <label for="information">Selecione a cor:</label>
            <div class="color-buttons">
              <button :style="{ backgroundColor: 'green' }" @click="selectColor('green')"></button>
              <button :style="{ backgroundColor: 'yellow' }" @click="selectColor('yellow')"></button>
              <button :style="{ backgroundColor: 'red' }" @click="selectColor('red')"></button>
            </div>
          </div>

          <div class="buttons-content">
            <button class="create-button" type="submit">Salvar Alterações</button>
            <button class="close-button" @click="closeEditModal">Fechar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditCardModal',
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedCard: { ...this.card }, // Clone do card para edição
    };
  },
  methods: {
    saveChanges() {
      this.$emit('save', this.editedCard);
      this.$emit('close');
    },
    closeEditModal() {
      this.$emit('close');
    },
    selectColor(color) {
      this.editedCard.backgroundColor = color;
    },
  },
};
</script>

<style scoped>
/* Estilos para o modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-content {
  padding: auto;
}

form {
  max-width: 500px;
  width: 100%;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

input {
  display: flex;
  width: 100%;
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
  border: solid 1px black;
  border-radius: 5px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.readonly-input {
  background-color: #f2f2f2; /* Cor de fundo cinza */
  color: #888; /* Cor de texto mais escura para dar a aparência de desativado */
  pointer-events: none; /* Impede a interação do usuário com o campo */
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.color-buttons {
  display: flex;
  margin-bottom: 15px;
}

button {
  flex: 1; /* Ocupa o espaço disponível */
  margin: 0 5px;
  padding: 10px;
  border: none;
  cursor: pointer;
}



.buttons-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
