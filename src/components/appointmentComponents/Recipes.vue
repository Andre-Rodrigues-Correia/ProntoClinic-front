<template>

    <h1>
        Recipes
    </h1>
    <button @click="sendData('exams')">Voltar</button>
    <button @click="sendData('finish')">Avançar</button>
    


</template>

<script>
    export default {
        name: 'Exams',
        data() {
            return {
                record: null,
            }
        },
        created(){
            this.record = this.$store.state.record.record;
        },
        methods: {
            async sendData(destiny){
                console.log(this.record)
                await this.$store.dispatch('record/updateRecord', this.record);
                this.$emit('sendMenu', destiny);
            },
        },

    }

</script>


<style>

</style>