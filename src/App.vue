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
import { markRaw } from 'vue';
import Footer from './components/Footer.vue';
import HeaderAdmin from './components/HeaderAdmin.vue';

export default {
  name: 'App',
  components: {
    Footer,
  },
  data() {
    return {
      headerComponent: null,
      Header: null,
      Header2: null,
      HeaderAdmin: markRaw(HeaderAdmin),
    };
  },
  async created() {
    this.Header = markRaw((await import('./components/Header.vue')).default);
    this.Header2 = markRaw((await import('./components/Header2.vue')).default);
    this.checkUserAuthentication();
  },
  methods: {
    checkUserAuthentication() {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (token) {
        // Si l'utilisateur est un administrateur
        if (role === 'administrateur') {
          this.headerComponent = this.HeaderAdmin;
        } else {
          this.headerComponent = this.Header2;  // Affiche Header2 pour utilisateur connecté
        }
      } else {
        this.headerComponent = this.Header;  // Affiche Header pour non-connecté
      }
    },
    handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role'); 
      this.checkUserAuthentication();
      this.$router.push('/');
    }
  },
  watch: {
    '$route'() {
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
