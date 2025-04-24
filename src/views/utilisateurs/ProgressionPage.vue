<template>
  <div>
    <h1>Progression</h1>

    <div class="card-container">
      <!-- Liste des Favoris -->
      <div class="favorites-list">
        <h2>Vos Favoris</h2>
        <ul>
          <li v-for="favori in favoris" :key="favori.id_favori">
            <a href="#" @click.prevent="selectResource(favori.id_ressource_)">
              {{ getResourceTitle(favori.id_ressource_) }}
            </a>
            <button
              class="delete-button"
              @click="deleteFavori(favori.id_favori)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </li>
        </ul>
        <p v-if="favoris.length === 0">Aucun favori trouvé</p>
      </div>

      <!-- Tableau de bord des progressions -->
      <div class="progress-dashboard">
        <h2>Progressions</h2>
        <ul>
          <li
            v-for="progression in progressions"
            :key="progression.id_progression"
          >
            <strong>{{ getResourceTitle(progression.id_ressource_) }}</strong>
            <p v-if="progression.pourcentage_completion < 100">
              Pourcentage de complétion :
              {{ progression.pourcentage_completion }}% <span class="nonCompleted"> (non exploitée)</span>
            </p>
            <p v-else class="completed">exploitée</p>
          </li>
        </ul>
        <p v-if="progressions.length === 0">Aucune progression trouvée</p>
      </div>
    </div>

    <!-- Détails de la ressource sélectionnée -->
    <div v-if="selectedResource" class="resource-details">
      <button class="close-button" @click="selectedResource = null">
        <i class="fas fa-times"></i>
      </button>
      <h2>{{ selectedResource.titre }}</h2>
      <p>{{ selectedResource.contenu }}</p>

      <a
        v-if="
          selectedResource.lien_video &&
          !isEmbedYouTubeLink(selectedResource.lien_video)
        "
        :href="selectedResource.lien_video"
        target="_blank"
      >
        Lien vers la ressource
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProgressionPage",
  data() {
    return {
      favoris: [],
      resources: [],
      selectedResource: null,
      progressions: [],
    };
  },
  methods: {
    async fetchFavoris() {
      const userId = this.getUserIdFromToken();
      if (!userId) {
        console.warn("Utilisateur non connecté.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/favoris/${userId}`,
          this.getAuthHeaders()
        );
        this.favoris = response.data;
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération des favoris :",
          error.response ? error.response.data : error.message
        );
      }
    },
    async fetchResources() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/resources",
          this.getAuthHeaders()
        );
        this.resources = response.data;
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération des ressources :",
          error.response ? error.response.data : error.message
        );
      }
    },
    async fetchProgressions() {
      const userId = this.getUserIdFromToken();
      if (!userId) {
        console.warn("Utilisateur non connecté.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/progression/${userId}`,
          this.getAuthHeaders()
        );
        this.progressions = response.data;
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération des progressions :",
          error.response ? error.response.data : error.message
        );
      }
    },
    getResourceTitle(resourceId) {
      const resource = this.resources.find(
        (r) => r.id_ressource_ === resourceId
      );
      return resource ? resource.titre : "Titre inconnu";
    },
    selectResource(resourceId) {
      this.selectedResource = this.resources.find(
        (r) => r.id_ressource_ === resourceId
      );
    },
    async deleteFavori(favoriId) {
      try {
        await axios.delete(
          `http://localhost:3000/api/favoris/delete/${favoriId}`,
          this.getAuthHeaders()
        );
        this.favoris = this.favoris.filter((f) => f.id_favori !== favoriId);
        alert("Favori supprimé avec succès !");
      } catch (error) {
        console.warn(
          "Erreur lors de la suppression du favori :",
          error.response ? error.response.data : error.message
        );
      }
    },
    getUserIdFromToken() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          return decodedToken.id;
        } catch (error) {
          console.error("Erreur lors du décodage du token :", error);
          return null;
        }
      }
      console.warn("Token non trouvé dans le localStorage.");
      return null;
    },
    getAuthHeaders() {
      const token = localStorage.getItem("token");
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    },
    isEmbedYouTubeLink(url) {
      return /youtube\.com|youtu\.be/.test(url);
    },
    getEmbedVideo(url) {
      return `<iframe width="560" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    },
    getImageUrl(imageName) {
      return require(`@/assets/images/${imageName}`);
    },
  },
  mounted() {
    this.fetchFavoris();
    this.fetchResources();
    this.fetchProgressions();
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #ffffff;
  color: #000000;
}

h1 {
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: #0258bd;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.card-container {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin: 0 40px;
}

.favorites-list,
.progress-dashboard {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 48%;
  margin-bottom:2rem;
}

.favorites-list ul {
  list-style-type: none;
  padding: 0;
}

.favorites-list ul li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.favorites-list a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
}

.progress-dashboard ul {
padding: 1rem;
}

.delete-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #D0021B;
}

.resource-details {
  position: relative;
  background-color: #dad8d8;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  width: 100%;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  position: absolute;
  top: 10px;
  right: 10px;
  transition: transform 0.2s ease-in-out;
}

.close-button:hover {
  transform: scale(1.2);
}

.resource-details img {
  max-width: 100%;
  height: auto;
  width: 100%;
}

.completed {
  color: #7ED321;
  font-weight: bold;
}

.nonCompleted {
  color:#0258BD;
}

/* Responsive tablettes */
@media (max-width: 1024px) {
  .card-container {
    flex-direction: column;
    align-items: center;
    margin: 0 20px;
  }

  .favorites-list,
  .progress-dashboard {
    width: 100%;
  }
}

/* Responsive mobiles */
@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }

  .card-container {
    margin: 0 10px;
  }

  .favorites-list,
  .progress-dashboard {
    padding: 15px;
  }

  .favorites-list a {
    font-size: 16px;
  }

  .resource-details {
    padding: 1rem;
  }
}
</style>
