<template>
  <div class="register-page">
    <h1>Inscription</h1>
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
      </div>
      <div class="form-group">
        <label for="mot_de_passe">Mot de passe</label>
        <input
          type="password"
          id="mot_de_passe"
          v-model="form.mot_de_passe"
          placeholder="Votre mot de passe"
          required
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
        <p v-if="confirmPasswordError" class="error-message">
          {{ confirmPasswordError }}
        </p>
      </div>
      <div class="form-group">
        <label for="role_">Rôle</label>
        <select id="role_" v-model="form.role_" required>
          <option value="utilisateur">Utilisateur</option>
          <option value="administrateur">Administrateur</option>
        </select>
      </div>
      <div class="form-group checkbox-group">
        <input
          type="checkbox"
          id="accept-cgu"
          v-model="acceptCgu"
          required
        />
        <label for="accept-cgu">
          Accepter les 
          <router-link to="/cgu">conditions générales d'utilisation</router-link>
        </label>
      </div>
      <button type="submit" :disabled="!isFormValid">S'inscrire</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
      acceptCgu: false, // État pour la checkbox des CGU
      passwordError: "",
      confirmPasswordError: "",
      errorMessage: "",
    };
  },
  computed: {
    isFormValid() {
      return (
        this.form.nom &&
        this.form.prenom &&
        this.form.email &&
        this.validatePassword(this.form.mot_de_passe) &&
        this.form.mot_de_passe === this.confirmPassword &&
        this.acceptCgu // Vérifie que les CGU sont acceptées
      );
    },
  },
  methods: {
    validatePassword(password) {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      if (!regex.test(password)) {
        this.passwordError =
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre.";
        return false;
      }
      this.passwordError = "";
      return true;
    },
    validateConfirmPassword() {
      if (this.form.mot_de_passe !== this.confirmPassword) {
        this.confirmPasswordError = "Les mots de passe ne correspondent pas.";
        return false;
      }
      this.confirmPasswordError = "";
      return true;
    },
    async register() {
  if (!this.validatePassword(this.form.mot_de_passe)) return;
  if (!this.validateConfirmPassword()) return;

  try {
    const dataToSend = {
      ...this.form,
      statut: "actif", // Valeur par défaut
    };
    const response = await axios.post("http://localhost:3000/api/utilisateurs/register", dataToSend);
    alert("Inscription réussie !");
    this.$router.push("/login"); // Redirection après inscription réussie
  } catch (error) {
    this.errorMessage =
      error.response?.data?.message || "Une erreur est survenue.";
  }
},
  },
  watch: {
    confirmPassword() {
      this.validateConfirmPassword();
    },
  },
};
</script>

<style scoped>
.register-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

label {
  margin-left: 0.5rem;
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

router-link {
  color: #007bff;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
