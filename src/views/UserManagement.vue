<template>
  <div>
    <h1>Gestion des utilisateurs</h1>
    
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
      users: []
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
</style>
