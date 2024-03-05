// index.js

import Vuex from 'vuex'
import patients from './modules/patients'


export default new Vuex.Store({
  modules: {
    patients
  }
})
