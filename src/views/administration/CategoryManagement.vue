<template>
  <div>
    <h1 class="title-container">
      Gestion des catégories
      <button class="add-category-button" @click="openModal">
        Ajouter une catégorie
      </button>
    </h1>

    <div class="main-container">
      <div class="resource-list">
        <h3>Liste des catégories</h3>
        <ul>
          <li v-for="category in categories" :key="category.id_categorie">
            <div class="resource-item">
              <p>{{ category.libelle_categorie }}</p>
              <div class="button-group">
                <button @click="editCategory(category)">Modifier</button>
                <button class="delete" @click="deleteCategory(category.id_categorie)">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
        <p v-if="categories.length === 0">Aucune catégorie trouvée</p>
      </div>
    </div>

    <!-- Modal création/édition catégorie -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <h4 v-if="isEditing">Modifier la catégorie</h4>
        <h4 v-else>Ajouter une catégorie</h4>
        <form @submit.prevent="submitCategory">
          <div class="form-group">
            <label for="libelle_categorie">Nom de la catégorie :</label>
            <input
              type="text"
              id="libelle_categorie"
              v-model="categoryForm.libelle_categorie"
              required
            />
          </div>
          <div class="button-container">
            <button type="submit" class="btn">
              {{ isEditing ? "Modifier" : "Ajouter" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient, { getAuthHeaders } from "@/services/api";

export default {
  name: "CategoryManagement",
  data() {
    return {
      categories: [],
      showModal: false,
      isEditing: false,
      categoryForm: {
        libelle_categorie: "",
      },
      editingCategoryId: null,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await apiClient.get("/categories", getAuthHeaders());
        this.categories = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error.response?.data || error.message);
      }
    },
    openModal() {
      this.resetForm();
      this.isEditing = false;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.resetForm();
    },
    resetForm() {
      this.categoryForm = {
        libelle_categorie: "",
      };
      this.editingCategoryId = null;
    },
    async submitCategory() {
      try {
        if (this.isEditing && this.editingCategoryId) {
          await apiClient.put(
            `/categories/${this.editingCategoryId}`,
            this.categoryForm,
            getAuthHeaders()
          );
        } else {
          await apiClient.post("/categories", this.categoryForm, getAuthHeaders());
        }
        this.closeModal();
        this.fetchCategories();
      } catch (error) {
        console.error("Erreur lors de la soumission du formulaire :", error.response?.data || error.message);
      }
    },
    editCategory(category) {
      this.categoryForm = {
        libelle_categorie: category.libelle_categorie,
      };
      this.editingCategoryId = category.id_categorie;
      this.isEditing = true;
      this.showModal = true;
    },
    async deleteCategory(categoryId) {
      const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?");
      if (!confirmation) return;
      try {
        await apiClient.delete(`/categories/${categoryId}`, getAuthHeaders());
        this.fetchCategories();
      } catch (error) {
        console.error("Erreur lors de la suppression de la catégorie :", error.response?.data || error.message);
      }
    },
    // Using imported getAuthHeaders from api.js instead
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
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  color: #000000;
}

h1 {
  font-size: 32px;
  font-weight: bold;
  color: #0258bd;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.add-category-button {
  margin-left: 2rem;
  font-size: 1.2rem;
}

.main-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
}

.resource-list {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.resource-list ul {
  list-style-type: none;
  padding: 0;
}

.resource-list ul li {
  margin-bottom: 1rem;
}

.resource-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 15px;
  background-color: #b0a2ba;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d4c4e0;
}

button.delete {
  background-color: #d0021b;
  width: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

button.delete:hover {
  background-color: #d76c61;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #dad8d8;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 5px;
  width: 100%;
  max-width: 500px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

/* Responsive écrans mobiles */
@media screen and (max-width: 768px) {
  h1 {
    font-size: 24px;
    flex-direction: column;
    text-align: center;
    margin: 1.5rem 0;
  }

  .title-container {
    flex-direction: column;
    gap: 1rem;
  }

  .add-category-button {
    margin-left: 0;
    font-size: 16px;
    padding: 8px 12px;
    width: 70%;
  }

  .main-container {
    padding: 0 1rem;
  }

  .resource-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .button-group {
    width: 100%;
    justify-content: space-between;
  }

  button {
    font-size: 14px;
    padding: 8px 10px;
  }

  button.delete {
    width: auto;
  }

  .modal-content {
    width: 90%;
    padding: 1rem;
  }

  .form-group input {
    font-size: 14px;
    padding: 6px;
  }

  .btn {
    font-size: 16px;
    width: 100%;
    padding: 10px;
  }

  .button-container {
    flex-direction: column;
    gap: 10px;
  }
}

/* -------------------- Responsive tablettes (768px à 1024px) -------------------- */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  h1 {
    font-size: 28px;
  }

  .add-category-button {
    font-size: 18px;
    padding: 10px 16px;
  }

  .main-container {
    width: 95%;
    padding: 0 1rem;
  }

  button {
    font-size: 15px;
    padding: 10px 12px;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .form-group input {
    font-size: 15px;
    padding: 7px;
  }

  .btn {
    font-size: 16px;
    padding: 10px 16px;
  }

  .button-container {
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
  }
}

</style>
