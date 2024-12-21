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
body {
  font-family: 'Roboto', sans-serif;
}
</style>
