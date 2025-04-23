<template>
  <div>
    <h1>Mes Ressources ajoutées</h1>
      <div class="resource-list">
        <ul>
          <li v-for="resource in resources" :key="resource.id_ressource_" class="resource-item">
            <p>{{ resource.titre }}</p>
            <button class="edit-button" @click="openEditModal(resource)">Modifier</button>
          </li>
        </ul>
        <p v-if="resources.length === 0">Aucune ressource trouvée.</p>
      </div>

      <!-- Modale d'édition de ressource -->
      <div v-if="showEditModal" class="modal">
        <div class="modal-content">
          <span class="close-button" @click="closeEditModal">&times;</span>
          <h4>Modifier la ressource</h4>
          <form @submit.prevent="submitEditResource">
            <div class="form-group">
              <label for="edit_titre">Titre :</label>
              <input type="text" id="edit_titre" v-model="editResource.titre" required />
            </div>
            <div class="form-group">
              <label for="edit_contenu">Contenu :</label>
              <textarea id="edit_contenu" v-model="editResource.contenu" required></textarea>
            </div>
            <div class="form-group">
              <label for="edit_typeResource">Type de ressource :</label>
              <select v-model="editResource.id_typeRessource" id="edit_typeResource" required>
                <option value="" disabled>Sélectionnez un type</option>
                <option v-for="type in typesResource" :key="type.id_typesRessource" :value="type.id_typesRessource">
                  {{ type.libelle_typesRessource }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit_typeRelation">Type de relation :</label>
              <select v-model="editResource.type_relation" id="edit_typeRelation" required>
                <option value="" disabled>Sélectionnez un type</option>
                <option v-for="type in typesRelation" :key="type.id_relation" :value="type.id_relation">
                  {{ type.libelle_relation }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit_categoryResource">Catégorie de ressource :</label>
              <select v-model="editResource.id_categorie" id="edit_categoryResource" required>
                <option value="" disabled>Sélectionnez une catégorie</option>
                <option v-for="category in categoriesResource" :key="category.id_categorie" :value="category.id_categorie">
                  {{ category.libelle_categorie }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="edit_lien_video">Lien :</label>
              <input type="url" id="edit_lien_video" v-model="editResource.lien_video" />
            </div>
            <div class="file-upload-container">
              <label for="edit_file" class="file-upload-label">Modifier l'image</label>
              <input type="file" id="edit_file" @change="handleEditFileUpload" accept=".jpeg, .jpg, .png" class="file-upload-input" />
            </div>
            <div class="button-container">
              <button type="submit" class="btn">Enregistrer les modifications</button>
            </div>
          </form>
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
      showEditModal: false,
      editResource: {
        id_ressource_: null,
        titre: "",
        contenu: "",
        id_typeRessource: "",
        type_relation: "",
        id_categorie: "",
        lien_video: "",
        nom_image: "",
        selectedFile: null,
      },
      typesRelation: [],
      categoriesResource: [],
      typesResource: [],
    };
  },
  methods: {
    async fetchUserResources() {
      try {
        const userId = this.getUserIdFromToken();
        if (!userId) {
          console.warn("ID utilisateur non trouvé dans le token.");
          return;
        }
        const response = await axios.get(
          `http://10.176.131.156:3000/api/resources/user/${userId}`,
          this.getAuthHeaders()
        );
        this.resources = response.data;
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération des ressources de l'utilisateur :",
          error.response ? error.response.data : error.message
        );
      }
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
    openEditModal(resource) {
      this.editResource = { ...resource, selectedFile: null };
      this.showEditModal = true;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.resetEditResource();
    },
    resetEditResource() {
      this.editResource = {
        id_ressource_: null,
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
    handleEditFileUpload(event) {
      const file = event.target.files[0];
      this.editResource.selectedFile = file;
      this.editResource.nom_image = file ? file.name : this.editResource.nom_image;
    },
    async submitEditResource() {
      if (!this.editResource.id_ressource_) return;
      try {
        const formData = new FormData();
        formData.append("titre", this.editResource.titre);
        formData.append("contenu", this.editResource.contenu);
        formData.append("id_typeRessource", this.editResource.id_typeRessource);
        formData.append("type_relation", this.editResource.type_relation);
        formData.append("id_categorie", this.editResource.id_categorie);
        formData.append("lien_video", this.editResource.lien_video);
        formData.append("nom_image", this.editResource.nom_image);
        if (this.editResource.selectedFile) {
          formData.append("files", this.editResource.selectedFile);
        }
        const headers = this.getAuthHeaders();
        headers.headers["Content-Type"] = "multipart/form-data";
        await axios.put(`http://10.176.131.156:3000/api/resources/update/${this.editResource.id_ressource_}`, formData, headers);
        alert("Ressource modifiée avec succès !");
        this.closeEditModal();
        this.fetchUserResources();
      } catch (error) {
        console.error("Erreur lors de la modification de la ressource :", error.response ? error.response.data : error.message);
      }
    },
  },
  mounted() {
    this.fetchUserResources();
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
  margin-top: 3rem;
  margin-bottom: 1rem;
}

.resource-list {
  background-color: #f0f0f0;
  color: black;
  padding: 20px;
  border-radius: 5px;
  width: 30rem;
  margin: 0 auto;
}

.resource-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.resource-item p {
  margin: 0;
  flex-grow: 1;
}

.edit-button {
  background-color: #b0a2ba;
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #d4c4e0;
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
  background-color: #b0a2ba;
  border: none;
  border-radius: 5px;
  padding: 2px 0;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
  color: white;
  width: 62%;
  margin: 0 auto;
}

.button-container:hover {
  background-color: #d4c4e0;
  color: black;
}

@media (max-width: 768px) {
  .resource-list {
    width: 90%;
    padding: 15px;
    margin-bottom: 2rem;
  }

  .resource-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .resource-item p {
    margin-bottom: 10px;
  }

  .edit-button {
    width: 100%;
    text-align: center;
  }

  .modal-content {
    padding: 1.5rem;
    width: 80%;
    height: 90%; 
    overflow-y: auto;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    font-size: 14px;
  }

  .file-upload-label {
    font-size: 14px;
    padding: 8px 15px;
  }

  .button-container {
    width: 100%;
    padding: 8px;
    font-size: 14px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .resource-list {
    width: 70%;
    padding: 18px;
  }

  .resource-item {
    flex-direction: row;
    align-items: center;
  }

  .resource-item p {
    margin-bottom: 0;
  }

  .edit-button {
    width: auto;
    text-align: center;
  }

  .modal-content {
    padding: 2rem;
    width: 80%;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    font-size: 16px;
  }

  .file-upload-label {
    font-size: 16px;
    padding: 10px 20px;
  }

  .button-container {
    width: 62%;
    padding: 10px;
    font-size: 16px;
  }
}
</style>

