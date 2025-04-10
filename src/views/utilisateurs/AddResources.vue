<template>
  <div class="add-resources-page">
    <div v-if="draftExists" class="draft-container">
      <button type="button" class="btn load-draft" @click="loadDraft">
        Reprendre la ressource mise de côté
      </button>
    </div>

    <div class="card">
      <h1>Ajouter une ressource</h1>
      <form @submit.prevent="submitResource('Publique')">
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
            <option
              v-for="type in typesResource"
              :key="type.id_typesRessource"
              :value="type.id_typesRessource"
            >
              {{ type.libelle_typesRessource }}
            </option>
          </select>
        </div>
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
        <div class="form-group">
          <label for="categoryResource">Catégorie de ressource :</label>
          <select v-model="resource.id_categorie" id="categoryResource" required>
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
        <div class="form-group">
          <label for="lien_video">Lien :</label>
          <input type="url" id="lien_video" v-model="resource.lien_video" />
        </div>
        <div class="file-upload-container">
          <label for="file" class="file-upload-label">Ajouter une image</label>
          <input
            type="file"
            id="file"
            @change="handleFileUpload"
            accept=".jpeg, .jpg, .png"
            class="file-upload-input"
          />
        </div>
        <div class="button-container">
          <button type="submit" class="btn">Ajouter la ressource</button>
          <button type="button" class="btn" @click="submitResource('Privée')">
            Mettre de côté
          </button>
          <button type="button" class="btn cancel" @click="resetForm">
            Annuler
          </button>
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
        id_utilisateur: "",
        type_relation: "",
        id_categorie: "",
        lien_video: "",
        nom_image: "",
        selectedFile: null,
      },
      categoriesResource: [],
      typesRelation: [],
      typesResource: [],
      draftExists: false,
    };
  },
  methods: {
    decodeToken(token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        return JSON.parse(window.atob(base64));
      } catch (e) {
        return null;
      }
    },
    getUserIdFromToken() {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = this.decodeToken(token);
        return decodedToken ? decodedToken.id : null;
      }
      return null;
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
          "Content-Type": "multipart/form-data",
        },
      };
    },
    async submitResource(confidentialite) {
      if (confidentialite === "Privée") {
        try {
          localStorage.setItem("draftResource", JSON.stringify(this.resource));
          this.draftExists = true;
          alert("Ressource mise de côté.");
          this.resetForm();
        } catch (error) {
          console.error("Erreur lors de la sauvegarde du brouillon :", error);
        }
        return;
      }
      try {
        const formData = new FormData();
        formData.append("titre", this.resource.titre);
        formData.append("contenu", this.resource.contenu);
        formData.append("id_typeRessource", this.resource.id_typeRessource);
        formData.append("type_relation", this.resource.type_relation);
        formData.append("id_categorie", this.resource.id_categorie);
        formData.append("lien_video", this.resource.lien_video || null);
        formData.append("nom_image", this.resource.nom_image);
        formData.append("confidentialite", confidentialite);

        const idUtilisateur = this.getUserIdFromToken();
        formData.append("id_utilisateur", idUtilisateur);

        if (this.resource.selectedFile) {
          formData.append("files", this.resource.selectedFile);
        }

        const headers = this.getAuthHeaders();
        headers.headers["Content-Type"] = "multipart/form-data";

        await axios.post(
          "http://localhost:3000/api/resources/create",
          formData,
          headers
        );

        alert("Ressource ajoutée avec succès !");
        localStorage.removeItem("draftResource");
        this.draftExists = false;
        this.resetForm();
      } catch (error) {
        console.error(
          "Erreur lors de l'ajout de la ressource :",
          error.response ? error.response.data : error.message
        );
      }
    },
    async fetchTypesResource() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/types_ressource",
          this.getAuthHeaders()
        );
        this.typesResource = response.data;
      } catch (error) {
        console.warn(
          "Erreur récupération des types de ressource :",
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
          "Erreur récupération des types de relation :",
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
          "Erreur récupération des catégories de ressources :",
          error.response ? error.response.data : error.message
        );
      }
    },
    handleFileUpload(event) {
      this.resource.selectedFile = event.target.files[0];
    },
    resetForm() {
      if (confirm("Voulez-vous vraiment annuler ? Tous les champs seront réinitialisés.")) {
        this.resource = {
          titre: "",
          contenu: "",
          id_typeRessource: "",
          id_utilisateur: "",
          type_relation: "",
          id_categorie: "",
          lien_video: "",
          nom_image: "",
          selectedFile: null,
        };
      }
    },
    loadDraft() {
      const draft = localStorage.getItem("draftResource");
      if (draft) {
        this.resource = JSON.parse(draft);
        alert("Brouillon chargé !");
      } else {
        alert("Aucun brouillon n'est disponible.");
      }
    },
  },
  mounted() {
    this.fetchTypesResource();
    this.fetchTypesRelation();
    this.fetchCategoriesResource();
    const draft = localStorage.getItem("draftResource");
    if (draft) {
      this.draftExists = true;
    }
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

.add-resources-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.draft-container {
  margin-bottom: 1rem;
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
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #d4c4e0;
  color: black;
}

.btn.cancel {
  background-color: #e74c3c;
}

.btn.cancel:hover {
  background-color: #f1948a;
  color: white;
}

.btn.load-draft {
  background-color: #27ae60;
}

.btn.load-draft:hover {
  background-color: #2ecc71;
}
</style>
