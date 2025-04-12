<template>
  <div class="profile-page">
    <h1>Mes amis</h1>
    <ul>
      <li v-for="friend in friends" :key="friend.id_utilisateur" class="card">
        <div class="friend-item">
          <div class="avatar-container">
            <img :src="getAvatarUrl(friend.avatar)" alt="Avatar" class="avatar" />
          </div>
          <div class="friend-info">
            <div class="text-info">
              <p><strong>Nom:</strong> {{ friend.nom }}</p>
              <p><strong>Prénom:</strong> {{ friend.prenom }}</p>
            </div>
            <button @click="goToMessagerie(friend.id_utilisateur)" class="btn">Contacter</button>
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
      userId: null
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
      return avatar ? `http://localhost:3000/uploads/${avatar}` : '';
    },
    async fetchFriends() {
  this.userId = this.getUserIdFromToken();
  if (this.userId) {
    try {
      const response = await axios.get(`http://localhost:3000/api/friends/${this.userId}`, this.getAuthHeaders());
      this.friends = response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des amis :", error);
    }
  }
},
    goToMessagerie(friendId) {
      this.$router.push({ name: 'MessageriePage', params: { friendId: friendId } });
    }
  },
  mounted() {
    this.fetchFriends();
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
  background-color: #DAD8D8;
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
  border: solid 5px #80ADA0;
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

.btn {
  background-color: #B0A2BA;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 1rem;
  margin-top: 0;
}

.btn:hover {
  background-color: #D4C4E0;
}
</style>
