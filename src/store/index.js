// index.js

import Vuex from 'vuex'
import patients from './modules/patients'
import patient from './modules/patient'


export default new Vuex.Store({
  modules: {
    patients,
    patient
  }
})
