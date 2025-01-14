<template>
  <div>
    <h1>Ressources publiques</h1>

    <!-- Barre de filtre -->
    <div class="filter-bar">
      <label for="typeRelation">Type de relation :</label>
      <select v-model="selectedTypeRelation" id="typeRelation">
        <option value="">Tous</option>
        <option v-for="type in typesRelation" :key="type.id_relation" :value="type.libelle_relation">{{ type.libelle_relation }}</option>
      </select>

      <label for="categoryResource">Catégorie de ressource :</label>
      <select v-model="selectedCategoryResource" id="categoryResource">
        <option value="">Tous</option>
        <option v-for="category in categoriesResource" :key="category.id_categorie" :value="category.libelle_categorie">{{ category.libelle_categorie }}</option>
      </select>

      <label for="typeResource">Type de ressource :</label>
      <select v-model="selectedTypeResource" id="typeResource">
        <option value="">Tous</option>
        <option v-for="type in typesResource" :key="type" :value="type">{{ type }}</option>
      </select>

      <!-- Bouton Ajouter une ressource -->
      <button class="add-resource-button" @click="showUploadModal = !showUploadModal">Ajouter une ressource</button>
    </div>

    <!-- Modal de téléchargement -->
    <div v-if="showUploadModal" class="upload-modal">
      <input type="file" @change="handleFileUpload" accept=".pdf, .jpeg, .jpg, .png, video/*" />
      <button @click="uploadResource">Télécharger</button>
    </div>

    <div class="main-container">
      <!-- Liste des ressources -->
      <div class="resource-list">
        <h2>Liste des ressources</h2>
        <ul>
          <li v-for="resource in resources" :key="resource.id">
            <a :href="resource.link" target="_blank">{{ resource.title }}</a>
          </li>
        </ul>
      </div>

      <!-- Contenu principal -->
      <div class="content-container">
        <div class="container-standard">
          <div v-for="resource in filteredResources" :key="resource.id">
            <h2>{{ resource.title }}</h2>
            <p>{{ resource.description }}</p>
            <div v-if="resource.videoEmbed" v-html="resource.videoEmbed"></div>
            <a :href="resource.link" target="_blank">Lien vers la ressource</a>
          </div>
        </div>
      </div>

      <!-- Section des commentaires -->
      <div class="comments-section">
        <h2>Commentaires</h2>
        <div class="comments-box">
          <!-- contenu des commentaires -->
        </div>

        <!-- Bouton Contacter un participant -->
        <button class="contact-button" @click="contactParticipant">Contacter un participant</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PublicRessources',
  data() {
    return {
      showUploadModal: false,
      selectedFile: null,
      resources: [
        // Exemple de données
        {
          id: 1,
          title: 'Pourquoi les Personnes Hypersensibles ont elles des Relations Humaines Compliquées?',
          videoEmbed: '<iframe width="560" height="315" src="https://www.youtube.com/embed/oitiAXGbdT8?si=RMk5-fQ2EG3MWcFB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
          link: 'https://youtu.be/oitiAXGbdT8?si=gH1m-uwq9llVaeMI',
          typeRelation: 'Type 1',
          categoryResource: 'Category 1',
          typeResource: 'Type A'
        },
      ],
      typesRelation: [],
      categoriesResource: [],
      typesResource: ['Vidéos', 'Pdf', 'Fiches', 'Articles', 'Images'],
      selectedTypeRelation: '',
      selectedCategoryResource: '',
      selectedTypeResource: '',
    };
  },
  computed: {
    filteredResources() {
      return this.resources.filter(resource => {
        const typeRelationMatch = this.selectedTypeRelation ? resource.typeRelation === this.selectedTypeRelation : true;
        const categoryResourceMatch = this.selectedCategoryResource ? resource.categoryResource === this.selectedCategoryResource : true;
        const typeResourceMatch = this.selectedTypeResource ? resource.typeResource === this.selectedTypeResource : true;
        return typeRelationMatch && categoryResourceMatch && typeResourceMatch;
      });
    },
  },
  methods: {
    async fetchTypesRelation() {
      try {
        const response = await axios.get('http://localhost:3000/api/relations');
        console.log('Réponse des types de relation :', response.data);
        this.typesRelation = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des types de relation :', error.response ? error.response.data : error.message);
      }
    },
    async fetchCategoriesResource() {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        console.log('Réponse des catégories de ressources :', response.data);
        this.categoriesResource = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories de ressources :', error.response ? error.response.data : error.message);
      }
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadResource() {
      if (this.selectedFile) {
        // Logique pour télécharger le fichier
        console.log('Fichier sélectionné:', this.selectedFile);
      } else {
        alert('Veuillez sélectionner un fichier.');
      }
    },
    contactParticipant() {
      this.$router.push('/messagerie');
    }
  },
  created() {
    this.fetchTypesRelation();
    this.fetchCategoriesResource();
  }
};
</script>

<style scoped>
h1 {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 18px;
  font-weight: bolder;
  margin-top: 2rem;
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

.add-resource-button {
  padding: 4px 12px;
  background-color: #b0a2ba;
  border: none;
  border-radius: 5px;
}

.add-resource-button:hover {
  background-color: #d4c4e0;
}

.upload-modal {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: #ffffff;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.main-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  margin: 2rem auto;
  max-width: 1200px;
}

.resource-list {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.resource-list ul {
  list-style-type: none;
  padding: 0;
}

.resource-list ul li {
  margin-bottom: 10px;
}

.content-container {
  background-color: #dad8d8;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.comments-section {
  background-color: #e0e0e0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.comments-box {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.contact-button {
  padding: 4px 10px;
  background-color: #b0a2ba;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.contact-button:hover {
  background-color: #d4c4e0;
}
</style>
