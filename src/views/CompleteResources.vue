<template>
  <div>
    <h1>Ressources complètes</h1>
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
            @click="selectResource(resource)"
          >
            <a href="#" @click.prevent>{{ resource.titre }}</a>
          </li>
        </ul>
        <p v-if="filteredResources.length === 0">Aucun résultat</p>
      </div>

      <div class="content-container">
        <div v-if="selectedResource">
          <h2>{{ selectedResource.titre }}</h2>
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
              <div v-else-if="isPDF(file)">
                <a :href="getFileUrl(file)" target="_blank" download>
                  Télécharger PDF : {{ file }}
                </a>
              </div>
              <div v-else>
                <a :href="getFileUrl(file)" target="_blank" download>
                  Télécharger le fichier : {{ file }}
                </a>
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
                  @click="openUserModal(comment.User)"
                  style="cursor: pointer; text-decoration: underline"
                >
                  {{
                    comment.User
                      ? comment.User.prenom + " " + comment.User.nom
                      : "Utilisateur inconnu"
                  }}
                </span>
              </p>
              <p>
                <strong>Date :</strong>
                {{ formatDate(comment.date_creation) }}
              </p>
              <button @click="replyToComment(comment)">Répondre</button>
            </div>
          </div>

          <!-- Modal de demande d'ami -->
          <div v-if="showModal" class="modal">
            <div class="modal-content">
              <span class="close" @click="closeModal">&times;</span>
              <p>{{ modalUserName }}</p>
              <button @click="addFriend">Ajouter en ami</button>
              <button @click="sendMessage">Envoyer un message</button>
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

export default {
  name: "CompleteResources",
  data() {
    return {
      showModal: false,
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
    formatDate(dateStr) {
      if (!dateStr || dateStr === "CURRENT_TIMESTAMP") return "";
      const dateObj = new Date(dateStr);
      return isNaN(dateObj) ? "" : dateObj.toLocaleString();
    },
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
          // On poste le commentaire puis on re-fait une récupération complète
          await axios.post(
            "http://localhost:3000/api/comments",
            this.newComment,
            this.getAuthHeaders()
          );
          this.fetchComments(); // recharge les commentaires pour afficher le post fraîchement ajouté
          // Réinitialiser le formulaire
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
    getEmbedVideo(url) {
      return `<iframe width="560" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    },
    isEmbedYouTubeLink(url) {
      return /youtube\.com|youtu\.be/.test(url);
    },
    isImage(file) {
      if (file.startsWith("data:")) return true;
      return /\.(jpg|jpeg|png|gif)$/i.test(file);
    },
    isPDF(file) {
      if (file.startsWith("data:")) return false;
      return /\.pdf$/i.test(file);
    },
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
    async toggleFavorite(resource) {
      const userId = this.getUserIdFromToken();
      if (!userId) {
        alert(
          "Vous devez être connecté pour ajouter une ressource aux favoris."
        );
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
    selectResource(resource) {
      this.selectedResource = resource;
      this.fetchComments();
    },
    openUserModal(user) {
    if (!user) {
      alert("Utilisateur inconnu");
      return;
    }
    this.selectedUser = user;
    this.modalUserName = `${user.prenom} ${user.nom}`;
    this.showModal = true;
  },

  closeModal() {
    this.showModal = false;
    this.selectedUser = null;
    this.modalUserName = '';
  },

  async addFriend() {
    try {
      const invitationData = {
        id_utilisateur_inviteur: this.getUserIdFromToken(),
        id_utilisateur_invite: this.selectedUser.id,
        id_ressource_: this.selectedResource.id_ressource_,
        statut_invitation: 'envoyée'
      };
      await axios.post("http://localhost:3000/api/invitations/create", invitationData, this.getAuthHeaders());
      alert("Invitation envoyée avec succès !");
      this.closeModal();
    } catch (error) {
      console.warn("Erreur lors de l'envoi de l'invitation :", error.response ? error.response.data : error.message);
    }
  },

  sendMessage() {
    const userId = this.getUserIdFromToken();
    if (!this.isFriend(this.selectedUser.id)) {
      alert("Vous devez être ami pour échanger des messages.");
      return;
    }
    this.openChatWithUser(this.selectedUser.id);
    this.closeModal();
  },

  async isFriend(userId) {
    try {
      const currentUserId = this.getUserIdFromToken();
      const response = await axios.post(
        "http://localhost:3000/api/friendships/check",
        { userId1: currentUserId, userId2: userId },
        this.getAuthHeaders()
      );
      return response.data.isFriend;
    } catch (error) {
      console.warn("Erreur lors de la vérification de l'amitié :", error.response ? error.response.data : error.message);
      return false;
    }
  },
  openChatWithUser(userId) {
    this.$router.push(`/messagerie/${userId}`);
  },
  },
  mounted() {
    this.fetchResources();
    this.fetchTypesRelation();
    this.fetchCategoriesResource();
    this.fetchTypesResource();
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

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 300px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Responsive mobiles */
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

/* Responsive tablettes */
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
