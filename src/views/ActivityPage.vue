<template>
  <div>
    <h1>Démarrer une activité</h1>
    <ul>
      <li v-for="activity in activities" :key="activity.id_ressource_">
        {{ activity.titre }}
        <button @click="startActivity(activity.id_ressource_)">Démarrer</button>
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
      activities: []
    };
  },
  methods: {
    async fetchActivities() {
      try {
        // Assurez-vous que votre backend filtre les ressources par type
        const response = await axios.get('http://localhost:3000/api/resources?type=1', this.getAuthHeaders());
        this.activities = response.data;
      } catch (error) {
        console.warn("Erreur lors de la récupération des activités :", error.response ? error.response.data : error.message);
      }
    },
    async startActivity(resourceId) {
      try {
        await axios.post('http://localhost:3000/api/progress', {
          id_ressource_: resourceId,
          statut: 'en cours',
          pourcentage_completion: 0
        }, this.getAuthHeaders());
        alert("Activité démarrée avec succès !");
      } catch (error) {
        console.warn("Erreur lors du démarrage de l'activité :", error.response ? error.response.data : error.message);
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
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
