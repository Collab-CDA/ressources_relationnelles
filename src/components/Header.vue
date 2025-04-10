<template>
  <header>
    <div class="header-content">
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <p class="nomAppli">(RE)Sources Relationnelles</p>
    </div>
  </header>

  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Menu de navigation -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tuto" class="nav-link">Tuto plateforme</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/resources-public" class="nav-link">Ressources</router-link>
          </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Connexion</router-link>
            </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
     
    };
  },
};
</script>

<style scoped>
header {
  background-color: #0258bd;
  padding: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nomAppli {
  font-size: 32px;
  font-weight: bold;
  color: white;
  position: absolute;
  top: 50%; /* Centré verticalement */
  left: 45px;
  transform: translateY(-50%); /* Ajuste la position verticale */
  z-index: 1;
  margin: 0;
}

.logo {
  max-width: 110px;
  display: block;
}

.navbar {
  background-color: #80ada0;
  margin-top: 0;
}

.nav-link {
  font-weight: bold;
  margin-left: 3rem;
}

.nav-item.dropdown .dropdown-menu {
  background-color: #80ada0;
}

body {
  font-family: "Roboto", sans-serif;
}
</style>
