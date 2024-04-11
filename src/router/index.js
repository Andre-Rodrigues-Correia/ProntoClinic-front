import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ValidateAccountView from '../views/ValidateAccountView.vue'
import Appointment from '../views/Appointment.vue'
import '../style.css'
import UserAccount from '@/views/user/UserAccount.vue'
import ClinicView from '@/views/ClinicView.vue'
import CalendarView from '@/views/CalendarView.vue'
import PatientsView from '@/views/PatientsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:clinicId/:userId',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/:clinicId/:userId/pacientes',
      name: 'pacientes',
      component: PatientsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/:clinicId/:userId/atendimento/:appointmentId',
      name: 'atendimento',
      component: Appointment,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/:clinicId/:userId/agenda',
      name: 'agenda',
      component: CalendarView,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/:clinicId/:userId/minha-conta/',
      name: 'account',
      component: UserAccount,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/:clinicId/:userId/minha-clinica/',
      name: 'clinic',
      component: ClinicView,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/validate',
      name: 'validateAccount',
      component: ValidateAccountView,
      props: true
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Você precisar se autenticar para ter acesso a esse conteúdo!');
      
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    // Se a rota não requer autenticação, permite o acesso
    next();
  }
});




export default router
