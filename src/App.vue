<template>
  <div class="app-container">
    <!-- On vérifie si l'utilisateur est connecté pour afficher le bon header -->
    <component :is="headerComponent" @logout="handleLogout" />
    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Header2 from './components/Header2.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Footer 
  },
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
    },
    handleLogout() {
      // Met à jour l'état de l'authentification après la déconnexion
      this.checkUserAuthentication();
      // Redirige vers l'accueil du menu d'utilisateur non connecté
      this.$router.push('/');
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

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>
