<template>
  <div class="main-container">
    <h1>Démarrer une activité</h1>

    <ul>
      <li v-for="activity in activities" :key="activity.id_ressource_">
        {{ activity.titre }}

        <!-- Si l'activité est en cours -->
        <div v-if="activity.id_ressource_ === currentActivityId">
          <!-- Affiche le pourcentage de complétion si inférieur à 100 -->
          <span v-if="completionPercentage < 100"
            >{{ completionPercentage }}%</span
          >
          <!-- Affiche "Exploitée" si le pourcentage de complétion est 100 -->
          <span v-else>Exploitée</span>
        </div>

        <!-- Si l'activité n'est pas en cours -->
        <div v-else>
          <!-- Bouton pour démarrer l'activité -->
          <button
            @click="startActivity(activity.id_ressource_)"
            :disabled="isActivityCompleted(activity.id_ressource_)"
          >
            Démarrer
          </button>
          <!-- Affiche "Exploitée" si l'activité est complétée -->
          <span
            v-if="isActivityCompleted(activity.id_ressource_)"
            style="color: green; margin-left: 10px"
            >Exploitée</span
          >
        </div>
      </li>
    </ul>

    <!-- Affichage des détails de la ressource démarrée -->
    <div ref="activitySimulation" class="resource-details">
      <div v-if="selectedResource">
        <h2>{{ selectedResource.titre }}</h2>
        <p>{{ selectedResource.contenu }}</p>

        <div
          v-if="isEmbedYouTubeLink(selectedResource.lien_video)"
          v-html="getEmbedVideo(selectedResource.lien_video)"
        ></div>
        <div v-else-if="selectedResource.nom_image">
          <div
            v-for="file in selectedResource.nom_image"
            :key="file"
            style="margin-bottom: 10px"
          >
            <div v-if="isImage(file)">
              <img
                :src="getFileUrl(file)"
                alt="Image de la ressource"
                style="width: 100%; height: auto"
                />
            </div>
            <div v-else-if="isPDF(file)">
              <a :href="getFileUrl(file)" target="_blank" download
                >Télécharger PDF : {{ file }}</a
              >
            </div>
            <div v-else>
              <a :href="getFileUrl(file)" target="_blank" download
                >Télécharger le fichier : {{ file }}</a
              >
            </div>
          </div>
        </div>

        <!-- Si la ressource contient un lien vidéo non intégrable on redirige -->
        <a
          v-if="
            selectedResource.lien_video &&
            !isEmbedYouTubeLink(selectedResource.lien_video)
          "
          :href="selectedResource.lien_video"
          target="_blank"
          >Lien vers la ressource</a
        >

        <!-- Contrôle de progression -->
        <div class="progress-controls">
          <span v-if="completionPercentage < 100"
            >{{ completionPercentage }}%</span
          >
          <span v-else>Exploitée</span>
          <!-- Arrêt de l'activité -->
          <button @click="stopActivity">Stop</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient, { getAuthHeaders } from "@/services/api";

export default {
  name: "ActivityPage",
  data() {
    return {
      activities: [],
      currentActivityId: null,
      completionPercentage: 0,
      timer: null,
      progressions: [],
      selectedResource: null,
    };
  },
  methods: {
    async fetchActivities() {
      try {
        const response = await apiClient.get(
          "/resources",
          getAuthHeaders()
        );
        this.activities = response.data;
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération des activités :",
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
        const response = await apiClient.get(
          `/progression/${userId}`,
          getAuthHeaders()
        );
        this.progressions = response.data;
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération des progressions :",
          error.response ? error.response.data : error.message
        );
      }
    },
    // Démarre une activité
    async startActivity(resourceId) {
      const userId = this.getUserIdFromToken();
      if (!userId) {
        console.warn("Utilisateur non connecté.");
        return;
      }

      try {
        // Vérifie si une progression existe déjà
        const existingProgress = this.progressions.find(
          (p) => p.id_ressource_ === resourceId && p.statut === "en cours"
        );

        if (existingProgress) {
          // Si une progression existe, met à jour le pourcentage
          this.completionPercentage = existingProgress.pourcentage_completion;
        } else {
          // Sinon, crée une nouvelle progression
          await apiClient.post(
            "/progression",
            {
              id_ressource_: resourceId,
              statut: "en cours",
              pourcentage_completion: 0,
            },
            getAuthHeaders()
          );

          this.completionPercentage = 0;
        }

        this.currentActivityId = resourceId;
        this.selectedResource = this.activities.find(
          (activity) => activity.id_ressource_ === resourceId
        ); 
        // Démarre la progression
        this.timer = setInterval(() => {
          // Vérifie si le pourcentage de complétion est inférieur à 100
          if (this.completionPercentage < 100) {
            // Si oui, incrémente le pourcentage de complétion de 1
            this.completionPercentage += 1;
          } else {
            // Si le pourcentage de complétion est égal à 100, arrête la progression
            clearInterval(this.timer);
          }
        }, 2000); // L'intervalle est défini à 2000 millisecondes (2 secondes)

        // Défile jusqu'à l'activité démarrée
        this.$nextTick(() => {
          this.$refs.activitySimulation.scrollIntoView({ behavior: "smooth" });
        });
      } catch (error) {
        console.warn(
          "Erreur lors du démarrage de l'activité :",
          error.response ? error.response.data : error.message
        );
      }
    },
    // Arrête une activité
    async stopActivity() {
      clearInterval(this.timer);
      try {
        await apiClient.put(
          `/progression/${this.currentActivityId}`,
          {
            pourcentage_completion: this.completionPercentage,
          },
          getAuthHeaders()
        );

        alert("Activité arrêtée avec succès !");
        this.currentActivityId = null;
        this.selectedResource = null; 
      } catch (error) {
        console.warn(
          "Erreur lors de l'arrêt de l'activité :",
          error.response ? error.response.data : error.message
        );
      }
    },
    // Vérifie si une activité est complétée
    isActivityCompleted(resourceId) {
      const progress = this.progressions.find(
        (p) => p.id_ressource_ === resourceId
      );
      return progress ? progress.pourcentage_completion === 100 : false;
    },
    // Using imported getAuthHeaders from api.js instead
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
    getEmbedVideo(url) {
      return `<iframe src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-wr src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    },
    isEmbedYouTubeLink(url) {
      return /youtube\.com|youtu\.be/.test(url);
    },
    isImage(file) {
      if (file.startsWith("data:")) return true;
      return /\.(jpg|jpeg|png|gif)$/i.test(file);
    },
    isPDF(file) {
      if (file.startsWith("data:")) return false;
      return /\.pdf$/i.test(file);
    },
    getFileUrl(file) {
      if (file) {
        return `${process.env.VUE_APP_API_URL}/uploads/${file}`;
      }
      return "";
    },
  },
  mounted() {
    this.fetchActivities();
    this.fetchProgressions();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

.main-container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Roboto", sans-serif;
  background-color: #ffffff;
  color: #000000;
}

h1 {
  font-family: "Roboto", sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: #0258bd;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

li {
  background-color: #dad8d8;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: calc(33.333% - 20px);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li h2 {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 0;
}

button {
  background-color: #b0a2ba;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  margin-left: auto;
}

button:hover {
  background-color: #d4c4e0;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 1024px) {
  li {
    width: calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  li {
    width: 100%;
  }
}

.resource-details {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.resource-details h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.resource-details p {
  margin-bottom: 20px;
}

.resource-details img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.resource-details a {
  color: #0258bd;
  text-decoration: none;
  font-weight: bold;
}

.resource-details a:hover {
  text-decoration: underline;
}

.progress-controls {
  margin-top: 2rem;
}

.progress-controls span {
  font-size: 16px;
  font-weight: bold;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
