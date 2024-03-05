<template>
    <div class="content-container">
        <header class="header-container">
            <h1 @click="this.$router.push({ name: 'home' });">
                <span class="header-text-logo1">Pronto</span>
                <span class="header-text-logo2">Clinic!</span>
            </h1>

            <nav>
                <RouterLink class="header-button" to="/pacientes">PACIENTES</RouterLink>
                <RouterLink class="header-button" to="/atendimentos">ATENDIMENTOS</RouterLink>
                <button class="header-button" @click="logout">SAIR</button>
            
            </nav>
        </header>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'Header',
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

    padding: 1rem;

    
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

}

.header-button:hover {
    background-color: #8188f5;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>

