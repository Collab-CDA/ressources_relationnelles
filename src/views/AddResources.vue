<template>
  <div class="add-resources-page">
    <div class="card">
      <h1>Ajouter une ressource</h1>
      <form @submit.prevent="submitResource" enctype="multipart/form-data">
        <div class="form-group">
          <label for="titre">Titre</label>
          <input type="text" id="titre" v-model="titre" required />
        </div>
        <div class="form-group">
          <label for="contenu">Contenu</label>
          <textarea id="contenu" v-model="contenu" required></textarea>
        </div>
        <div class="form-group">
          <label for="typeResource">Type de ressource :</label>
          <select v-model="id_typeRessource" id="typeResource" required>
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
          <select v-model="type_relation" id="typeRelation" required>
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
          <select v-model="id_categorie" id="categoryResource" required>
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
        <div class="file-upload-container">
          <label for="image" class="file-upload-label">Télécharger une image</label>
          <input type="file" id="image" @change="onFileChange" class="file-upload-input" />
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
      titre: "",
      contenu: "",
      id_categorie: "",
      id_typeRessource: "",
      type_relation: "",
      image: null,
      categoriesResource: [],
      typesRelation: [],
      typesResource: [],
    };
  },
  methods: {
    async submitResource() {
      const formData = new FormData();
      formData.append("titre", this.titre);
      formData.append("contenu", this.contenu);
      formData.append("id_categorie", this.id_categorie);
      formData.append("id_typeRessource", this.id_typeRessource);
      formData.append("type_relation", this.type_relation);
      if (this.image) {
        formData.append("image", this.image);
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/api/resources/create",
          formData,
          this.getAuthHeaders()
        );
        console.log("Ressource ajoutée avec succès :", response.data);
      } catch (error) {
        console.error("Erreur lors de l'ajout de la ressource :", error.response ? error.response.data : error.message);
      }
    },
    onFileChange(event) {
      this.image = event.target.files[0];
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
    getAuthHeaders() {
      const token = localStorage.getItem("token");
      return {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
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
