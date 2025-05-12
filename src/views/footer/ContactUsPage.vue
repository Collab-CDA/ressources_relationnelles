<template>
  <div class="contact-page">
    <h1>Contactez-nous !</h1>
    <form @submit.prevent="sendMessage">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          placeholder="Votre email"
          autocomplete="email"
        />
      </div>
      <div class="form-group">
        <label for="titre">Titre</label>
        <input
          type="text"
          id="titre"
          v-model="form.titre"
          required
          placeholder="Titre du message"
        />
      </div>
      <div class="form-group">
        <label for="contenu">Contenu</label>
        <textarea
          id="contenu"
          v-model="form.contenu"
          required
          placeholder="Votre message"
        ></textarea>
      </div>
      <button type="submit" class="btn">Envoyer</button>
    </form>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'ContactUsPage',
  data() {
    return {
      form: {
        email: '',
        titre: '',
        contenu: '',
      },
      successMessage: '',
    };
  },
  methods: {
    sendMessage() {
      // Simulation de l'envoi du message
      this.successMessage = 'Votre message a bien été envoyé';

      // Redirection vers la page d'accueil après 3 secondes
      setTimeout(() => {
        this.$router.push('/');
      }, 3000);
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

.contact-page {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #dad8d8;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  height: 100px;
  resize: vertical;
}

button.btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #b0a2ba;
  border: none;
  border-radius: 4px;
  font-weight: bolder;
}

button.btn:hover {
  background-color: #d4c4e0;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 15px;
}

/* Responsive écrans mobiles */
@media (max-width: 768px) {
  h1 {
    font-size: 24px;
  }
  .contact-page {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    padding: 15px;
  }
  input, textarea {
    font-size: 14px;
  }
  button.btn {
    font-size: 14px;
  }
}

@media (max-width: 390px) {
  h1 {
    font-size: 18px;
  }
  .contact-page {
    width: 85%;
    margin: 3rem auto;
    padding: 10px;
  }
  input, textarea {
    font-size: 12px;
  }
  button.btn {
    font-size: 12px;
  }
}

/* Responsive tablettes */
@media (min-width: 769px) and (max-width: 1024px) {
  h1 {
    font-size: 28px;
  }
  .contact-page {
    width: 80%;
    padding: 18px;
  }
  input, textarea {
    font-size: 15px;
  }
  button.btn {
    font-size: 15px;
  }
}
</style>
