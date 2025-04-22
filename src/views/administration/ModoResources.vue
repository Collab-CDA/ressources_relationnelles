<template>
    <div>
      <h1 class="title-container">
        Gestion des ressources
      </h1>
  
      <div class="filter-bar">
        <label for="typeRelation">Type de relation :</label>
        <select v-model="selectedTypeRelation" id="typeRelation">
          <option value="">Tous</option>
          <option v-for="type in typesRelation" :key="type.id_relation" :value="type.id_relation">
            {{ type.libelle_relation }}
          </option>
        </select>
  
        <label for="categoryResource">Catégorie :</label>
        <select v-model="selectedCategoryResource" id="categoryResource">
          <option value="">Toutes</option>
          <option v-for="category in categoriesResource" :key="category.id_categorie" :value="category.id_categorie">
            {{ category.libelle_categorie }}
          </option>
        </select>
  
        <label for="typeResource">Type de ressource :</label>
        <select v-model="selectedTypeResource" id="typeResource">
          <option value="">Tous</option>
          <option v-for="type in typesResource" :key="type.id_typesRessource" :value="type.id_typesRessource">
            {{ type.libelle_typesRessource }}
          </option>
        </select>
      </div>
  
     
  
      <!-- Liste des ressources -->
      <div class="main-container">
        <div class="resource-list">
          <h3>Titre des ressources</h3>
          <ul>
            <li v-for="resource in filteredResources" :key="resource.id_ressource_">
              <div class="resource-item">
                <p>{{ resource.titre }}</p>
                <div class="button-group">
                  <button
                    :class="{
                      available: resource.statut_ === 'disponible',
                      suspended: resource.statut_ === 'suspendue',
                    }"
                    @click="toggleStatus(resource)"
                  >
                    {{ resource.statut_ }}
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
  import axios from "axios";
  export default {
    name: "ModoResources",
    data() {
      return {
        selectedTypeRelation: "",
        selectedCategoryResource: "",
        selectedTypeResource: "",
        resources: [],
        categoriesResource: [],
        typesRelation: [],
        typesResource: [],
      };
    },
    created() {
      this.fetchResources();
    },
    computed: {
      filteredResources() {
        return this.resources.filter((resource) => {
          const typeRelationMatch = this.selectedTypeRelation
            ? resource.type_relation === parseInt(this.selectedTypeRelation)
            : true;
          const categoryResourceMatch = this.selectedCategoryResource
            ? resource.id_categorie === parseInt(this.selectedCategoryResource)
            : true;
          const typeResourceMatch = this.selectedTypeResource
            ? resource.id_typeRessource === parseInt(this.selectedTypeResource)
            : true;
          return typeRelationMatch && categoryResourceMatch && typeResourceMatch;
        });
      },
    },
    methods: {
      resetResource() {
        this.resource = {
          titre: "",
          contenu: "",
          id_typeRessource: "",
          type_relation: "",
          id_categorie: "",
          lien_video: "",
          nom_image: "",
          selectedFile: null,
        };
      },
      async fetchTypesResource() {
        try {
          const response = await axios.get("http://10.176.131.156:3000/api/types_ressource", this.getAuthHeaders());
          this.typesResource = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des types de ressource :", error.response?.data || error.message);
        }
      },
      async fetchTypesRelation() {
        try {
          const response = await axios.get("http://10.176.131.156:3000/api/relations", this.getAuthHeaders());
          this.typesRelation = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des types de relation :", error.response?.data || error.message);
        }
      },
      async fetchCategoriesResource() {
        try {
          const response = await axios.get("http://10.176.131.156:3000/api/categories", this.getAuthHeaders());
          this.categoriesResource = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des catégories de ressources :", error.response?.data || error.message);
        }
      },
      async fetchResources() {
        try {
          const response = await axios.get("http://10.176.131.156:3000/api/resources");
          this.resources = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des ressources :", error.response?.data || error.message);
        }
      },
      async toggleStatus(resource) {
        const newStatus = resource.statut_ === "disponible" ? "suspendue" : "disponible";
        try {
          await axios.put(
            `http://10.176.131.156:3000/api/resources/status/${resource.id_ressource_}`,
            { statut_: newStatus },
            this.getAuthHeaders()
          );
          resource.statut_ = newStatus;
        } catch (error) {
          console.error("Erreur lors de la mise à jour du statut :", error.response?.data || error.message);
        }
      },
      decodeToken(token) {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          return JSON.parse(window.atob(base64));
        } catch (e) {
          return null;
        }
      },
      getAuthHeaders() {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token non trouvé.");
          return {};
        }
        return {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
      },
      getUserIdFromToken() {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = this.decodeToken(token);
          return decodedToken ? decodedToken.id : null;
        }
        return null;
      },
    },
    mounted() {
      this.fetchTypesResource();
      this.fetchTypesRelation();
      this.fetchCategoriesResource();
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
  
  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .filter-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .filter-bar label {
    margin-right: 10px;
  }
  
  .filter-bar select {
    margin-right: 20px;
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
    background-color: #b0a2ba;
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
    background-color: #d4c4e0;
  }
  
  button.delete {
    background-color: #d0021b;
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
    background-color: #7ED321;
    color: white;
  }
  
  button.suspended {
    background-color: #D0021B;
    color: white;
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #dad8d8;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    border-radius: 5px;
    width: 100%;
    max-width: 500px;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-group textarea {
    resize: vertical;
    height: 100px;
  }
  
  .file-upload-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .file-upload-label {
    background-color: #b0a2ba;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    color: white;
    text-align: center;
  }
  
  .file-upload-label:hover {
    background-color: #d4c4e0;
    color: black;
  }
  
  .file-upload-input {
    display: none;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
/* Responsive écrans mobiles */
@media screen and (max-width: 768px) {
  h1 {
    font-size: 24px;
    text-align: center;
    margin: 1.5rem 0;
  }

  .title-container {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-bar {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    width: 100%;
  }

  .filter-bar label,
  .filter-bar select {
    margin-bottom: 10px;
    width: 100%;
  }

  .main-container {
    padding: 0 1rem;
  }

  .resource-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .button-group {
    width: 100%;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
  }

  button {
    font-size: 14px;
    padding: 8px 10px;
  }

  .resource-list ul li {
    margin-bottom: 1rem;
  }

  .button-container {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .modal-content {
    padding: 1rem;
  }

  .form-group input {
    font-size: 14px;
    padding: 6px;
  }

  .btn {
    font-size: 16px;
    width: 100%;
    padding: 10px;
  }
}


/* Responsive tablettes */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  h1 {
    font-size: 28px;
  }

  .filter-bar {
    display: flex;
    flex-wrap: wrap; 
    align-items: center;
    margin-bottom: 1.5rem;
    gap: 10px; 
  }

  .filter-bar label,
  .filter-bar select {
    margin-right: 10px;
    width: calc(33% - 10px);
  }

  .main-container {
    padding: 0 2rem;
  }

  .resource-item {
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  .button-group {
    gap: 15px;
  }

  button {
    font-size: 15px;
    padding: 10px 12px;
  }

  .button-container {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
}

  </style>
  