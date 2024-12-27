<template>
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <a class="navbar-brand nomAppli">(RE)Sources Relationnelles</a>
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
.nomAppli {
  font-size: 32px;
  font-weight: bold;
  color: white;
}

.nomAppli:hover {
  color: white; 
  text-decoration: none;
}

.navbar {
  background-color: #0258BD;
}
</style>
  