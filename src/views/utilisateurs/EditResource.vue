<template>
    <div>
      <h1>Modifier la ressource</h1>
      <form @submit.prevent="updateResource">
        <div class="form-group">
          <label for="titre">Titre:</label>
          <input type="text" v-model="resource.titre" id="titre" required />
        </div>
        <div class="form-group">
          <label for="contenu">Contenu:</label>
          <textarea v-model="resource.contenu" id="contenu"></textarea>
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiClient, { getAuthHeaders } from '../../services/api.js';
  
  export default {
    name: 'EditResource',
    props: ['id'],
    data() {
      return {
        resource: {
          titre: '',
          contenu: '',
        },
      };
    },
    created() {
      this.fetchResource();
    },
    methods: {
      async fetchResource() {
        try {
          const response = await apiClient.get(`/resources/${this.id}`);
          this.resource = response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération de la ressource:', error);
        }
      },
  
      async updateResource() {
        try {
          await apiClient.put(`/resources/update/${this.id}`, this.resource);
          this.$router.push('/admin/resources');
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la ressource:', error);
        }
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
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  label {
    font-size: 18px;
    font-weight: 500;
    color: #000000;
  }
  
  input, textarea {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #dad8d8;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  input:focus, textarea:focus {
    border-color: #0258BD;
  }
  
  textarea {
    min-height: 150px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #B0A2BA; 
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    align-self: center;
    transition: background-color 0.3s ease;
    margin-bottom: 2rem;
  }
  
  button:hover {
    background-color: #D4C4E0; 
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    h1 {
      font-size: 28px;
    }
  
    form {
      max-width: 100%;
      padding: 1rem;
    }
  
    button {
      width: 100%;
    }
  }
  
  @media (min-width: 768px) and (max-width: 1024px) {
    h1 {
      font-size: 30px;
    }
  
    form {
      max-width: 80%;
    }
  }
  
  @media (min-width: 1024px) {
    h1 {
      font-size: 32px;
    }
  
    form {
      max-width: 600px;
    }
  }
  </style>
  