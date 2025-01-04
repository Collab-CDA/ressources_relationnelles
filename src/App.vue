<template>
  <div>
    <!-- On vérifie si l'utilisateur est connecté pour afficher le bon header -->
    <component :is="headerComponent" />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Header2 from './components/Header2.vue';

export default {
  name: 'App',
  data() {
    return {
      headerComponent: null,
    };
  },
  created() {
    this.checkUserAuthentication();
  },
  methods: {
    checkUserAuthentication() {
      const token = localStorage.getItem('token');
      // Si le token est présent, cela signifie que l'utilisateur est connecté
      this.headerComponent = token ? Header2 : Header;
    }
  },
  watch: {
    // Surveille le changement du token et met à jour le header en conséquence
    '$route'(to, from) {
      this.checkUserAuthentication();
    }
  }
};
</script>
