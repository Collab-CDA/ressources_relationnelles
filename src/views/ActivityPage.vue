<template>
  <div class="main-container">
    <h1>Démarrer une activité</h1>
    <ul>
      <li v-for="activity in activities" :key="activity.id_ressource_">
        {{ activity.titre }}
        <div v-if="activity.id_ressource_ === currentActivityId">
          <span v-if="completionPercentage < 100">{{ completionPercentage }}%</span>
          <span v-else>Exploitée</span>
          <button @click="stopActivity">Stop</button>
        </div>
        <div v-else>
          <button
            @click="startActivity(activity.id_ressource_)"
            :disabled="isActivityCompleted(activity.id_ressource_)"
          >
            Démarrer
          </button>
          <span v-if="isActivityCompleted(activity.id_ressource_)" style="color: green; margin-left: 10px;">Exploitée</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ActivityPage',
  data() {
    return {
      activities: [],
      currentActivityId: null,
      completionPercentage: 0,
      timer: null,
      progressions: []
    };
  },
  methods: {
    async fetchActivities() {
  try {
    const response = await axios.get('http://localhost:3000/api/resources', this.getAuthHeaders());
    this.activities = response.data;
  } catch (error) {
    console.warn("Erreur lors de la récupération des activités :", error.response ? error.response.data : error.message);
  }
}
,
    async fetchProgressions() {
      const userId = this.getUserIdFromToken();
      if (!userId) {
        console.warn("Utilisateur non connecté.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/progression/${userId}`, this.getAuthHeaders());
        this.progressions = response.data;
      } catch (error) {
        console.warn("Erreur lors de la récupération des progressions :", error.response ? error.response.data : error.message);
      }
    },
    async startActivity(resourceId) {
      const userId = this.getUserIdFromToken();
      if (!userId) {
        console.warn("Utilisateur non connecté.");
        return;
      }

      try {
        // Vérifie si une progression existe déjà
        const existingProgress = this.progressions.find(p => p.id_ressource_ === resourceId && p.statut === 'en cours');

        if (existingProgress) {
          // Si une progression existe, mettez à jour le pourcentage
          this.completionPercentage = existingProgress.pourcentage_completion;
        } else {
          // Sinon, crée une nouvelle progression
          await axios.post('http://localhost:3000/api/progression', {
            id_ressource_: resourceId,
            statut: 'en cours',
            pourcentage_completion: 0
          }, this.getAuthHeaders());

          this.completionPercentage = 0;
        }

        this.currentActivityId = resourceId;
        this.timer = setInterval(() => {
          if (this.completionPercentage < 100) {
            this.completionPercentage += 1;
          } else {
            clearInterval(this.timer);
          }
        }, 2000);
      } catch (error) {
        console.warn("Erreur lors du démarrage de l'activité :", error.response ? error.response.data : error.message);
      }
    },
    async stopActivity() {
      clearInterval(this.timer);
      try {
        await axios.put(`http://localhost:3000/api/progression/${this.currentActivityId}`, {
          pourcentage_completion: this.completionPercentage
        }, this.getAuthHeaders());

        alert("Activité arrêtée avec succès !");
        this.currentActivityId = null;
      } catch (error) {
        console.warn("Erreur lors de l'arrêt de l'activité :", error.response ? error.response.data : error.message);
      }
    },
    isActivityCompleted(resourceId) {
      const progress = this.progressions.find(p => p.id_ressource_ === resourceId);
      return progress ? progress.pourcentage_completion === 100 : false;
    },
    getAuthHeaders() {
      const token = localStorage.getItem("token");
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
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
    }
  },
  mounted() {
    this.fetchActivities();
    this.fetchProgressions();
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');


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
  background-color: #B0A2BA;
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
  background-color: #D4C4E0;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

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
</style>
