<template>
  <div>
    <h1>Ressources complètes</h1>

    <div class="filter-bar">
      <label for="typeRelation">Type de relation :</label>
      <select v-model="selectedTypeRelation" id="typeRelation">
        <option value="">Tous</option>
        <option v-for="type in typesRelation" :key="type.id_relation" :value="type.id_relation">
          {{ type.libelle_relation }}
        </option>
      </select>

      <label for="categoryResource">Catégorie de ressource :</label>
      <select v-model="selectedCategoryResource" id="categoryResource">
        <option value="">Tous</option>
        <option v-for="category in categoriesResource" :key="category.id_categorie" :value="category.id_categorie">
          {{ category.libelle_categorie }}
        </option>
      </select>

      <label for="typeResource">Type de ressource :</label>
      <select v-model="selectedTypeResource" id="typeResource">
        <option value="">Tous</option>
        <option v-for="type in typesResource" :key="type" :value="type">
          {{ type }}
        </option>
      </select>

      <button class="add-resource-button" @click="showUploadModal = !showUploadModal">Ajouter une ressource</button>
    </div>

    <div v-if="showUploadModal" class="upload-modal">
      <input type="file" @change="handleFileUpload" accept=".pdf, .jpeg, .jpg, .png, video/*" />
      <button @click="uploadResource">Télécharger</button>
    </div>

    <div class="main-container">
      <div class="resource-list">
        <h2>Liste des ressources</h2>
        <ul>
          <li v-for="resource in filteredResources" :key="resource.id_ressource_" @click="selectResource(resource)">
            <a href="#" @click.prevent>{{ resource.titre }}</a>
          </li>
        </ul>
        <p v-if="filteredResources.length === 0">Aucun résultat</p>
      </div>

      <div class="content-container">
        <div v-if="selectedResource">
          <h2>{{ selectedResource.titre }}</h2>
          <p>{{ selectedResource.contenu }}</p>
          <div v-if="isEmbedYouTubeLink(selectedResource.lien_video)" v-html="getEmbedVideo(selectedResource.lien_video)"></div>
          <div v-else-if="selectedResource.nom_image">
            <img :src="getImageUrl(selectedResource.nom_image)" alt="Image de la ressource" />
          </div>
          <a v-if="selectedResource.lien_video && !isEmbedYouTubeLink(selectedResource.lien_video)" :href="selectedResource.lien_video" target="_blank">Lien vers la ressource</a>
        </div>
        <div v-else>
          <img src="@/assets/images/ressource_par_defaut.jpg" alt="Image par défaut" style="width: 100%; height: auto;" />
        </div>

        <!-- Section des commentaires -->
        <div class="comments-section">
          <h2>Commentaires</h2>
          <div class="comments-box">
            <div v-for="comment in comments" :key="comment.id_commentaire" class="comment">
              <h3>{{ comment.titre_commentaire }}</h3>
              <p>{{ comment.contenu_commentaire }}</p>
              <p><strong>Posté par:</strong> {{ comment.prenom_utilisateur || 'Utilisateur inconnu' }}</p>
              <p><strong>Date:</strong> {{ comment.date_creation }}</p>
              <button @click="replyToComment(comment)">Répondre</button>
            </div>


          </div>

          <form @submit.prevent="addComment">
            <input v-model="newComment.titre_commentaire" placeholder="Titre du commentaire" required />
            <textarea v-model="newComment.contenu_commentaire" placeholder="Votre commentaire" required></textarea>
            <button class="ajout-button" type="submit">Ajouter un commentaire</button>
          </form>

          <button class="contact-button" @click="contactParticipant">Contacter un participant</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CompleteResources',
  data() {
    return {
      showUploadModal: false,
      selectedFile: null,
      resources: [],
      typesRelation: [],
      categoriesResource: [],
      typesResource: ['text', 'pdf', 'video', 'image'],
      selectedTypeRelation: '',
      selectedCategoryResource: '',
      selectedTypeResource: '',
      selectedResource: null,
      comments: [],
      newComment: {
        titre_commentaire: '',
        contenu_commentaire: '',
        id_ressource_: null,
        statut_commentaire: 'Validé',
      },
    };
  },
  computed: {
    filteredResources() {
      return this.resources.filter(resource => {
        const typeRelationMatch = this.selectedTypeRelation ? resource.type_relation === parseInt(this.selectedTypeRelation) : true;
        const categoryResourceMatch = this.selectedCategoryResource ? resource.id_categorie === parseInt(this.selectedCategoryResource) : true;
        const typeResourceMatch = this.selectedTypeResource ? resource.type_ressource_ === this.selectedTypeResource : true;
        return typeRelationMatch && categoryResourceMatch && typeResourceMatch;
      });
    }
  },
  methods: {
    async fetchResources() {
      try {
        const response = await axios.get('http://localhost:3000/api/resources', this.getAuthHeaders());
        this.resources = response.data;
      } catch (error) {
        console.warn('Erreur lors de la récupération des ressources :', error.response ? error.response.data : error.message);
      }
    },
    async fetchTypesRelation() {
      try {
        const response = await axios.get('http://localhost:3000/api/relations', this.getAuthHeaders());
        this.typesRelation = response.data;
      } catch (error) {
        console.warn('Erreur lors de la récupération des types de relation :', error.response ? error.response.data : error.message);
      }
    },
    async fetchCategoriesResource() {
      try {
        const response = await axios.get('http://localhost:3000/api/categories', this.getAuthHeaders());
        this.categoriesResource = response.data;
      } catch (error) {
        console.warn('Erreur lors de la récupération des catégories de ressources :', error.response ? error.response.data : error.message);
      }
    },
async fetchComments() {
  if (this.selectedResource) {
    // Vérification si les commentaires sont déjà dans localStorage
    const storedComments = localStorage.getItem(`comments_${this.selectedResource.id_ressource_}`);
    if (storedComments) {
      this.comments = JSON.parse(storedComments);  // Charger depuis le localStorage
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/api/comments/${this.selectedResource.id_ressource_}`, this.getAuthHeaders());
      if (response.data && Array.isArray(response.data)) {
        this.comments = response.data;
        // Sauvegarder les commentaires dans localStorage
        localStorage.setItem(`comments_${this.selectedResource.id_ressource_}`, JSON.stringify(this.comments));
      } else {
        console.warn("Données de commentaires incorrectes ou incomplètes :", response.data);
      }
    } catch (error) {
      console.warn('Erreur lors de la récupération des commentaires :', error.response ? error.response.data : error.message);
    }
  }
},

async addComment() {
  if (this.selectedResource) {
    this.newComment.id_ressource_ = this.selectedResource.id_ressource_;
    this.newComment.id_utilisateur = this.getUserIdFromToken(); // Ajoute l'ID utilisateur

    // Récupérer le prénom depuis le JWT stocké dans 'token'
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Décodage du payload JWT
      const userFirstName = decodedToken.prenom || 'Inconnu';
      this.newComment.prenom_utilisateur = userFirstName;
    } else {
      this.newComment.prenom_utilisateur = 'Inconnu';
    }

    try {
      const response = await axios.post('http://localhost:3000/api/comments', this.newComment, this.getAuthHeaders());
      this.comments.push(response.data);
      // Mettre à jour le localStorage avec les nouveaux commentaires
      localStorage.setItem(`comments_${this.selectedResource.id_ressource_}`, JSON.stringify(this.comments));
      // Réinitialisation de newComment en incluant prenom_utilisateur
      this.newComment = {
        titre_commentaire: '',
        contenu_commentaire: '',
        id_ressource_: null,
        statut_commentaire: 'Validé',
        id_utilisateur: null,
        prenom_utilisateur: ''
      };
    } catch (error) {
      console.warn('Erreur lors de l\'ajout du commentaire :', error.response ? error.response.data : error.message);
    }
  }
},


replyToComment(comment) {
  // Si l'objet User existe, on utilise son prenom, sinon on utilise directement le champ prenom_utilisateur
  const prenom = comment.User && comment.User.prenom ? comment.User.prenom : comment.prenom_utilisateur || 'Utilisateur inconnu';
  this.newComment.titre_commentaire = `Re: ${comment.titre_commentaire}`;
  this.newComment.contenu_commentaire = `@${prenom} `;
}
,
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadResource() {
      if (this.selectedFile) {
        console.log('Fichier sélectionné:', this.selectedFile);
        // Ajoutez ici la logique pour télécharger le fichier
      } else {
        alert('Veuillez sélectionner un fichier.');
      }
    },
    contactParticipant() {
      this.$router.push('/messagerie');
    },
    getEmbedVideo(url) {
      return `<iframe width="560" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    },
    getImageUrl(imageName) {
      return require(`@/assets/images/${imageName}`);
    },
    selectResource(resource) {
      this.selectedResource = resource;
      this.fetchComments();
    },
    isEmbedYouTubeLink(url) {
      return url && url.includes('youtube.com/embed/');
    },
    getAuthHeaders() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token non trouvé dans le localStorage.');
        return {};
      }
      return {
        headers: {
          Authorization: `${token}`
        }
      };
    },
    getUserIdFromToken() {
      const token = localStorage.getItem('token');
      if (token) {
        const base64Url = token.split('.')[1]; // Récupère la partie payload du JWT
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const decodedData = JSON.parse(window.atob(base64));
        return decodedData.id_utilisateur; // Retourne l'ID utilisateur décodé
      }
      return null;
    }
  },
mounted() {
    this.fetchResources();
    this.fetchTypesRelation();
    this.fetchCategoriesResource();
    // Ajoutez cette ligne pour charger les commentaires dès le début si une ressource est sélectionnée
    if (this.selectedResource) {
      this.fetchComments();
    }
  },
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
  display: flex;
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
}

.resource-list {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
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
  margin-top: 2rem;
  flex-grow: 1;
}

.comments-section {
  background-color: #e0e0e0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  width: 100%;
}

.comments-box {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.comment {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
}

form input, form textarea {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

form button {
  padding: 0.5rem;
  background-color: #b0a2ba;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form button:hover {
  background-color: #d4c4e0;
}

.ajout-button {
  margin-bottom: 1rem;
}

.contact-button {
  padding: 4px 10px;
  background-color: #b0a2ba;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.contact-button:hover {
  background-color: #d4c4e0;
}
</style>
