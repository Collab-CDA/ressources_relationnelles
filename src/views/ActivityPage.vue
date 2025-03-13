<template>
  <div>
    <h1>Démarrer une activité</h1>
    <ul>
      <li v-for="activity in activities" :key="activity.id_ressource_">
        {{ activity.titre }}
        <div v-if="activity.id_ressource_ === currentActivityId">
          <span>{{ elapsedTime }}s</span>
          <button @click="stopActivity">Stop</button>
        </div>
        <button v-else @click="startActivity(activity.id_ressource_)">Démarrer</button>
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
      elapsedTime: 0,
      timer: null
    };
  },
  methods: {
    async fetchActivities() {
      try {
        const response = await axios.get('http://localhost:3000/api/resources?type=1', this.getAuthHeaders());
        this.activities = response.data;
      } catch (error) {
        console.warn("Erreur lors de la récupération des activités :", error.response ? error.response.data : error.message);
      }
    },
    async startActivity(resourceId) {
      try {
        await axios.post('http://localhost:3000/api/progression', {
          id_ressource_: resourceId,
          statut: 'en cours',
          pourcentage_completion: 0
        }, this.getAuthHeaders());

        this.currentActivityId = resourceId;
        this.elapsedTime = 0;
        this.timer = setInterval(() => {
          this.elapsedTime++;
        }, 1000);
      } catch (error) {
        console.warn("Erreur lors du démarrage de l'activité :", error.response ? error.response.data : error.message);
      }
    },
    async stopActivity() {
      clearInterval(this.timer);
      try {
        await axios.put(`http://localhost:3000/api/progression/${this.currentActivityId}`, {
          pourcentage_completion: this.elapsedTime
        }, this.getAuthHeaders());

        alert("Activité arrêtée avec succès !");
        this.currentActivityId = null;
      } catch (error) {
        console.warn("Erreur lors de l'arrêt de l'activité :", error.response ? error.response.data : error.message);
      }
    },
    getAuthHeaders() {
      const token = localStorage.getItem("token");
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  },
  mounted() {
    this.fetchActivities();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  color: #0258BD;
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

