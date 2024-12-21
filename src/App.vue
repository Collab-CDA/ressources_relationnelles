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
/* Ajouter ici des styles généraux pour l'application si nécessaire */
</style>
