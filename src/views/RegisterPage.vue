<template>
  <div class="register-page">
    <h1>Inscrivez-vous</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input
          type="text"
          id="nom"
          v-model="form.nom"
          placeholder="Votre nom"
          required
        />
        <p v-if="errors.nom" class="error-message">{{ errors.nom }}</p>
      </div>
      <div class="form-group">
        <label for="prenom">Prénom</label>
        <input
          type="text"
          id="prenom"
          v-model="form.prenom"
          placeholder="Votre prénom"
          required
        />
        <p v-if="errors.prenom" class="error-message">{{ errors.prenom }}</p>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          placeholder="Votre email"
          required
        />
        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
      </div>
      <div class="form-group">
        <label for="mot_de_passe">Mot de passe</label>
        <input
          type="password"
          id="mot_de_passe"
          v-model="form.mot_de_passe"
          placeholder="Votre mot de passe"
          required
          @input="validatePassword"
        />
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
      </div>
      <div class="form-group">
        <label for="confirm_mot_de_passe">Confirmer le mot de passe</label>
        <input
          type="password"
          id="confirm_mot_de_passe"
          v-model="confirmPassword"
          placeholder="Confirmez votre mot de passe"
          required
        />
        <p v-if="errors.confirmPassword" class="error-message">
          {{ errors.confirmPassword }}
        </p>
      </div>
      <div class="form-group">
        <label for="role_">Rôle</label>
        <select id="role_" v-model="form.role_" required>
          <option value="utilisateur">Utilisateur</option>
          <option value="Admin">Administrateur</option>
          <option value="Super-Admin">Super administrateur</option>
        </select>
        <p v-if="errors.role" class="error-message">{{ errors.role }}</p>
      </div>
      <div class="form-group checkbox-group">
        <input type="checkbox" id="accept-cgu" v-model="acceptCgu" required />
        <label for="accept-cgu">
          Accepter les
          <router-link to="/cgu"
            >conditions générales d'utilisation</router-link
          >
        </label>
        <p v-if="errors.acceptCgu" class="error-message">
          {{ errors.acceptCgu }}
        </p>
      </div>
      <button type="submit">S'inscrire</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <div class="separator-horizontal"></div>

      <p class="redirect-message">
        Déjà inscrit ?
        <button @click="goToLogin" class="redirect-btn">Connectez-vous</button>
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      form: {
        nom: "",
        prenom: "",
        email: "",
        mot_de_passe: "",
        role_: "utilisateur",
      },
      confirmPassword: "",
      acceptCgu: false,
      passwordError: "",
      errors: {}, 
      errorMessage: "",
    };
  },
  methods: {
    validatePassword() {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      if (!this.form.mot_de_passe) {
        this.passwordError = "Le mot de passe est requis.";
      } else if (!regex.test(this.form.mot_de_passe)) {
        this.passwordError =
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.";
      } else {
        this.passwordError = "";
      }
    },
    validateConfirmPassword() {
      if (this.form.mot_de_passe !== this.confirmPassword) {
        this.errors.confirmPassword = "Les mots de passe ne correspondent pas.";
      } else {
        this.errors.confirmPassword = "";
      }
    },
    validateFields() {
      let isValid = true;
      this.errors = {};

      if (!this.form.nom) {
        this.errors.nom = "Le nom est requis.";
        isValid = false;
      }

      if (!this.form.prenom) {
        this.errors.prenom = "Le prénom est requis.";
        isValid = false;
      }

      if (!this.form.email) {
        this.errors.email = "L'email est requis.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        this.errors.email = "L'email n'est pas valide.";
        isValid = false;
      }

      this.validatePassword(); 
      const confirmPasswordError = this.validateConfirmPassword();
      if (confirmPasswordError) {
        this.errors.confirmPassword = confirmPasswordError;
        isValid = false;
      }

      if (!this.acceptCgu) {
        this.errors.acceptCgu =
          "Vous devez accepter les conditions générales d'utilisation.";
        isValid = false;
      }

      return isValid;
    },
    async register() {
      const isValid = this.validateFields();

      if (!isValid) {
        return; 
      }

      try {
        const dataToSend = {
          ...this.form,
          statut: "actif",
        };

        const response = await axios.post(
          "http://localhost:3000/api/utilisateurs/register",
          dataToSend
        );
        alert("Inscription réussie !");
        this.$router.push("/login"); 
      } catch (error) {
        console.log("Erreur de réponse du serveur:", error.response);

        if (
          error.response &&
          error.response.data &&
          error.response.data.message ===
            "Un compte existe déjà avec cet email."
        ) {
          this.errorMessage = "Un compte existe déjà avec cet email.";
        } else {
          this.errorMessage = "Une erreur est survenue.";
        }
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.register-page {
  max-width: 600px;
  margin: 50px auto;
  padding: 1rem;
  background-color: #dad8d8;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.checkbox-group {
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
}

.checkbox-group input {
  margin-right: 10px;
}

.checkbox-group label {
  margin-left: 0.5rem;
  display: inline;
  white-space: nowrap;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #b0a2ba;
  border: none;
  border-radius: 3px;
  font-weight: bolder;
  cursor: pointer;
}

.error-message {
  color: red;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.redirect-message {
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
}

.redirect-btn {
  background-color: #b0a2ba;
  border: none;
  padding: 4px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bolder;
  width: auto;
  margin-left: 5px;
}

.redirect-btn:hover {
  background-color: #d4c4e0;
}

.separator-horizontal {
  width: 10rem;
  height: 1px;
  background-color: black;
  margin: 20px auto;
}
</style>
