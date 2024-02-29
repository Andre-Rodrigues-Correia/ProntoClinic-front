import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ValidateAccountView from '../views/ValidateAccountView.vue'
import '../style.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/validate',
      name: 'validateAccount',
      component: ValidateAccountView,
      props: true
    }

  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       alert('Você precisar se autenticar para ter acesso a esse conteúdo!');
      
//       next({ name: 'login' });
//     } else {
//       next();
//     }
//   } else {
//     // Se a rota não requer autenticação, permite o acesso
//     next();
//   }
// });




export default router
