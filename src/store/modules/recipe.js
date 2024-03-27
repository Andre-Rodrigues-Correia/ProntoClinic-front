

const state = {
    recipe: null,
  };
  
  const mutations = {
    SET_RECIPE(state, recipe) {
      state.recipe = recipe;
    },
    UPDATE_RECIPE(state, recipe) {
      state.recipe = recipe;
    },
    CANCEL_RECIPE(state){
      state.recipe = null;
    }
  };
  
  const actions = {
   async setRecipe({ commit }, recipe) {
      try {
        commit('SET_RECIPE', recipe);
      } catch (error) {
        console.error('Error fetching recipes', error);
      }
    },
    async updateRecipe({ commit }, recipe ) {
      try {
        commit('UPDATE_RECIPE', recipe );
      } catch (error) {
        console.error('Error updating recipe', error);
      }
    },
    async cancelRecipe({ commit } ) {
      try {
        commit('CANCEL_RECIPE' );
      } catch (error) {
        console.error('Error updating recipe', error);
      }
    },
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  