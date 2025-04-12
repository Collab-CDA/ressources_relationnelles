<template>
  <div class="messagerie-page">
    <h1>Accueil messagerie</h1>
    <div class="conversations-list">
      <div v-for="conversation in conversations" :key="conversation.friendId" class="conversation-item">
        <div class="conversation-info">
          <span>{{ conversation.friendName }}</span>
        </div>
        <div class="conversation-actions">
          <button @click="goToMessagerie(conversation.friendId)" class="btn">Reprendre</button>
          <button @click="deleteConversation(conversation.friendId)" class="btn delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'MessagerieAccueil',
  data() {
    return {
      conversations: [],
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
    async fetchConversations() {
      if (this.userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/conversations/${this.userId}`,
            this.getAuthHeaders()
          );
          this.conversations = await Promise.all(
            response.data.map(async (conversation) => {
              const friendResponse = await axios.get(
                `http://localhost:3000/api/utilisateurs/${conversation.friendId}`,
                this.getAuthHeaders()
              );
              return {
                ...conversation,
                friendName: friendResponse.data.prenom
              };
            })
          );
        } catch (error) {
          console.error("Erreur lors de la récupération des conversations :", error);
        }
      }
    },
    goToMessagerie(friendId) {
      this.$router.push({ name: 'MessageriePage', params: { friendId: friendId } });
    },
    async deleteConversation(friendId) {
      if (this.userId && friendId) {
        try {
          await axios.delete(
            `http://localhost:3000/api/conversations/${this.userId}/${friendId}`,
            this.getAuthHeaders()
          );
          this.conversations = this.conversations.filter(conversation => conversation.friendId !== friendId);
        } catch (error) {
          console.error("Erreur lors de la suppression de la conversation :", error);
        }
      }
    }
  },
  mounted() {
    this.userId = this.getUserIdFromToken();
    this.fetchConversations();
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

.messagerie-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.conversations-list {
  width: 100%;
  max-width: 600px;
}

.conversation-item {
  background-color: #DAD8D8;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  border-radius: 10px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.conversation-info {
  display: flex;
  flex-direction: column;
}

.conversation-info span {
  margin: 5px 0;
}

.conversation-actions {
  display: flex;
  gap: 10px;
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

.delete-btn i {
  font-size: 20px; 
  color: white;    
}

.delete-btn:hover i {
  color: #FF4500;  
}

</style>
