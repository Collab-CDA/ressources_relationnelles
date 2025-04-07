<template>
  <div class="app-container">
    <component :is="headerComponent" @logout="handleLogout" />
    <div class="content">
      <router-view @header-selected="updateHeaderComponent" />
    </div>
    <Footer />
  </div>
</template>

<script>
import { markRaw } from 'vue';
import Footer from './components/Footer.vue';
import HeaderAdmin from './components/HeaderAdmin.vue';
import HeaderModo from './components/HeaderModo.vue';
import HeaderSuperAdmin from './components/HeaderSuperAdmin.vue';

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
      HeaderModo: markRaw(HeaderModo),
      HeaderSuperAdmin: markRaw(HeaderSuperAdmin),
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
      const headerChoisi = localStorage.getItem('headerChoisi');

      console.log('Role:', role);

      if (token) {
        if (role === 'Admin' && headerChoisi) {
          this.headerComponent = headerChoisi === 'HeaderAdmin' ? this.HeaderAdmin : this.Header2;
        } else if (role === 'Modérateur') {
          if (!headerChoisi) {
            this.$router.push('/choix-header');
          } else {
            this.headerComponent = headerChoisi === 'HeaderModo' ? this.HeaderModo : this.Header2;
          }
        } else if (role === 'Super-Admin') {
          if (!headerChoisi) {
            this.$router.push('/choix-header');
          } else {
            this.headerComponent = headerChoisi === 'HeaderSuperAdmin' ? this.HeaderSuperAdmin : this.Header2;
          }
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
      localStorage.removeItem('headerChoisi');
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
