<template>
  <div class="dashboard-container">
    <h1>Tableau de bord - Statistiques</h1>
    
    <div class="filters">
      <h2>Choisissez les indicateurs à afficher</h2>
      <div class="checkbox-group">
        <label v-for="metric in availableMetrics" :key="metric.name">
          <input type="checkbox" :value="metric.name" v-model="selectedMetrics" />
          {{ metric.name }}
        </label>
      </div>
      <div class="filter-buttons">
        <button @click="selectAll" class="btn btn-select">Tout sélectionner</button>
        <button @click="saveSelection" class="btn btn-filter">Sauvegarder ma sélection</button>
        <button @click="fetchDashboard" class="btn btn-refresh">Actualiser</button>
        <button @click="exportFiltered" class="btn btn-export">Exporter filtré</button>
        <button @click="exportAll" class="btn btn-export">Exporter tout</button>
      </div>
    </div>
    
     <!-- Cards des indicateurs sélectionnés avec les valeurs récupérées -->
    <div class="cards-container">
      <div class="card" v-for="metric in displayedMetrics" :key="metric.name">
        <h3>{{ metric.name }}</h3>
        <p class="card-value">{{ metric.value }}</p>
      </div>
    </div>
    
    <div class="chart-container" v-if="displayedMetrics.length">
      <h2>Graphique des indicateurs sélectionnés</h2>
      <canvas id="metricsChart"></canvas>
    </div>
    
    <div v-if="loading" class="loading">Chargement des données...</div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
// Bibliothèque javascript pour créer des graphiques interactifs
import Chart from 'chart.js/auto'

export default {
  name: 'DashboardStatistics',
  setup() {
    const dashboardData = ref({
      countUtilisateurs: 0,
      countTypesRessource: 0,
      countRessources: 0,
      countRelations: 0,
      countCommentaires: 0,
      countCategoriesRessources: 0
    })
    const loading = ref(false)
    let chartInstance = null
    const availableMetrics = [
      { name: 'Utilisateurs', key: 'countUtilisateurs' },
      { name: 'Types de ressources', key: 'countTypesRessource' },
      { name: 'Ressources', key: 'countRessources' },
      { name: 'Relations', key: 'countRelations' },
      { name: 'Commentaires', key: 'countCommentaires' },
      { name: 'Catégories de ressources', key: 'countCategoriesRessources' }
    ]
    // Indicateurs sélectionnés, récupérés depuis le localStorage ou tous sélectionnés par défaut
    const saved = localStorage.getItem('selectedMetrics')
    const selectedMetrics = ref(saved ? JSON.parse(saved) : availableMetrics.map(m => m.name))
    // Indicateurs affichés, filtrés en fonction de la sélection
    const displayedMetrics = computed(() => {
      return availableMetrics
        .filter(m => selectedMetrics.value.includes(m.name))
        .map(m => ({
          name: m.name,
          value: dashboardData.value[m.key]
        }))
    })
  
    // Méthode pour récupérer les données
    const fetchDashboard = async () => {
      try {
        loading.value = true
        const token = localStorage.getItem('token')
        const response = await axios.get('http://10.176.131.156:3000/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        })
        dashboardData.value = response.data
        renderChart()
      } catch (error) {
        console.error('Erreur lors de la récupération du tableau de bord:', error)
      } finally {
        loading.value = false
      }
    }

    // Méthode pour exporter les indicateurs filtrés en CSV
    const exportFiltered = () => {
      let csv = 'Statistique,Valeur\n'
      displayedMetrics.value.forEach(metric => {
        csv += `${metric.name},${metric.value}\n`
      })
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'dashboard_statistics_filtered.csv')
      document.body.appendChild(link)
      link.click()
    }

    // Méthode pour exporter tous les indicateurs en CSV
    const exportAll = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('http://10.176.131.156:3000/api/dashboard/export', {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob'
        })
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'dashboard_statistics_all.csv')
        document.body.appendChild(link)
        link.click()
      } catch (error) {
        console.error('Erreur lors de l’export des statistiques:', error)
      }
    }

    // Méthode pour sauvegarder la sélection des indicateurs dans le localStorage
    const saveSelection = () => {
      localStorage.setItem('selectedMetrics', JSON.stringify(selectedMetrics.value))
      renderChart()
    }

    // Méthode pour sélectionner tous les indicateurs
    const selectAll = () => {
      selectedMetrics.value = availableMetrics.map(m => m.name)
      saveSelection()
    }

    // Méthode pour rendre le graphique des indicateurs sélectionnés
    const renderChart = () => {
      const labels = displayedMetrics.value.map(item => item.name)
      const data = displayedMetrics.value.map(item => item.value)
      const ctx = document.getElementById('metricsChart')?.getContext('2d')
      if (!ctx) return
      if (chartInstance) chartInstance.destroy()
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Valeur',
            data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true } }
        }
      })
    }
    // Appel de la méthode pour récupérer les données au montage du composant
    onMounted(() => {
      fetchDashboard()
    })
    return { 
      dashboardData, 
      availableMetrics, 
      selectedMetrics, 
      displayedMetrics, 
      loading, 
      fetchDashboard, 
      exportFiltered, 
      exportAll, 
      saveSelection,
      selectAll
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Roboto', sans-serif;
  color: #000000;
  background-color: #FFFFFF;
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

.filters {
  border: 1px solid #dad8d8;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  background-color: #80ADA0;
}

.filters h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-align: center;
  color: #000000;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.checkbox-group label {
  font-size: 16px;
  font-weight: normal;
  cursor: pointer;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-filter,
.btn-select,
.btn-refresh,
.btn-export {
  background-color: #B0A2BA;
  color: #FFFFFF;
}

.btn-filter:hover,
.btn-select:hover,
.btn-refresh:hover,
.btn-export:hover {
  background-color: #D4C4E0;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: #FFFFFF;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
}

.card h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  color: #555;
}

.card-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.chart-container {
  height: 500px;
  margin: 0 auto 5rem;
  max-width: 800px;
}

.chart-container h2 {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
  color: #0258BD;
}

.metric-list {
  text-align: center;
  margin-bottom: 2rem;
}

.metric-list ul {
  list-style: none;
  padding: 0;
}

.metric-list li {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.loading {
  text-align: center;
  font-style: italic;
  margin-top: 1rem;
  color: #000000;
}

/* Responsive écrans mobiles */
@media screen and (max-width: 768px) {
  h1 {
    font-size: 24px;
    margin: 1rem 0;
  }

  .filters {
    padding: 1rem 0.5rem;
  }

  .filters h2 {
    font-size: 18px;
  }

  .checkbox-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .checkbox-group label {
    font-size: 14px;
  }

  .filter-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn {
    width: 100%;
    font-size: 16px;
    padding: 0.75rem;
  }

  .cards-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .card h3 {
    font-size: 1rem;
  }

  .card-value {
    font-size: 1.2rem;
  }

  .chart-container {
    height: 300px;
    padding: 0 1rem;
  }

  .chart-container h2 {
    font-size: 18px;
  }

  .dashboard-container {
    padding: 1rem 0.5rem;
  }
}

/* Responsive tablettes */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  h1 {
    font-size: 28px;
    margin: 1.5rem 0;
  }

  .filters {
    padding: 1rem;
  }

  .filters h2 {
    font-size: 19px;
  }

  .checkbox-group {
    gap: 0.75rem;
  }

  .checkbox-group label {
    font-size: 15px;
  }

  .filter-buttons {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }

  .btn {
    font-size: 17px;
    padding: 0.75rem 1rem;
  }

  .cards-container {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1.25rem;
  }

  .card h3 {
    font-size: 1.05rem;
  }

  .card-value {
    font-size: 1.4rem;
  }

  .chart-container {
    height: 400px;
    padding: 0 2rem;
  }

  .chart-container h2 {
    font-size: 19px;
  }

  .dashboard-container {
    padding: 1rem 1.5rem;
  }
}

</style>
