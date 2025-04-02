<template>
  <div class="login-page">
    <h1>Connectez-vous</h1>
    <form @submit.prevent="login">
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
        <label for="mot_de_passe">Mot de passe</label>
        <input
          type="password"
          id="mot_de_passe"
          v-model="form.mot_de_passe"
          required
          placeholder="Votre mot de passe"
          autocomplete="current-password"
        />
      </div>
      <button type="submit" class="btn">Se connecter</button>

      <div class="separator-horizontal"></div>

      <p class="redirect-message">
        Pas encore de compte ?
        <button @click="goToRegister" class="redirect-btn">
          Inscrivez-vous
        </button>
      </p>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",
  data() {
    return {
      form: {
        email: "",
        mot_de_passe: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/utilisateurs/login",
          this.form
        );
        const { utilisateur, token } = response.data;
        alert(`Bienvenue ${utilisateur.prenom}!`);
        localStorage.setItem('token', token); 
        localStorage.setItem('role', utilisateur.role_);  
        this.$router.push("/");
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Une erreur est survenue.";
      }
    },
    goToRegister() {
      this.$router.push("/register"); 
    },
  },
};
</script>

<style scoped>

.login-page {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #dad8d8;
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
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

.redirect-message {
  text-align: center;
  margin-top: 15px;
}

.redirect-btn {
  background-color: #b0a2ba;
  border: none;
  padding: 4px 10px;
  border-radius: 5px;
  font-weight: bolder;
  font-size: 12px;
}

.redirect-btn:hover {
  background-color: #d4c4e0;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 15px;
}

.separator-horizontal {
  width: 10rem;
  height: 1px;
  background-color: black;
  margin: 20px auto;
}

/* Media queries pour les écrans mobiles */
@media (max-width: 768px) {
  .login-page {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
  }
  .redirect-btn {
    font-size: 14px;
    padding: 6px 12px;
  }
}

@media (max-width: 390px) {
  .login-page {
    width: 85%;
    margin-left: 7.5%;
    margin-right: 7.5%;
  }
  h1 {
    font-size: 18px;
  }
  .btn {
    padding: 8px;
    font-size: 14px;
  }
  .form-group input {
    font-size: 14px;
  }
}
</style>
