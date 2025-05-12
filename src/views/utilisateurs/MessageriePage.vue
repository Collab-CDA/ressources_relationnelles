<template>
  <div class="messagerie-page">
    <h1>Conversation avec {{ friendName }}</h1>
    <div v-if="friendId" class="messagerie-container">
      <div class="messages">
        <div
          v-for="message in messages"
          :key="message.id_message"
          :class="['message', message.id_utilisateur1 === userId ? 'sent' : 'received']"
        >
          <div class="message-header">
            <span>{{ getSenderName(message) }}</span>
            <small>{{ formatDate(message.date_envoi) }}</small>
          </div>
          <div v-html="makeLinksClickable(message.contenu_message)"></div>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="message-form">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Tapez votre message ici..."
          required
        />
        <button type="submit" class="send-btn">
          <i class="fas fa-paper-plane"></i>
          <span class="send-text">Envoyer</span>
        </button>
      </form>
    </div>
    <p v-else>Aucun utilisateur sélectionné.</p>
  </div>
</template>


<script>
import apiClient, { getAuthHeaders } from '../../services/api.js';
import DOMPurify from 'dompurify';

export default {
  name: 'MessageriePage',
  data() {
    return {
      messages: [],
      newMessage: '',
      userId: null,
      userName: '', // Prénom de l'utilisateur connecté
      friendName: '', // Prénom de l'ami
      socket: null,
    };
  },
  computed: {
    friendId() {
      return parseInt(this.$route.params.friendId);
    }
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
      return getAuthHeaders();
    },
    async fetchMessages() {
      if (this.friendId && this.userId) {
        try {
          const response = await apiClient.get(
            `/messages/${this.userId}/${this.friendId}`,
            this.getAuthHeaders()
          );

          if (response.data.length === 0) {
            console.log("Aucun message trouvé entre ces utilisateurs.");
          }

          this.messages = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des messages :", error);
        }
      }
    },
    async sendMessage() {
      if (this.newMessage.trim() && this.friendId && this.userId) {
        try {
          const response = await apiClient.post(
            `/messages`,
            {
              id_utilisateur1: this.userId,
              id_utilisateur2: this.friendId,
              contenu_message: this.newMessage,
            },
            this.getAuthHeaders()
          );
          this.messages.push(response.data);
          this.newMessage = '';
          if (this.socket) {
            this.socket.send(JSON.stringify(response.data));
          }
        } catch (error) {
          console.error("Erreur lors de l'envoi du message :", error);
          alert("Erreur lors de l'envoi du message: " + (error.response?.data?.message || error.message));
        }
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    async fetchUserName() {
      if (this.userId) {
        try {
          const response = await apiClient.get(
            `/utilisateurs/${this.userId}`,
            this.getAuthHeaders()
          );
          this.userName = response.data.prenom;
        } catch (error) {
          console.error("Erreur lors de la récupération du nom de l'utilisateur :", error);
        }
      }
    },
    async fetchFriendName() {
      if (this.friendId) {
        try {
          const response = await apiClient.get(
            `/utilisateurs/${this.friendId}`,
            this.getAuthHeaders()
          );
          this.friendName = response.data.prenom;
        } catch (error) {
          console.error("Erreur lors de la récupération du nom de l'ami :", error);
        }
      }
    },
    getSenderName(message) {
      // Si l'utilisateur connecté est l'expéditeur, retournez le prénom de l'utilisateur connecté
      // Sinon, retournez le prénom de l'ami
      return message.id_utilisateur1 === this.userId ? this.userName : this.friendName;
    },
    makeLinksClickable(message) {
      // Utilisez une expression régulière pour détecter les URL et les transformer en liens cliquables
      const urlPattern = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      const sanitizedMessage = DOMPurify.sanitize(message);
      return sanitizedMessage.replace(urlPattern, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    },
    setupWebSocket() {
      if (this.friendId && this.userId) {
        this.socket = new WebSocket(`ws://localhost:3000/messages/${this.userId}/${this.friendId}`);

        this.socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          this.messages.push(message);
        };

        this.socket.onerror = (error) => {
          console.error("Erreur WebSocket :", error);
        };

        this.socket.onclose = () => {
          console.log("Connexion WebSocket fermée.");
        };
      }
    }
  },
  mounted() {
    this.userId = this.getUserIdFromToken();
    this.fetchMessages();
    this.fetchUserName();
    this.fetchFriendName();
    this.setupWebSocket();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.close();
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

.messagerie-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.messagerie-container {
  width: 100%;
  max-width: 600px;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.messages {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  max-height: 400px;
}

.message {
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  max-width: 70%;
  word-wrap: break-word;
  position: relative;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.message.sent {
  background-color: #d1fae5;
  align-self: flex-end;
}

.message.received {
  background-color: #f1f0f0;
  align-self: flex-start;
}

.message small {
  font-size: 0.75rem;
  color: #777;
}

.message-form {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.message-form input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.send-btn {
  padding: 10px 20px;
  background-color: #0258bd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-btn:hover {
  background-color: #014c8c;
}

.send-btn i {
  margin-right: 5px;
}

@media (max-width: 768px) {
  .send-text {
    display: none;
  }

  .send-btn {
    padding: 10px;
  }
}
</style>
