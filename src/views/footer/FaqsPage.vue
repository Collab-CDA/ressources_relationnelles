<template>
  <div class="faq-container">
    <h1>Foire aux questions</h1>

    <!-- Champ de recherche avec icône de loupe -->
    <div class="search-container">
      <span class="search-icon">&#128269;</span>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher une question..."
        class="search-input"
      />
    </div>

    <!-- Liste des questions et réponses filtrées -->
    <div
      v-for="(item, index) in filteredFaqItems"
      :key="index"
      class="faq-item"
    >
      <h2 class="faq-question">{{ item.question }}</h2>
      <p class="faq-answer">{{ item.answer }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FaqsPage',
  data() {
    return {
      searchQuery: '',
      faqItems: [
        {
          question: 'Quel est le principal enjeu du projet (RE)Sources Relationnelles ?',
          answer: 'Le principal enjeu est de proposer des ressources et outils pour créer, renforcer et enrichir les relations des citoyens, en s\'appuyant sur la pyramide de Maslow pour améliorer la qualité de vie.',
        },
        {
          question: 'Pourquoi la qualité des relations est-elle importante ?',
          answer: 'La qualité des relations influence directement notre bien-être, notre développement personnel et notre recherche du bonheur.',
        },
        {
          question: 'Quels types de relations sont concernés par le projet ?',
          answer: 'Le projet s\'intéresse à divers types de relations : parents, couple, famille, amis, collègues, etc.',
        },
        {
          question: 'Comment le projet (RE)Sources Relationnelles s\'inspire-t-il de la pyramide de Maslow ?',
          answer: 'Le projet s\'inspire de la pyramide de Maslow en proposant des ressources qui répondent aux besoins fondamentaux des individus, allant des besoins physiologiques à ceux d\'accomplissement.',
        },
        {
          question: 'Quels sont les objectifs principaux de la plateforme (RE)Sources Relationnelles ?',
          answer: 'Les objectifs incluent la mise à disposition de ressources variées, la gestion d\'un catalogue de ressources, la création et le partage de ressources, ainsi que l\'édition de statistiques.',
        },
        {
          question: 'Pourquoi est-il important de permettre la création et le partage de ressources ?',
          answer: 'Cela permet aux utilisateurs de contribuer activement à la plateforme et d\'enrichir le contenu disponible pour tous.',
        },
        {
          question: 'Pourquoi est-il important d\'avoir un référentiel dynamique de ressources ?',
          answer: 'Un référentiel dynamique permet de catégoriser et de structurer les ressources pour une recherche et une consultation plus efficaces.',
        },
        {
          question: 'Quelles sont les fonctionnalités principales pour les citoyens ?',
          answer: 'Les citoyens peuvent accéder aux ressources, créer un compte, créer et partager des ressources, ajouter des commentaires, et suivre leur progression.',
        },
        {
          question: 'Comment les ressources sont-elles gérées en back office ?',
          answer: 'Les administrateurs peuvent lister, filtrer, ajouter, éditer, supprimer ou suspendre des ressources, ainsi que gérer les catégories de ressources.',
        },
        {
          question: 'Comment fonctionne la modération des commentaires ?',
          answer: 'Les modérateurs peuvent supprimer les commentaires sur une publication pour garantir un espace d\'échange respectueux et constructif.',
        },
        {
          question: 'Quelles sont les fonctionnalités de suivi de progression ?',
          answer: 'Les utilisateurs peuvent ajouter ou retirer des ressources de leurs favoris, indiquer des ressources comme exploitées, et afficher un tableau de bord de progression.',
        },
        {
          question: 'Quels types de ressources sont disponibles sur la plateforme ?',
          answer: 'Les ressources peuvent inclure des articles, des vidéos, des activités, des jeux, etc., couvrant divers types de relations.',
        },
        {
          question: 'Comment les ressources sont-elles catégorisées ?',
          answer: 'Les ressources sont catégorisées par type de relation concernée, type de ressource, et d\'autres critères pertinents pour faciliter la recherche.',
        },
        {
          question: 'Quels sont les avantages de l\'espace d\'échange modéré ?',
          answer: 'L\'espace d\'échange modéré garantit des discussions respectueuses et constructives, en évitant les contenus inappropriés.',
        },
        {
          question: 'Comment puis-je suivre ma progression sur la plateforme ?',
          answer: 'Vous pouvez suivre votre progression via un tableau de bord qui affiche vos ressources favorites, exploitées, et mises de côté.',
        },
        {
          question: 'Pourquoi les ressources sont-elles validées avant publication ?',
          answer: 'Les modérateurs valident les ressources avant leur publication pour garantir leur qualité et leur pertinence.',
        },
        {
          question: 'Puis-je filtrer les ressources par type de relation ?',
          answer: 'Oui, les ressources peuvent être filtrées par type de relation, catégorie, et d\'autres critères pour une recherche plus précise.',
        },
        {
          question: 'Comment puis-je contribuer à la plateforme ?',
          answer: 'Vous pouvez contribuer en créant et partageant des ressources, en ajoutant des commentaires, et en participant aux échanges.',
        },
        {
          question: 'Comment puis-je signaler un problème avec une ressource ?',
          answer: 'Vous pouvez signaler un problème en nous envoyant un message par notre formulaire de contact.',
        },
        {
          question: 'Quels sont les avantages de créer un compte sur la plateforme ?',
          answer: 'Créer un compte permet d\'accéder à des fonctionnalités avancées, de créer et partager des ressources, et de suivre votre progression.',
        },
        {
          question: 'Comment la plateforme garantit-elle la confidentialité des données ?',
          answer: 'La plateforme met en place des mesures de sécurité pour protéger les données des utilisateurs et garantir leur confidentialité.',
        },
      ],
    };
  },
  computed: {
    filteredFaqItems() {
      return this.faqItems.filter(item =>
        item.question.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
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

.faq-container {
  padding: 30px;
}

.search-container {
  display: flex;
  align-items: center;
  width: 50%;
  margin: 0 auto 20px auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.search-icon {
  padding: 10px;
  background-color: #f0f0f0;
  border-right: 1px solid #ccc;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
}

.faq-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #dad8d8;
  padding-bottom: 20px;
}

.faq-question {
  font-size: 20px;
  font-weight: bold;
  color: #0258bd;
  margin-bottom: 10px;
}

.faq-answer {
  font-size: 16px;
  color: #000000;
}
</style>
