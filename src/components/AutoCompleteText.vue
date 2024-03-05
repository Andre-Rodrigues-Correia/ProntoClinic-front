<template>
    <div class="input-container">
      <input
        ref="inputField"
        v-model="inputText"
        @input="onInputChange"
        @keydown.tab.prevent="completeSuggestion"
      />
      <div v-if="showSuggestions && filteredSuggestions.length > 0" class="suggestion">
        {{ filteredSuggestions[0].slice(inputText.length) }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        inputText: "",
        suggestions: ["flamengo", "fluminense", "corinthians", "palmeiras"],
        showSuggestions: false,
      };
    },
    computed: {
      filteredSuggestions() {
        return this.suggestions.filter((suggestion) =>
          suggestion.toLowerCase().startsWith(this.inputText.toLowerCase())
        );
      },
    },
    methods: {
      onInputChange() {
        this.showSuggestions = true;
      },
      completeSuggestion() {
        if (this.filteredSuggestions.length > 0) {
          this.inputText += this.filteredSuggestions[0].slice(
            this.inputText.length
          );
          this.showSuggestions = false;
          this.$refs.inputField.focus();
        }
      },
    },
  };
  </script>
  
  <style>
  .input-container {
    position: relative;
    display: inline-block;
  }
  
  .suggestion {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #ffffff;
    border: 1px solid #ccc;
    padding: 5px;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  </style>
  