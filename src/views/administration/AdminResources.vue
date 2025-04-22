<template>
  <div>
    <h1 class="title-container">
      Gestion des ressources
      <button class="add-resource-button" @click="openModal">Ajouter une ressource</button>
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

    <!-- Modale d'ajout de ressource -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <h4>Ajouter une ressource</h4>
        <form @submit.prevent="submitResource">
          <div class="form-group">
            <label for="titre">Titre :</label>
            <input type="text" id="titre" v-model="resource.titre" required />
          </div>
          <div class="form-group">
            <label for="contenu">Contenu :</label>
            <textarea id="contenu" v-model="resource.contenu" required></textarea>
          </div>
          <div class="form-group">
            <label for="typeResource">Type de ressource :</label>
            <select v-model="resource.id_typeRessource" id="typeResource" required>
              <option value="" disabled>Sélectionnez un type</option>
              <option v-for="type in typesResource" :key="type.id_typesRessource" :value="type.id_typesRessource">
                {{ type.libelle_typesRessource }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="typeRelation">Type de relation :</label>
            <select v-model="resource.type_relation" id="typeRelation" required>
              <option value="" disabled>Sélectionnez un type</option>
              <option v-for="type in typesRelation" :key="type.id_relation" :value="type.id_relation">
                {{ type.libelle_relation }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="categoryResource">Catégorie de ressource :</label>
            <select v-model="resource.id_categorie" id="categoryResource" required>
              <option value="" disabled>Sélectionnez une catégorie</option>
              <option v-for="category in categoriesResource" :key="category.id_categorie" :value="category.id_categorie">
                {{ category.libelle_categorie }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="lien_video">Lien :</label>
            <input type="url" id="lien_video" v-model="resource.lien_video" />
          </div>
          <div class="file-upload-container">
            <label for="file" class="file-upload-label">Ajouter une image</label>
            <input type="file" id="file" @change="handleFileUpload" accept=".jpeg, .jpg, .png" class="file-upload-input" />
          </div>
          <div class="button-container">
            <button type="submit" class="btn">Ajouter</button>
          </div>
        </form>
      </div>
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

    <!-- Liste des ressources -->
    <div class="main-container">
      <div class="resource-list">
        <h3>Titre des ressources</h3>
        <ul>
          <li v-for="resource in filteredResources" :key="resource.id_ressource_">
            <div class="resource-item">
              <p>{{ resource.titre }}</p>
              <div class="button-group">
                <!-- Bouton d'affichage du statut avec mise en forme -->
                <button
                  :class="{
                    available: resource.statut_ === 'disponible',
                    suspended: resource.statut_ === 'suspendue'
                  }"
                  @click="toggleStatus(resource)"
                >
                  {{ formatStatus(resource.statut_) }}
                </button>
                <!-- Bouton permettant de basculer entre "en_attente" et "disponible" -->
                <button 
                  v-if="resource.statut_ === 'en_attente' || resource.statut_ === 'disponible'"
                  class="toggle-publication-button"
                  @click="togglePublicationStatus(resource)"
                >
                  {{ resource.statut_ === 'en_attente' ? 'Mettre disponible' : 'Mettre en attente' }}
                </button>
                <button @click="openEditModal(resource)">Modifier</button>
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
import axios from "axios";

export default {
  name: "AdminResources",
  data() {
    return {
      selectedTypeRelation: "",
      selectedCategoryResource: "",
      selectedTypeResource: "",
      resources: [],
      showModal: false,
      showEditModal: false,
      // Formulaire d'ajout – le statut par défaut est "en_attente"
      resource: {
        titre: "",
        contenu: "",
        id_typeRessource: "",
        type_relation: "",
        id_categorie: "",
        lien_video: "",
        nom_image: "",
        selectedFile: null,
        statut_: "en_attente",
      },
      // Formulaire d'édition
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
      categoriesResource: [],
      typesRelation: [],
      typesResource: [],
    };
  },
  created() {
    this.fetchResources();
  },
  mounted() {
    this.fetchTypesResource();
    this.fetchTypesRelation();
    this.fetchCategoriesResource();
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
    // Formate le statut pour afficher des espaces à la place des underscores
    formatStatus(status) {
      return status.replace(/_/g, " ");
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetResource();
    },
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
        statut_: "en_attente",
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
    async fetchTypesResource() {
      try {
        const response = await axios.get("http://192.168.243.106:3000/api/types_ressource", this.getAuthHeaders());
        this.typesResource = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des types de ressource :", error.response?.data || error.message);
      }
    },
    async fetchTypesRelation() {
      try {
        const response = await axios.get("http://192.168.243.106:3000/api/relations", this.getAuthHeaders());
        this.typesRelation = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des types de relation :", error.response?.data || error.message);
      }
    },
    async fetchCategoriesResource() {
      try {
        const response = await axios.get("http://192.168.243.106:3000/api/categories", this.getAuthHeaders());
        this.categoriesResource = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories de ressources :", error.response?.data || error.message);
      }
    },
    async fetchResources() {
      try {
        const response = await axios.get("http://192.168.243.106:3000/api/resources");
        this.resources = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des ressources :", error.response?.data || error.message);
      }
    },
    async toggleStatus(resource) {
      const newStatus = resource.statut_ === "disponible" ? "suspendue" : "disponible";
      try {
        await axios.put(
          `http://192.168.243.106:3000/api/resources/status/${resource.id_ressource_}`,
          { statut_: newStatus },
          this.getAuthHeaders()
        );
        resource.statut_ = newStatus;
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut :", error.response?.data || error.message);
      }
    },
    // Bascule le statut entre "en_attente" et "disponible"
    async togglePublicationStatus(resource) {
      const newStatus = resource.statut_ === "en_attente" ? "disponible" : "en_attente";
      try {
        await axios.put(
          `http://192.168.243.106:3000/api/resources/status/${resource.id_ressource_}`,
          { statut_: newStatus },
          this.getAuthHeaders()
        );
        resource.statut_ = newStatus;
      } catch (error) {
        console.error("Erreur lors du changement du statut de publication :", error.response?.data || error.message);
      }
    },
    async deleteResource(id) {
      const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette ressource ?");
      if (confirmation) {
        try {
          await axios.delete(`http://192.168.243.106:3000/api/resources/delete/${id}`, this.getAuthHeaders());
          this.fetchResources();
        } catch (error) {
          console.error("Erreur lors de la suppression de la ressource :", error.response?.data || error.message);
        }
      }
    },
    // Gestion des fichiers pour l'ajout
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.resource.selectedFile = file;
      this.resource.nom_image = file ? file.name : "";
    },
    // Gestion des fichiers pour l'édition
    handleEditFileUpload(event) {
      const file = event.target.files[0];
      this.editResource.selectedFile = file;
      this.editResource.nom_image = file ? file.name : this.editResource.nom_image;
    },
    // Extraction et construction des headers d'authentification
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
    async submitResource() {
      const userId = this.getUserIdFromToken();
      if (!userId) {
        alert("Utilisateur non authentifié.");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("titre", this.resource.titre);
        formData.append("contenu", this.resource.contenu);
        formData.append("id_typeRessource", this.resource.id_typeRessource);
        formData.append("type_relation", this.resource.type_relation);
        formData.append("id_categorie", this.resource.id_categorie);
        formData.append("lien_video", this.resource.lien_video);
        formData.append("nom_image", this.resource.nom_image);
        formData.append("confidentialite", "Publique");
        formData.append("id_utilisateur", userId);
        // Le statut est transmis lors de la création (ici "en_attente" par défaut)
        formData.append("statut_", this.resource.statut_);
        if (this.resource.selectedFile) {
          formData.append("files", this.resource.selectedFile);
        }
        const headers = this.getAuthHeaders();
        headers.headers["Content-Type"] = "multipart/form-data";
        const response = await axios.post("http://192.168.243.106:3000/api/resources/create", formData, headers);
        alert("Ressource ajoutée avec succès !");
        this.closeModal();
        this.fetchResources();
      } catch (error) {
        console.error("Erreur lors de l'ajout de la ressource :", error.response ? error.response.data : error.message);
      }
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
        await axios.put(`http://192.168.243.106:3000/api/resources/update/${this.editResource.id_ressource_}`, formData, headers);
        alert("Ressource modifiée avec succès !");
        this.closeEditModal();
        this.fetchResources();
      } catch (error) {
        console.error("Erreur lors de la modification de la ressource :", error.response ? error.response.data : error.message);
      }
    },
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

.add-resource-button {
  margin-left: 2rem;
  font-size: 1.2rem;
  background-color: #b0a2ba;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-resource-button:hover {
  background-color: #d4c4e0;
  color: black;
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

.toggle-publication-button {
  background-color: #0055aa;
}

.toggle-publication-button:hover {
  background-color: #3377cc;
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
  body {
    font-size: 14px;
  }

  h1 {
    font-size: 24px;
    text-align: center;
    flex-direction: column;
    gap: 1rem;
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
  }

  .title-container {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 0 1rem;
  }

  .add-resource-button {
    font-size: 16px;
    margin: 0 auto;
    width: 90%;
    padding: 10px;
  }

  .filter-bar {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 1rem;
  }

  .filter-bar label,
  .filter-bar select {
    width: 100%;
    margin-bottom: 10px;
  }

  .modal-content {
    width: 95%;
    padding: 1rem;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    font-size: 14px;
  }

  .file-upload-container {
    padding: 0.5rem 0;
  }

  .button-container {
    text-align: center;
  }

  .btn {
    font-size: 16px;
    width: 100%;
  }

  .main-container {
    padding: 0 1rem;
  }

  .resource-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .button-group {
    flex-wrap: wrap;
    width: 100%;
    gap: 0.5rem;
  }
}

/* Responsive tablettes */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  body {
    font-size: 15px;
  }

  h1 {
    font-size: 28px;
  }

  h4 {
    font-size: 20px;
    font-weight: bold;
  }

  .title-container {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .add-resource-button {
    font-size: 18px;
    padding: 10px 20px;
    margin: 0 auto;
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
    padding: 0 2rem;
  }

  .filter-bar label,
  .filter-bar select {
    width: 100%;
    margin-bottom: 15px;
  }

  .modal-content {
    width: 80%;
    padding: 2rem;
  }

  .form-group input,
  .form-group textarea,
  .form-group select {
    font-size: 16px;
    width: 100%;
  }

  .btn {
    font-size: 18px;
    width: 100%;
  }

  .main-container {
    padding: 0 2rem;
  }
}
</style>
