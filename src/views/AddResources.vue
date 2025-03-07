<template>
  <div class="add-resources-page">
    <div class="card">
      <h1>Ajouter une ressource</h1>
      <form @submit.prevent="submitResource">
        <!-- Titre -->
        <div class="form-group">
          <label for="titre">Titre :</label>
          <input type="text" id="titre" v-model="resource.titre" required />
        </div>
        <!-- Contenu -->
        <div class="form-group">
          <label for="contenu">Contenu :</label>
          <textarea id="contenu" v-model="resource.contenu" required></textarea>
        </div>
        <!-- Type de ressource -->
        <div class="form-group">
          <label for="typeResource">Type de ressource :</label>
          <select
            v-model="resource.id_typeRessource"
            id="typeResource"
            required
          >
            <option value="" disabled>Sélectionnez un type</option>
            <option
              v-for="type in typesResource"
              :key="type.id_typesRessource"
              :value="type.id_typesRessource"
            >
              {{ type.libelle_typesRessource }}
            </option>
          </select>
        </div>
        <!-- Type de relation -->
        <div class="form-group">
          <label for="typeRelation">Type de relation :</label>
          <select v-model="resource.type_relation" id="typeRelation" required>
            <option value="" disabled>Sélectionnez un type</option>
            <option
              v-for="type in typesRelation"
              :key="type.id_relation"
              :value="type.id_relation"
            >
              {{ type.libelle_relation }}
            </option>
          </select>
        </div>
        <!-- Catégorie de ressource -->
        <div class="form-group">
          <label for="categoryResource">Catégorie de ressource :</label>
          <select
            v-model="resource.id_categorie"
            id="categoryResource"
            required
          >
            <option value="" disabled>Sélectionnez une catégorie</option>
            <option
              v-for="category in categoriesResource"
              :key="category.id_categorie"
              :value="category.id_categorie"
            >
              {{ category.libelle_categorie }}
            </option>
          </select>
        </div>
        <!-- Lien vidéo -->
        <div class="form-group">
          <label for="lien_video">Lien :</label>
          <input type="url" id="lien_video" v-model="resource.lien_video" />
        </div>

        <!-- Fichier -->
        <div class="file-upload-container">
          <label for="file" class="file-upload-label">
            Ajouter un fichier (PDF ou Image)
          </label>
          <input
            type="file"
            id="file"
            @change="handleFileUpload"
            accept=".pdf, .jpeg, .jpg, .png"
            class="file-upload-input"
          />
        </div>
        <div class="button-container">
          <button type="submit" class="btn">Ajouter la ressource</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddResources",
  data() {
    return {
      resource: {
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
  methods: {
    async fetchTypesResource() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/types_ressource",
          this.getAuthHeaders()
        );
        this.typesResource = response.data;
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération des types de ressource :",
          error.response ? error.response.data : error.message
        );
      }
    },
    async fetchTypesRelation() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/relations",
          this.getAuthHeaders()
        );
        this.typesRelation = response.data;
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération des types de relation :",
          error.response ? error.response.data : error.message
        );
      }
    },
    async fetchCategoriesResource() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories",
          this.getAuthHeaders()
        );
        this.categoriesResource = response.data;
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération des catégories de ressources :",
          error.response ? error.response.data : error.message
        );
      }
    },
    handleFileUpload(event) {
      this.resource.selectedFile = event.target.files[0];
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
      console.log("Token envoyé :", token);
      if (!token) {
        console.error("Token non trouvé.");
        return {};
      }
      return {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
      try {
        const formData = new FormData();
        formData.append("titre", this.resource.titre);
        formData.append("contenu", this.resource.contenu);
        formData.append("id_typeRessource", this.resource.id_typeRessource);
        formData.append("type_relation", this.resource.type_relation);
        formData.append("id_categorie", this.resource.id_categorie);
        formData.append("lien_video", this.resource.lien_video || null);
        formData.append("nom_image", this.resource.nom_image);
        formData.append("confidentialite", "Publique"); // Ajout du champ manquant

        if (this.resource.selectedFile) {
          formData.append("file", this.resource.selectedFile);
        }

        console.log(
          "Données envoyées :",
          Object.fromEntries(formData.entries())
        );

        const headers = this.getAuthHeaders();
        headers.headers["Content-Type"] = "multipart/form-data";

        const response = await axios.post(
          "http://localhost:3000/api/resources/create",
          formData,
          headers
        );
        console.log("Ressource ajoutée avec succès :", response.data);
        alert("Ressource ajoutée avec succès !");
      } catch (error) {
        console.error(
          "Erreur lors de l'ajout de la ressource :",
          error.response ? error.response.data : error.message
        );
      }
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
.add-resources-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.card {
  background-color: #dad8d8;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 30rem;
  text-align: left;
}

.card h1 {
  margin-bottom: 20px;
  font-size: 24px;
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

.btn {
  background-color: #b0a2ba;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #d4c4e0;
}
</style>
