<template>
  <div class="profile-page">
    <h1>Mes amis</h1>
    <ul>
      <li v-for="friend in friends" :key="friend.id_utilisateur" class="card">
        <div class="friend-item">
          <div class="avatar-container">
            <img
              :src="getAvatarUrl(friend.avatar)"
              alt="Avatar"
              class="avatar"
            />
          </div>
          <div class="friend-info">
            <div class="text-info">
              <p><strong>Nom:</strong> {{ friend.nom }}</p>
              <p><strong>Prénom:</strong> {{ friend.prenom }}</p>
            </div>
            <div class="friends-actions">

            <button @click="goToMessagerie(friend.id_utilisateur)" class="btn">
              Contacter
            </button>
            <button
              @click="removeFriend(friend.id_utilisateur)"
              class="btn delete-btn"
            >
            <i class="fas fa-trash"></i>
                      </button>
          </div>
        </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "FriendsPage",
  data() {
    return {
      friends: [],
      userId: null,
    };
  },
  methods: {
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
    getAvatarUrl(avatar) {
      return avatar ? `http://localhost:3000/uploads/${avatar}` : "";
    },
    async fetchFriends() {
      this.userId = this.getUserIdFromToken();
      if (this.userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/friends/${this.userId}`,
            this.getAuthHeaders()
          );
          this.friends = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des amis :", error);
        }
      }
    },
    async removeFriend(friendId) {
      const confirmation = window.confirm(
        "Êtes-vous sûr de vouloir supprimer cet ami ?"
      );
      if (!confirmation) return;

      try {
        const response = await axios.post(
          "http://localhost:3000/api/friendships/delete",
          {
            id_utilisateur1: this.userId,
            id_utilisateur2: friendId,
          },
          this.getAuthHeaders()
        );
        // Mise à jour de la liste des amis
        this.friends = this.friends.filter(
          (friend) => friend.id_utilisateur !== friendId
        );
      } catch (error) {
        console.error("Erreur lors de la suppression de l'ami :", error);
      }
    },
    goToMessagerie(friendId) {
      this.$router.push({
        name: "MessageriePage",
        params: { friendId: friendId },
      });
    },
  },
  mounted() {
    this.fetchFriends();
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

.profile-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

.card {
  background-color: #dad8d8;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  border-radius: 10px;
  text-align: left;
}

.friend-item {
  display: flex;
  align-items: center;
}

.avatar-container {
  margin-right: 1rem;
}

.avatar {
  width: 4rem;
  height: 4rem;
  border: solid 5px #80ada0;
  border-radius: 50%;
  object-fit: cover;
}

.friend-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.text-info {
  display: flex;
  flex-direction: column;
}

.friend-info p {
  margin: 5px 0;
}

.friend-info p,
.friend-info strong {
  color: #000000;
}

.friends-actions {
  display: flex;
  gap: 10px;
}

.btn {
  background-color: #b0a2ba;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0;
}

.btn:hover {
  background-color: #d4c4e0;
}

.delete-btn i {
  font-size: 20px; 
  color: white;    
}

.delete-btn:hover i {
  color: #D0021B;  
}
</style>
