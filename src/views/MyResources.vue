<template>
    <div>
      <h1>Mes Ressources</h1>
      
      <div class="main-container">
        <div class="resource-list">
          <h2>Liste de mes ressources</h2>
          <ul>
            <li v-for="resource in resources" :key="resource.id" @click="selectResource(resource)">
              <a href="#" @click.prevent>{{ resource.title }}</a>
            </li>
          </ul>
          <p v-if="resources.length === 0">Aucune ressource trouvée</p>
        </div>
  
        <div class="content-container">
          <div v-if="selectedResource">
            <h2>{{ selectedResource.title }}</h2>
            <p>{{ selectedResource.description }}</p>
          </div>
          <div v-else>
            <p>Sélectionnez une ressource pour afficher les détails</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "MyResources",
    data() {
      return {
        resources: [],
        selectedResource: null,
      };
    },
    methods: {
      async fetchResources() {
        try {
            const response = await axios.get("http://localhost:3000/api/resources/my-resources", this.getAuthHeaders());
            this.resources = response.data;
        } catch (error) {
          console.warn("Erreur lors de la récupération des ressources :", error);
        }
      },
      selectResource(resource) {
        this.selectedResource = resource;
      },
      getAuthHeaders() {
        const token = localStorage.getItem("token");
        return { headers: { Authorization: `Bearer ${token}` } };
      },
    },
    mounted() {
      this.fetchResources();
    },
  };
  </script>
  
  <style scoped>
  .resource-list {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 5px;
    width: 100%;
  }
  .content-container {
    background-color: #dad8d8;
    padding: 1rem;
    border-radius: 5px;
    margin-top: 2rem;
    flex-grow: 1;
  }
  </style>
