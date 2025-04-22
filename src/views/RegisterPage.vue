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
        role_: "utilisateur",  // Le rôle est défini automatiquement comme "utilisateur"
      },
      confirmPassword: "",
      acceptCgu: false,
      passwordError: "",
      errors: {},
      errorMessage: "",
    };
  },
  methods: {
// Validation du mot de passe avec une regex
     validatePassword() {
      // La regex utilisée vérifie que le mot de passe contient :
      // - Au moins une lettre minuscule (?=.*[a-z])
      // - Au moins une lettre majuscule (?=.*[A-Z])
      // - Au moins un chiffre (?=.*\d)
      // - Au moins 8 caractères au total ([A-Za-z\d@$!%*?&]{8,})
      // - Il peut inclure des caractères spéciaux (@$!%*?&)
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
// Validation de la confirmation du mot de passe
    validateConfirmPassword() {
      if (this.form.mot_de_passe !== this.confirmPassword) {
        this.errors.confirmPassword = "Les mots de passe ne correspondent pas.";
      } else {
        this.errors.confirmPassword = "";
      }
    },
// Validation globale des champs du formulaire
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

  // Vérification de l'email avec une regex
      // La regex utilisée  vérifie que l'email contient :
      // - Au moins un caractère hors espace avant et après le '@' (\S+@\S+)
      // - Au moins un point après le '@' (\.\S+)
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
// Méthode d'inscription
    async register() {
        // Appel de la méthode pour vérifier si tous les champs du formulaire sont valides
      const isValid = this.validateFields();
      // Si les champs ne sont pas valides, on arrête l'exécution de la fonction
      if (!isValid) {
        return;
      }
      try {
        // Préparation des données à envoyer au serveur
        const dataToSend = {
          // Utilisaton de l'opérateur de décomposition (spread operator) pour copier les données du formulaire
          ...this.form,
          statut: "actif",
        };
        // Envoi des données au serveur via la requête à l'URL spécifiée
        const response = await axios.post(
          "http://192.168.243.106:3000/api/utilisateurs/register",
          dataToSend
        );
        // Si la requête réussit, on affiche une alerte pour informer l'utilisateur et on redirige vers la connexion
        alert("Inscription réussie !");
        this.$router.push("/login");
      } catch (error) {
        // Si une erreur se produit lors de la requête, on entre dans le catch pour obtenir l'erreur et l'afficher
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
    // Redirection vers la page de connexion
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

/* Responsive écrans mobiles */
@media (max-width: 768px) {
  .register-page {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
  }
  .redirect-btn {
    font-size: 14px;
    padding: 6px 12px;
  }
  .checkbox-group {
    flex-direction: column;
    align-items: flex-start;
  }
  .checkbox-group label {
    font-size: 14px;
  }
}

@media (max-width: 390px) {
  .register-page {
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
  .checkbox-group {
    flex-direction: column;
    align-items: flex-start;
  }
  .form-group input {
    font-size: 14px;
  }
  .checkbox-group label {
    font-size: 12px;
  }
}

/* Responsive tablettes */
@media (min-width: 769px) and (max-width: 1024px) {
  .register-page {
    width: 80%;
  }
  .redirect-btn {
    font-size: 14px;
    padding: 6px 12px;
  }

  .checkbox-group label {
    font-size: 14px;
  }
}
</style>
