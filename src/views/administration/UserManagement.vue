<template>
  <div class="container">
    <h1 class="title-container">Gestion des utilisateurs</h1>
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

.container {
    margin-bottom: 2rem;
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
  background-color: #f4f4f4;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

th {
  border: 1px solid #ffffff;

}

th {
  background-color: #dad8d8;
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

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
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
    font-size: 20px;
    margin: 1rem 0;
  }

  .user-table {
    width: 100%;
    overflow-x: auto;
    margin: 5px 0.5rem; 
  }

  table {
    width: 100%;
    font-size: 12px; 
  }

  th, td {
    padding: 4px; 
    width: 18%; 
  }

  button {
    padding: 2px 6px; 
    font-size: 10px; 
  }

  .delete-btn i {
    font-size: 10px; 
  }

  

  .btn {
    width: 100%;
    font-size: 14px; 
    padding: 8px; 
  }

  .button-container {
    flex-direction: column;
    gap: 5px; 
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
