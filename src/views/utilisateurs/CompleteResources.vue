<template>
  <div>
    <h1>Ressources complètes</h1>
    <!-- Filtre des ressources -->
    <div class="filter-bar">
      <label for="typeRelation">Type de relation :</label>
      <select v-model="selectedTypeRelation" id="typeRelation">
        <option value="">Tous</option>
        <option
          v-for="type in typesRelation"
          :key="type.id_relation"
          :value="type.id_relation"
        >
          {{ type.libelle_relation }}
        </option>
      </select>

      <label for="categoryResource">Catégorie de ressource :</label>
      <select v-model="selectedCategoryResource" id="categoryResource">
        <option value="">Tous</option>
        <option
          v-for="category in categoriesResource"
          :key="category.id_categorie"
          :value="category.id_categorie"
        >
          {{ category.libelle_categorie }}
        </option>
      </select>

      <label for="typeResource">Type de ressource :</label>
      <select v-model="selectedTypeResource" id="typeResource">
        <option value="">Tous</option>
        <option
          v-for="type in typesResource"
          :key="type.id_typesRessource"
          :value="type.id_typesRessource"
        >
          {{ type.libelle_typesRessource }}
        </option>
      </select>

      <button class="add-resource-button" @click="redirectToAddResource">
        Ajouter une ressource
      </button>
    </div>

    <div class="main-container">
      <div class="resource-list">
        <h2>Liste des ressources</h2>
        <ul>
          <li
            v-for="resource in filteredResources"
            :key="resource.id_ressource_"
            @click="resource.statut_ !== 'suspendue' && selectResource(resource)"
          >
            <a
              href="#"
              @click.prevent
              :class="{ suspended: resource.statut_ === 'suspendue' }"
              :title="resource.statut_ === 'suspendue' ? 'Ressource suspendue' : ''"
            >
              {{ resource.titre }}
            </a>
          </li>
        </ul>
        <p v-if="filteredResources.length === 0">Aucun résultat</p>
      </div>

       <!-- Contenu de la ressource sélectionnée -->
      <div class="content-container">
        <div v-if="selectedResource">
          <h2>{{ selectedResource.titre }}</h2>
          <button class="share-button" @click="shareResource">
            <i class="fas fa-share-alt"></i> Partager
          </button>
          <button
            class="favorite-button"
            @click="toggleFavorite(selectedResource)"
          >
            <i class="fas fa-heart"></i>
          </button>
          <p>{{ selectedResource.contenu }}</p>
          <div
            v-if="isEmbedYouTubeLink(selectedResource.lien_video)"
            v-html="getEmbedVideo(selectedResource.lien_video)"
          ></div>
          <div v-else-if="selectedResource.nom_image">
            <div
              v-for="file in selectedResource.nom_image"
              :key="file"
              style="margin-bottom: 10px"
            >
              <div v-if="isImage(file)">
                <img
                  :src="getFileUrl(file)"
                  alt="Image de la ressource"
                  style="max-width: 300px"
                />
              </div>
             
            </div>
          </div>
          <a
            v-if="
              selectedResource.lien_video &&
              !isEmbedYouTubeLink(selectedResource.lien_video)
            "
            :href="selectedResource.lien_video"
            target="_blank"
          >
            Lien vers la ressource
          </a>
        </div>
        <div v-else>
          <img
            src="@/assets/images/ressource_par_defaut.jpg"
            alt="Image par défaut"
            style="width: 100%; height: auto"
          />
        </div>

        <!-- Section des commentaires -->
        <div class="comments-section">
          <h2>Commentaires</h2>
          <div class="comments-box">
            <div
              v-for="comment in comments"
              :key="comment.id_commentaire"
              class="comment"
            >
              <h3>{{ comment.titre }}</h3>
              <p>{{ comment.contenu }}</p>
              <p>
                <strong>Posté par :</strong>
                <span
                  v-if="comment.User"
                  @click="openModal(comment.User)"
                  style="cursor: pointer; text-decoration: underline"
                >
                  {{ comment.User.prenom }} {{ comment.User.nom }}
                </span>
                <span v-else>Utilisateur inconnu</span>
              </p>

              <!-- MODAL ajout d'un ami -->
              <div v-if="isModalOpen" class="modal-overlay">
                <div class="modal">
                  <span class="close-modal" @click="closeModal">&times;</span>
                  <h2>
                    Profil de {{ selectedUser.prenom }} {{ selectedUser.nom }}
                  </h2>
                  <button
                    class="button-modal"
                    @click="sendFriendRequest(selectedUser.id)"
                  >
                    Demander en ami
                  </button>
                </div>
              </div>

              <p>
                <strong>Date :</strong>
                {{ formatDate(comment.date_creation) }}
              </p>
              <button
                class="add-resource-button"
                @click="replyToComment(comment)"
              >
                Répondre
              </button>
            </div>
          </div>

          <form @submit.prevent="addComment">
            <input
              v-model="newComment.titre"
              placeholder="Titre du commentaire"
              required
            />
            <textarea
              v-model="newComment.contenu"
              placeholder="Votre commentaire"
              required
            ></textarea>
            <button class="ajout-button" type="submit">
              Ajouter un commentaire
            </button>
          </form>

          <button class="contact-button" @click="contactParticipant">
            Contacter un participant
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toRaw } from "vue";

export default {
  name: "CompleteResources",
  data() {
    return {
      favorites: [],
      isModalOpen: false,
      selectedUser: null,
      modalUserName: "",
      selectedTypeRelation: "",
      selectedCategoryResource: "",
      selectedTypeResource: "",
      resources: [],
      typesRelation: [],
      categoriesResource: [],
      typesResource: [],
      selectedResource: null,
      comments: [],
      newComment: {
        titre: "",
        contenu: "",
        id_ressource_: null,
        id_commentaire_parent: null,
        id_utilisateur: null,
      },
    };
  },
  computed: {
    // Filtre les ressources en fonction des sélections
    filteredResources() {
      return this.resources.filter((resource) => {
        if (resource.statut_ === "en_attente") return false;

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
    shareResource() {
      alert("Publication partagée");
    },
    // Formate la date pour un affichage lisible
    formatDate(dateStr) {
      if (!dateStr || dateStr === "CURRENT_TIMESTAMP") return "";
      const dateObj = new Date(dateStr);
      return isNaN(dateObj) ? "" : dateObj.toLocaleString();
    },
    // Récupératin de toutes les ressources, publiques et privées
    async fetchResources() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/resources",
          this.getAuthHeaders()
        );
        this.resources = response.data;
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération des ressources :",
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
    // Récupèration des commentaires pour la ressource sélectionnée
    async fetchComments() {
      if (this.selectedResource) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/comments/resource/${this.selectedResource.id_ressource_}`,
            this.getAuthHeaders()
          );
          if (response.data && Array.isArray(response.data)) {
            this.comments = response.data;
          } else {
            console.warn(
              "Données de commentaires incorrectes ou incomplètes :",
              response.data
            );
          }
        } catch (error) {
          console.warn(
            "Erreur lors de la récupération des commentaires :",
            error.response ? error.response.data : error.message
          );
        }
      }
    },
    async addComment() {
      if (this.selectedResource) {
        this.newComment.id_ressource_ = this.selectedResource.id_ressource_;
        this.newComment.id_utilisateur = this.getUserIdFromToken();
        try {
          await axios.post(
            "http://localhost:3000/api/comments",
            this.newComment,
            this.getAuthHeaders()
          );
          this.fetchComments();
          this.newComment = {
            titre: "",
            contenu: "",
            id_ressource_: null,
            id_commentaire_parent: null,
            id_utilisateur: null,
          };
        } catch (error) {
          console.warn(
            "Erreur lors de l'ajout du commentaire :",
            error.response ? error.response.data : error.message
          );
        }
      }
    },
    // Réponse commentaire
    replyToComment(comment) {
      const prenom =
        (comment.User && comment.User.prenom) || "Utilisateur inconnu";
      this.newComment.titre = `Re: ${comment.titre}`;
      this.newComment.contenu = `@${prenom} `;
      this.newComment.id_commentaire_parent = comment.id_commentaire;
    },
    redirectToAddResource() {
      this.$router.push("/add-resources");
    },
    contactParticipant() {
      this.$router.push("/messagerie");
    },
    // Retourne le code HTML pour intégrer une vidéo YouTube
    getEmbedVideo(url) {
      return `<iframe src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-wr src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    },
    // Vérifie si l'URL est un lien YouTube intégrable
    isEmbedYouTubeLink(url) {
      return /youtube\.com|youtu\.be/.test(url);
    },
    // Vérifie si le fichier est une image
    isImage(file) {
      if (file.startsWith("data:")) return true;
      return /\.(jpg|jpeg|png|gif)$/i.test(file);
    },
    // Vérifie si le fichier est un PDF
    isPDF(file) {
      if (file.startsWith("data:")) return false;
      return /\.pdf$/i.test(file);
    },
    // Retourne l'URL complète du fichier
    getFileUrl(file) {
      if (file.startsWith("data:")) {
        return file;
      }
      return `${window.location.origin}/uploads/${file}`;
    },
    getUserIdFromToken() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          return decodedToken.id;
        } catch (error) {
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
     // Ajoute une ressource des favoris
    async toggleFavorite(resource) {
      const userId = this.getUserIdFromToken();
      if (!userId) {
        alert("Vous devez être connecté pour ajouter une ressource aux favoris.");
        return;
      }

      const isFavorite = this.isResourceInFavorites(resource.id_ressource_);
      if (isFavorite) {
        alert("Ressource déjà ajoutée aux favoris !");
        return;
      }

      try {
        await axios.post(
          "http://localhost:3000/api/favoris/create",
          { id_utilisateur: userId, id_ressource_: resource.id_ressource_ },
          this.getAuthHeaders()
        );
        alert("Ressource ajoutée aux favoris avec succès !");
      } catch (error) {
        console.warn(
          "Erreur lors de l'ajout aux favoris :",
          error.response ? error.response.data : error.message
        );
      }
    },

    isResourceInFavorites(resourceId) {
      return this.favorites.some(fav => fav.id_ressource_ === resourceId);
    },

    selectResource(resource) {
      this.selectedResource = resource;
      this.fetchComments();
    },
    async openModal(user) {
      if (user && user.prenom && user.nom) {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/users/search",
            {
              params: { prenom: user.prenom, nom: user.nom },
              headers: this.getAuthHeaders().headers,
            }
          );

          if (response.data && response.data.id_utilisateur) {
            this.selectedUser = response.data;
            this.selectedUserId = toRaw(response.data.id_utilisateur);
            this.isModalOpen = true;
          } else {
            console.error("Utilisateur non trouvé :", user);
            alert("Utilisateur non trouvé.");
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            error
          );
          alert("Erreur lors de la récupération de l'utilisateur.");
        }
      } else {
        console.error("Nom ou prénom de l'utilisateur invalide :", user);
      }
    },
    // Envoie une demande d'ami
    async sendFriendRequest() {
      const currentUserId = this.getUserIdFromToken();
      const selectedUserId =
        this.selectedUser?.id_utilisateur || this.selectedUserId;

      if (!currentUserId || !selectedUserId) {
        console.error(
          "Les IDs des utilisateurs sont manquants. Vérifiez les valeurs."
        );
        alert("Les deux IDs des utilisateurs sont requis.");
        return;
      }

      try {
        await axios.post(
          "http://localhost:3000/api/friendships/create",
          {
            id_utilisateur1: currentUserId,
            id_utilisateur2: selectedUserId,
          },
          this.getAuthHeaders()
        );

        alert("Invitation envoyée avec succès !");
        this.closeModal();
      } catch (error) {
        console.error(
          "Erreur lors de l'envoi de l'invitation :",
          error.response ? error.response.data : error.message
        );
        alert("Une erreur est survenue lors de l'envoi de l'invitation.");
      }
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedUser = null;
    },
    // Récupère les favoris de l'utilisateur
    async fetchFavorites() {
      const userId = this.getUserIdFromToken();
      if (!userId) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/api/favoris/${userId}`,
          this.getAuthHeaders()
        );
        this.favorites = response.data;
      } catch (error) {
        console.warn(
          "Erreur lors de la récupération des favoris :",
          error.response ? error.response.data : error.message
        );
      }
    },
  },
  mounted() {
    // Appelle les méthodes pour récupérer les données lors du montage du composant
    this.fetchResources();
    this.fetchTypesRelation();
    this.fetchCategoriesResource();
    this.fetchTypesResource();
    this.fetchFavorites();
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
  font-family: "Roboto", sans-serif;
  background-color: #ffffff;
  color: #000000;
}

h1 {
  font-family: "Roboto", sans-serif;
  font-size: 32px;
  font-weight: bold;
  color: #0258bd;
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

.resource-button {
  padding: 4px 12px;
  background-color: #b0a2ba;
  border: none;
  border-radius: 5px;
  margin-top: 1rem;
}

.resource-button:hover {
  background-color: #d4c4e0;
}

.suspended {
  color: red;
  text-decoration: none;
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
  position: relative;
}

.content-container img {
  max-width: 100%;
  height: auto;
  width: 100%;
}

.favorite-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: red;
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

form input,
form textarea {
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

.modal-overlay {
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

.modal {
  background-color: #dad8d8;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.modal h2 {
  margin-bottom: 20px;
  font-size: 18px;
  text-align: center;
}

.button-modal {
  background-color: #b0a2ba;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.button-modal:hover {
  background-color: #d4c4e0;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: black;
}

.close-modal:hover {
  color: red;
}

.share-button {
  position: absolute;
  top: 10px;
  right: 50px; 
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: blue;
}

.share-button:hover {
  color: darkblue;
}

/* RESPONSIVE  */
@media (max-width: 768px) {
  .main-container {
    margin: 2rem 1rem;
    width: calc(100% - 2rem);
  }

  .filter-bar {
    margin: 0 2rem;
    width: calc(100% - 4rem);
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-bar label,
  .filter-bar select,
  .add-resource-button {
    margin-bottom: 1rem;
    width: 100%;
  }

  .main-container {
    flex-direction: column;
  }

  .resource-list,
  .content-container {
    padding: 1rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .main-container {
    margin: 2rem 2rem;
    width: calc(100% - 4rem);
  }

  .filter-bar {
    margin: 0 4rem;
    width: calc(100% - 6rem);
    flex-direction: row;
    flex-wrap: wrap;
  }

  .filter-bar label,
  .filter-bar select {
    margin-bottom: 1rem;
    width: calc(50% - 20px);
  }

  .add-resource-button {
    width: 100%;
  }

  .main-container {
    flex-direction: column;
  }

  .resource-list,
  .content-container {
    padding: 1.5rem;
  }

  
}
</style>