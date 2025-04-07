<template>
  <div>
    <h1>Mes amis</h1>
    <ul>
      <li v-for="friend in friends" :key="friend.id_utilisateur">
        <div class="friend-item">
          <img :src="friend.avatar" alt="Avatar" class="avatar" />
          <span>{{ friend.nom }} {{ friend.prenom }}</span>
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
      friends: []
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
    async fetchFriends() {
      const userId = this.getUserIdFromToken();
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:3000/api/friends/${userId}`, this.getAuthHeaders());
          this.friends = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des amis :", error);
        }
      }
    }
  },
  mounted() {
    this.fetchFriends();
  }
};
</script>

<style scoped>
.amis-container {
  padding: 20px;
}
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

ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f8f9fa;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}
.friend-item {
  display: flex;
  align-items: center;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
