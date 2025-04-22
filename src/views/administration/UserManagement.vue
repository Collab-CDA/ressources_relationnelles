<template>
  <div>
    <h1 class="title-container">Gestion des utilisateurs
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserManagement',
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://10.176.131.156:3000/api/users');
        this.users = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    },
    async toggleStatus(user) {
      const newStatus = user.statut === 'actif' ? 'suspendu' : 'actif';
      try {
        await axios.put(`http://10.176.131.156:3000/api/users/${user.id_utilisateur}`, { statut: newStatus });
        user.statut = newStatus;
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut:", error);
      }
    },
    async deleteUser(userId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
        try {
          await axios.delete(`http://10.176.131.156:3000/api/users/${userId}`);
          this.users = this.users.filter(user => user.id_utilisateur !== userId);
        } catch (error) {
          console.error("Erreur lors de la suppression de l'utilisateur:", error);
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
@media screen and (max-width: 768px) {
  h1 {
    font-size: 24px;
    margin: 1.5rem 0;
  }

  .user-table {
    overflow-x: auto;
    margin: 10px 1rem;
  }

  table {
    width: 100%;
    font-size: 14px;
  }

  th, td {
    padding: 8px;
  }

  button {
    padding: 6px 10px;
    font-size: 14px;
  }

  .delete-btn i {
    font-size: 14px;
  }

  .modal-content {
    padding: 1rem;
  }

  .form-group input,
  .form-group select {
    font-size: 14px;
    padding: 6px;
  }

  .btn {
    width: 100%;
    font-size: 16px;
    padding: 10px;
  }

  .button-container {
    flex-direction: column;
    gap: 10px;
  }
}

/* Responsive tablettes */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  h1 {
    font-size: 28px;
    margin: 1.75rem 0;
  }

  .user-table {
    margin: 20px 1.5rem;
  }

  table {
    font-size: 15px;
  }

  th, td {
    padding: 10px;
  }

  button {
    font-size: 15px;
    padding: 7px 12px;
  }

  .delete-btn i {
    font-size: 15px;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .form-group input,
  .form-group select {
    font-size: 15px;
    padding: 7px;
  }

  .btn {
    font-size: 17px;
    padding: 10px 16px;
  }

  .button-container {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
}

</style>
