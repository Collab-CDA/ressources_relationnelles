<template>
  <div id="app">
    <!-- Utiliser le composant Header -->
    <Header />
    
    <!-- Afficher le contenu de la route actuelle -->
    <router-view />
  </div>
</template>

<script>
// Importer le composant Header
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style>
/* Appliquer la police à tout le contenu du site */
* {
  font-family: 'Roboto', sans-serif;
}

</style>
