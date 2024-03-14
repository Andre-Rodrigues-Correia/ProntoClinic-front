<template>
    <div class="content">
        
        <h3>{{title}}</h3>
    <div class="content-view">
        
        <ul>
            <li v-for="appointment in patientAppointments" :key="appointment._id.$oid">
                {{ appointment.record.anamnese[field] }}
            </li>
            
        </ul>
    </div>
    </div>

</template>

<script>
import appointmentService from '@/services/appointmentsService';

    export default {
        name: 'ViewdataPatient',
        props: {
            field: {
            type: String,
            required: true
            },
            title: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                patientAppointments: {}
            }
        },
        created(){
            this.getData()
        },
        methods: {
            async getData(){
                const patientId = this.$route.query.patientId;
                this.patientAppointments = await appointmentService.getAppointmentsForPatient(patientId)
                console.log(this.patientAppointments)
            }
        }
    }

</script>

<style scoped>

.content{
    width: 100%;
}

.content-view{
    width: 100%;
    height: 15vw;
    border: solid 1px ;
    margin: auto;
    overflow-y: auto;
    padding: 0.3rem;
    margin-bottom: 1rem;
    border-radius: 10px;
}   

li{
    list-style: none;
    margin: 0.5rem;
    border: 1px solid;
    overflow-y: auto;
    padding: 1rem;
    border-radius: 10px;
    max-height: 5vw;
}

h3{
    margin-bottom: 0.5rem;
    text-align: center;
}



</style>