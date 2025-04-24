<template>
    <div>
      <h1 class="title-container">Gestion des utilisateurs
        <button class="add-user-button" @click="openModal">Ajouter un utilisateur</button>
  
      </h1>
  
  
      <div class="user-table">
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id_utilisateur">
              <td>{{ user.nom }}</td>
              <td>{{ user.prenom }}</td>
              <td>{{ user.role_ }}</td>
              <td>
                <button
                  :class="{'active': user.statut === 'actif', 'suspended': user.statut === 'suspendu'}"
                  @click="toggleStatus(user)"
                >
                  {{ user.statut }}
                </button>
              </td>
              <td>
                <button class="delete-btn" @click="deleteUser(user.id_utilisateur)">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
  
      <!-- Modale d'ajout d'utilisateur -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close-button" @click="closeModal">&times;</span>
          <h4>Ajouter un utilisateur</h4>
          <form @submit.prevent="submitUser">
            <div class="form-group">
              <label for="nom">Nom :</label>
              <input type="text" id="nom" v-model="newUser.nom" required />
            </div>
            <div class="form-group">
              <label for="prenom">Prénom :</label>
              <input type="text" id="prenom" v-model="newUser.prenom" required />
            </div>
            <div class="form-group">
              <label for="email">Email :</label>
              <input type="email" id="email" v-model="newUser.email" required />
            </div>
            <div class="form-group">
              <label for="mot_de_passe">Mot de passe :</label>
              <input type="password" id="mot_de_passe" v-model="newUser.mot_de_passe" required />
            </div>
            <div class="form-group">
              <label for="role_">Rôle :</label>
              <select id="role_" v-model="newUser.role_" required>
                <option value="utilisateur">Utilisateur</option>
                <option value="Modérateur">Modérateur</option>
                <option value="Admin">Administrateur</option>
                <option value="Super-Admin">Super administrateur</option>
              </select>
            </div>
            <div class="button-container">
              <button type="submit" class="btn">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'SuperAdminUserManagement',
    data() {
      return {
        users: [],
        showModal: false,
        newUser: {
          nom: '',
          prenom: '',
          email: '',
          mot_de_passe: '',
          role_: 'utilisateur',
        },
      };
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3000/api/users');
          this.users = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des utilisateurs:", error);
        }
      },
  
      async toggleStatus(user) {
        const newStatus = user.statut === 'actif' ? 'suspendu' : 'actif';
        try {
          await axios.put(`http://localhost:3000/api/users/${user.id_utilisateur}`, { statut: newStatus });
          user.statut = newStatus;
        } catch (error) {
          console.error("Erreur lors de la mise à jour du statut:", error);
        }
      },
  
      async deleteUser(userId) {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
          try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            this.users = this.users.filter(user => user.id_utilisateur !== userId);
          } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
          }
        }
      },
  
      openModal() {
        this.showModal = true;
      },
  
      closeModal() {
        this.showModal = false;
        this.resetUserForm();
      },
  
      resetUserForm() {
        this.newUser = {
          nom: '',
          prenom: '',
          email: '',
          mot_de_passe: '',
          role_: 'utilisateur',
        };
      },
  
      async submitUser() {
        try {
          const response = await axios.post('http://localhost:3000/api/utilisateurs/register', {
            ...this.newUser,
            statut: 'actif',
          });
          alert("Utilisateur ajouté avec succès !");
          this.closeModal();
          this.fetchUsers();
        } catch (error) {
          console.error("Erreur lors de l'ajout de l'utilisateur:", error);
          if (error.response && error.response.data && error.response.data.message === "Un compte existe déjà avec cet email.") {
            alert("Un compte existe déjà avec cet email.");
          } else {
            alert("Une erreur est survenue.");
          }
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
  
  .title-container {
    display: flex;
    justify-content: center;
    align-items: center;
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
  
  .user-table {
    max-width: 800px;
    margin: 20px auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  button {
    border: none;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 5px;
  }
  
  button.active {
    background-color: #7ED321;
    color: white;
  }
  
  button.suspended {
    background-color: #D0021B;
    color: white;
  }
  
  .delete-btn {
    background-color: #D0021B;
    color: white;
  }
  
  .delete-btn i {
    font-size: 16px;
  }
  
  .add-user-button {
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
  
  .add-user-button:hover {
    background-color: #d4c4e0;
    color: black;
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
  .form-group select {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .button-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  .btn {
    background-color: #b0a2ba;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #d4c4e0;
  }
  
  /* Responsive écrans mobiles */
  @media (max-width: 768px) {
    h1 {
      font-size: 28px;
    }
    .main-container {
      margin: 1rem;
    }
    button {
      width: 100%;
      padding: 12px 0;
    }
    .modal-content {
    padding: 1.5rem;
    width: 80%;
    height: 90%; 
    overflow-y: auto;
  }
  }
  
  /* Responsive tablettes */
  @media (min-width: 768px) and (max-width: 1024px) {
    h1 {
      font-size: 30px;
    }
    .main-container {
      margin: 2rem auto;
    }
  }
  

  </style>
  