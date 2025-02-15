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
      // Si le token est présent, cela signifie que l'utilisateur est connecté
      this.headerComponent = token ? this.Header2 : this.Header;
    },
    handleLogout() {
      localStorage.removeItem('token');
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
