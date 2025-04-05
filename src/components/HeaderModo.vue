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
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/admin/dashboard" class="nav-link">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/modo/resources" class="nav-link">Gestion des ressources</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/commentaires" class="nav-link">Gestion des commentaires</router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tableau de bord
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <router-link to="/profile" class="dropdown-item">Profil</router-link>
                </li>
                <li>
                  <a @click.prevent="logout" class="dropdown-item logout-link">Déconnexion</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "HeaderAdmin",
    emits: ['logout'],
    methods: {
      logout() {
        localStorage.removeItem("token"); // Retire le token du localStorage
        localStorage.removeItem("role");  // Supprime le rôle du localStorage
        this.$emit('logout');
      }
    }
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
    top: 50%; 
    left: 45px;
    transform: translateY(-50%);
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
  
  .logout-link:hover {
    cursor: pointer;
  }
  
  body {
    font-family: "Roboto", sans-serif;
  }
  </style>
  