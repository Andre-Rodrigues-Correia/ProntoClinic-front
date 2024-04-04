<template>
  <div class="user-menu">
    <ul class="menu-options">
      <li @click="myAccount">Minha Conta</li>
      <li @click="myClinic">Informações da clinia Conta</li>
      <li @click="logout">Sair</li>
    </ul>
  </div>
</template>



<script>
import { RouterLink } from 'vue-router';
export default {
  methods: {
    logout() {
        localStorage.removeItem('token');
        this.$router.push('/login'); 
    },
    myAccount(){
      this.$emit('close');
      this.$router.push({ name: 'account'});
    },
    myClinic(){
      this.$emit('close');
      this.$router.push({ name: 'clinic'});
    },
    closeMenu(){
        this.$emit('close');
    }
  }
};
</script>

<style scoped>
.user-menu{
    position: absolute;
    right: 2rem;
}
.menu-options {
  background: #fff;
  border: 1px solid #ccc;
  padding: 5px 0;
  list-style: none;
}

.menu-options li {
  padding: 8px 10px;
  cursor: pointer;
}

.menu-options li:hover {
  background: #f0f0f0;
}
</style>
