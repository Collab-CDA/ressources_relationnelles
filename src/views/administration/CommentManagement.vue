<template>
  <div>
    <h1 class="title-container">
      Gestion des commentaires
    </h1>

    <div class="main-container">
      <div class="resource-list">
        <h3>Liste des commentaires</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>Contenu</th>
              <th>Date de création</th>
              <th>Auteur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="comment in comments" :key="comment.id_commentaire">
              <td>{{ comment.id_commentaire }}</td>
              <td>{{ comment.titre }}</td>
              <td>{{ comment.contenu }}</td>
              <td>{{ comment.date_creation }}</td>
              <td>
                {{ comment.User ? comment.User.prenom : '' }} {{ comment.User ? comment.User.nom : '' }}
              </td>
              <td>
                <button class="delete" @click="deleteComment(comment.id_commentaire)">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="comments.length === 0">Aucun commentaire trouvé</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CommentManagement",
  data() {
    return {
      comments: []
    };
  },
  created() {
    this.fetchComments();
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get("http://10.176.131.156:3000/api/comments", this.getAuthHeaders());
        this.comments = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error.response?.data || error.message);
      }
    },
    async deleteComment(id) {
      const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?");
      if (!confirmation) return;
      try {
        await axios.delete(`http://10.176.131.156:3000/api/comments/${id}`, this.getAuthHeaders());
        this.comments = this.comments.filter(comment => comment.id_commentaire !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression du commentaire :", error.response?.data || error.message);
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
          "Content-Type": "application/json"
        }
      };
    }
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 32px;
  font-weight: bold;
  color: #0258bd;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.main-container {
  margin: 2rem auto;
  max-width: 1200px;
  padding: 0 1rem;
}

.resource-list {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.resource-list h3 {
  margin-bottom: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem;
  border: 1px solid #ccc;
  text-align: left;
}

button {
  padding: 10px 15px;
  background-color: #b0a2ba;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d4c4e0;
}

button.delete {
  background-color: #d0021b;
  width: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

button.delete:hover {
  background-color: #d76c61;
}

@media screen and (max-width: 768px) {
  .title-container {
    flex-direction: column;
    font-size: 24px;
  }
  th, td {
    font-size: 14px;
  }
  button {
    padding: 8px 10px;
    font-size: 14px;
  }
}
</style>
