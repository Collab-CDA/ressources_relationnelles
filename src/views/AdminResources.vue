<template>
  <div>
    <h1>Gestion des ressources</h1>

    <div class="main-container">
      <div class="resource-list">
        <h3>Titre des ressources</h3>
        <ul>
          <li v-for="resource in resources" :key="resource.id_ressource_">
            <div class="resource-item">
              <p>{{ resource.titre }}</p>
              <div class="button-group">
                <button
                  :class="{'available': resource.statut_ === 'disponible', 'suspended': resource.statut_ === 'suspendue'}"
                  @click="toggleStatus(resource)"
                >
                  {{ resource.statut_ }}
                </button>
                <button @click="editResource(resource.id_ressource_)">Modifier</button>
                <button @click="deleteResource(resource.id_ressource_)" class="delete">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
        <p v-if="resources.length === 0">Aucune ressource trouvée</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminResources',
  data() {
    return {
      resources: [],
    };
  },
  created() {
    this.fetchResources();
  },
  methods: {
    async fetchResources() {
      try {
        const response = await axios.get('http://localhost:3000/api/resources');
        this.resources = response.data;
      } catch (error) {
        console.warn('Erreur lors de la récupération des ressources :', error.response ? error.response.data : error.message);
      }
    },

    async toggleStatus(resource) {
      const newStatus = resource.statut_ === 'disponible' ? 'suspendue' : 'disponible';
      try {
        // Mettre à jour l'URL pour correspondre à la route définie
        await axios.put(`http://localhost:3000/api/resources/update/${resource.id_ressource_}`, { statut_: newStatus });
        resource.statut_ = newStatus;
      } catch (error) {
        console.warn('Erreur lors de la mise à jour du statut :', error.response ? error.response.data : error.message);
      }
    },

    editResource(id) {
      this.$router.push({ name: 'editResource', params: { id } });
    },

    async deleteResource(id) {
  const confirmation = confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?');
  if (confirmation) {
    try {
      const token = localStorage.getItem('token'); // Assurez-vous que c'est bien la clé utilisée pour stocker le token
      await axios.delete(`http://localhost:3000/api/resources/delete/${id}`, {
        headers: { Authorization: token }
      });
      this.fetchResources();
    } catch (error) {
      console.warn('Erreur lors de la suppression de la ressource :', error.response ? error.response.data : error.message);
    }
  }
},
  }
};
</script>


<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #FFFFFF;
  color: #000000;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  color: #0258BD;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.main-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
}

.resource-list {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.resource-list ul {
  list-style-type: none;
  padding: 0;
}

.resource-list ul li {
  margin-bottom: 1rem;
}

.resource-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 15px;
  background-color: #B0A2BA;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

button i {
  font-size: 18px;
}

button:hover {
  background-color: #D4C4E0;
}

button.delete {
  background-color: #D0021B;
  color: white;
  width: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

button.delete:hover {
  background-color: #d76c61;
}

button.available {
  background-color: #28a745;
  color: white;
}

button.suspended {
  background-color: #dc3545;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  h1 {
    font-size: 28px;
  }

  .main-container {
    margin: 1rem;
  }

  button {
    width: 100%;
    padding: 12px 0;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  h1 {
    font-size: 30px;
  }

  .main-container {
    margin: 2rem auto;
  }
}

@media (min-width: 1024px) {
  h1 {
    font-size: 32px;
  }

  .main-container {
    max-width: 1200px;
  }
}
</style>
