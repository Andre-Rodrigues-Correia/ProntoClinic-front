<!-- AutoCompleteInput.vue -->

<template>
  <div>
    <input
      :value="inputValue"
      @input="handleInput"
      @focus="displaySuggestions"
      @blur="hideSuggestions"
    />
    <ul v-show="suggestionsVisible" class="suggestions">
      <li v-for="suggestion in filteredSuggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      inputValue: this.value || '',
      suggestions: ['Flamengo', 'Fluminense', 'Palmeiras', 'Santos', 'São Paulo'],
      suggestionsVisible: false
    };
  },
  computed: {
    filteredSuggestions() {
      return this.suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes((this.inputValue || '').toLowerCase())
      );
    }
  },
  watch: {
    value(newVal) {
      this.inputValue = newVal;
    },
    inputValue() {
      this.$emit('input', this.inputValue);
    }
  },
  methods: {
    handleInput() {
      this.suggestionsVisible = (this.inputValue || '').length > 3;
    },
    displaySuggestions() {
      this.suggestionsVisible = true;
    },
    hideSuggestions() {
      this.suggestionsVisible = false;
    },
    selectSuggestion(suggestion) {
      this.inputValue = suggestion;
      this.suggestionsVisible = false;
    }
  }
};
</script>

<style scoped>
.suggestions {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
  background-color: #f1f1f1;
}

.suggestions li:hover {
  background-color: #ddd;
}
</style>
