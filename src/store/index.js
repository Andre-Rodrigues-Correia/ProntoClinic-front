// index.js

import Vuex from 'vuex'
import patients from './modules/patients'
import patient from './modules/patient'
import appointment from './modules/appointment'
import doctor from './modules/doctor'
import clinic from './modules/clinic'
import record from './modules/record'
import exam from './modules/exam'
import recipe from './modules/recipe'

export default new Vuex.Store({
  modules: {
    patients,
    patient,
    appointment,
    doctor,
    clinic,
    record,
    exam,
    recipe
  }
})
