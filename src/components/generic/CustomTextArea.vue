<template>
  <div class="custom-text-area">
    <div class="input-container">
      <input type="text" v-model="inputValue" @input="handleInput" @keydown.tab.prevent="completeWithTab" />
      <div class="suggestions" v-if="showSuggestions">
        <div v-for="suggestion in filteredSuggestions" :key="suggestion.name" class="suggestion" @click="selectSuggestion(suggestion)" @keydown.tab.prevent="completeWithTab">
          {{ suggestion.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomTextArea',
  props: {
    suggestions: {
      type: Array,
      required: true
    },
    defaultValue: {
      type: String,
    },
  },
  data() {
    return {
      inputValue: this.defaultValue,
      showSuggestions: false
    };
  },
  computed: {
    filteredSuggestions() {
      return this.suggestions.filter(suggestion => suggestion.name.toLowerCase().includes(this.inputValue.toLowerCase()));
    }
  },
  watch: {
    value(newValue) {
      this.inputValue = newValue;
    }
  },
  methods: {
    handleInput() {
      this.showSuggestions = this.inputValue.length >= 4;
      this.$emit('setValue', this.inputValue);
    },
    selectSuggestion(suggestion) {
      this.inputValue = suggestion.data;
      this.showSuggestions = false;
      this.$emit('setValue', suggestion.data);
    },
    completeWithTab() {
      if (this.filteredSuggestions.length > 0) {
        this.inputValue = this.filteredSuggestions[0].data;
        this.showSuggestions = false;
        this.$emit('setValue', this.inputValue);
      }
    }
  }
};
</script>

<style scoped>
.custom-text-area {
  width: 100%;
}

.input-container {
  width: 100%;
}

input {
  width: 100%;
  height: 5vw;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Para garantir que o padding não afete a largura total */
}

.suggestions {
  left: 0;
  z-index: 1;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.suggestion {
  padding: 10px;
  cursor: pointer;
}

.suggestion:hover {
  background-color: #f0f0f0;
}
</style>
