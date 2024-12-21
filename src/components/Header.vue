<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <!-- Logo ou titre de l'application -->
        <a class="navbar-brand" href="#">Mon Application</a>
        <!-- Bouton pour le menu mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Menu de navigation -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Accueil</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Connexion</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/resources" class="nav-link">Ressources</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/dashboard" class="nav-link">Tableau de bord</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: "Header",
  };
  </script>
  
  <style scoped>
  /* Ajoute ici les styles personnalisés si nécessaire */
  </style>
  