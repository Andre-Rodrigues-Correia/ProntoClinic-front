<template>

  <div id="app">
    <Header />
    <main>
      <RouterView/>
    </main>
    <Footer />
  </div>
</template>

<script>
//import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Header,
    Footer
},
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>
