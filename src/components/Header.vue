<template>
    <div class="content-container">
        <header class="header-container">
            <h1 @click="this.$router.push({ name: 'home' });">
                <span class="header-text-logo1">Pronto</span>
                <span class="header-text-logo2">Clinic!</span>
            </h1>

            <nav>
                <RouterLink class="header-button" to="/agenda">AGENDA</RouterLink>
                <RouterLink class="header-button" to="/agenda">PACIENTES</RouterLink>
                <RouterLink class="header-button" to="/agenda">ATENDIMENTOS</RouterLink>
                <RouterLink class="header-button" to="/agenda">PROFISSIONAIS DA SAÚDE</RouterLink>
                <RouterLink class="header-button" to="/agenda">CONFIGURAÇÕES</RouterLink>
                <button class="header-button" @click="logout">SAIR</button>
            
            </nav>
        </header>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'Header',
    props: {
        buttons: {
            type: Array,
            required: true,
        },
    },
    methods: {
        logout(){
            localStorage.removeItem('token');
            this.$router.push('/login'); 
        }
    }
}
</script>

<style scoped>
/* Add your component-specific styles here */
.header-text-logo1 {
    color: #525ceb;
}

.header-text-logo2 {
    color: #3d3b40;
}

h1 {
    margin-right: 5rem;
    cursor: pointer;
}

.content-container {
    width: 100%;
    display: flex;
    overflow: auto;
    align-items: center;
    flex-direction: column;
}

.header-container {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f5f5f5; /* Adicionei uma cor de fundo para melhor visualização */
    padding: 1rem;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
    
}

.header-button {
    text-decoration: none;
    color: black;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
    align-items: center;
    padding: 0.5rem 1.0rem;
    border: solid 1px;
    border-radius: 10px;
    margin-left: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.header-button:hover {
    background-color: #8188f5;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}
</style>

