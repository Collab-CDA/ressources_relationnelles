<template>
  <div class="profile-page">
    <h1>Votre profil</h1>
    <div v-if="utilisateur" class="card">
      <div class="avatar-container">
        <img :src="avatarUrl" alt="Avatar" class="avatar" />
        <label for="avatar-upload" class="avatar-upload-icon">
          <i class="fas fa-camera"></i>
        </label>
        <input type="file" id="avatar-upload" @change="handleFileChange" class="avatar-upload-input" />
      </div>
      <p><strong>Nom:</strong> {{ utilisateur.nom }}</p>
      <p><strong>Prénom:</strong> {{ utilisateur.prenom }}</p>
      <p><strong>Email:</strong> {{ utilisateur.email }}</p>
      <div class="button-container">
        <button @click="openEditForm" class="btn">Modifier</button>
        <button @click="confirmDelete" class="btn">Supprimer</button>
      </div>
    </div>
    <div v-else>
      <p>Chargement des informations...</p>
    </div>

    <div v-if="showEditForm" class="edit-form">
      <h2>Modifier les informations</h2>
      <form @submit.prevent="updateUtilisateur">
        <div>
          <label for="nom">Nom:</label>
          <input type="text" id="nom" v-model="editedUtilisateur.nom" required />
        </div>
        <div>
          <label for="prenom">Prénom:</label>
          <input type="text" id="prenom" v-model="editedUtilisateur.prenom" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="editedUtilisateur.email" required />
        </div>
        <div class="form-button-container">
          <button type="submit" class="btn">Enregistrer</button>
          <button type="button" class="btn" @click="closeEditForm">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'ProfilePage',
  data() {
    return {
      utilisateur: null,
      showEditForm: false,
      editedUtilisateur: {
        nom: '',
        prenom: '',
        email: '',
      },
      defaultAvatar: require('@/assets/default-avatar.png'),
      selectedFile: null,
    };
  },
  // Appel de la méthode pour récupérer les informations de l'utilisateur
  created() {
    this.fetchUtilisateur();
  },
  computed: {
    // Propriété calculée pour obtenir l'URL de l'avatar
    avatarUrl() {
      return this.utilisateur.avatar
        ? `http://localhost:3000/uploads/${this.utilisateur.avatar}`
        : this.defaultAvatar;
    },
  },
  methods: {
    async fetchUtilisateur() {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          throw new Error('Token manquant dans le localStorage.');
        }
        // Décodage du token pour obtenir l'ID de l'utilisateur
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; 

        const response = await axios.get(`http://localhost:3000/api/utilisateurs/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        this.utilisateur = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
      }
    },
    openEditForm() {
      // Copie des informations de l'utilisateur dans l'objet "editedUtilisateur" et affichage du formulaire de modif avec tout dedans
      this.editedUtilisateur = { ...this.utilisateur };
      this.showEditForm = true;
    },
    closeEditForm() {
      this.showEditForm = false;
    },
    handleFileChange(event) {
      // Gestion du changement de fichier pour l'avatar
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.uploadAvatar(); // Appel la méthode de téléchargemet ci-dessous
      }
    },
    async uploadAvatar() {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          throw new Error('Token manquant dans le localStorage.');
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id; 
        // Création d'un objet FormData pour envoyer le fichier
        const formData = new FormData();
        formData.append('avatar', this.selectedFile);

        const response = await axios.put(`http://localhost:3000/api/utilisateurs/${userId}/avatar`, formData, {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        });
        // Mise à jour de l'URL de l'avatar
        this.utilisateur.avatar = response.data.avatar;
      } catch (error) {
        console.error('Erreur lors du téléchargement de l\'avatar:', error);
      }
    },
    async updateUtilisateur() {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          throw new Error('Token manquant dans le localStorage.');
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.put(`http://localhost:3000/api/utilisateurs/${userId}`, this.editedUtilisateur, {
          headers: {
            Authorization: token,
          },
        });
         // Mise à jour des informations de l'utilisateur
        this.utilisateur = response.data;
        this.closeEditForm();
      } catch (error) {
        console.error('Erreur lors de la mise à jour des informations de l\'utilisateur:', error);
      }
    },
    confirmDelete() {
      if (confirm('Êtes-vous sûr de vouloir supprimer votre profil?')) {
        this.deleteUtilisateur();
      }
    },
    async deleteUtilisateur() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token manquant dans le localStorage.');
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        await axios.delete(`http://localhost:3000/api/utilisateurs/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        // Supprime le token du localStorage et redirige
        localStorage.removeItem('token'); 
        this.$router.push('/login'); 
      } catch (error) {
        console.error('Erreur lors de la suppression du profil:', error);
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

.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.card {
  background-color: #DAD8D8;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 30rem;
  text-align: left;
}

.card p {
  margin: 10px 0;
}

.avatar-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 8rem;
  height: 8rem;
  border: solid 5px #80ADA0;
  object-fit: cover;
}

.avatar-upload-icon {
  position: absolute;
  bottom: -1.8rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
}

.avatar-upload-input {
  display: none;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  background-color: #B0A2BA;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #D4C4E0;
}

.edit-form {
  background-color: #DAD8D8;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin-top: 20px;
}

.edit-form h2 {
  margin-bottom: 20px;
}

.edit-form div {
  margin-bottom: 15px;
}

.edit-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.edit-form input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }
  .card {
    width: 90%;
    padding: 15px;
  }
  .avatar {
    width: 6rem;
    height: 6rem;
  }
  .btn {
    font-size: 14px;
  }
  .edit-form {
    width: 90%;
  }
}

@media (max-width: 390px) {
  h1 {
    font-size: 18px;
  }
  .card {
    width: 85%;
    padding: 10px;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
  }
  .btn {
    font-size: 12px;
  }
  .edit-form {
    width: 85%;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  h1 {
    font-size: 28px;
  }
  .card {
    width: 80%;
    padding: 18px;
  }
  .avatar {
    width: 7rem;
    height: 7rem;
  }
  .btn {
    font-size: 15px;
  }
  .edit-form {
    width: 80%;
  }
}
</style>
