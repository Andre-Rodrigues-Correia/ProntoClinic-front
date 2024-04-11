// index.js

import Vuex from 'vuex'
import patients from './modules/patients'
import patient from './modules/patient'
import appointment from './modules/appointment'
import user from './modules/user'
import clinic from './modules/clinic'
import record from './modules/record'
import exam from './modules/exam'
import recipe from './modules/recipe'
import appointments from './modules/appointments'


export default new Vuex.Store({
  modules: {
    patients,
    patient,
    appointment,
    user,
    clinic,
    record,
    exam,
    recipe,
    appointments
  }
})
