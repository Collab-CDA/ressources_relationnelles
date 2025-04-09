<template>
  <div class="page-container">
    <img src="../../assets/images/filtreTuto.jpg" alt="Illustration filtre" class="image-left" />
    <img src="../../assets/images/objectifs.png" alt="Illustration des objectifs" class="image-left-objectifs" />
    <div class="tutorial-container">
      <h1>Tutoriel de la plateforme</h1>
      <p class="intro-text">On vous explique tout !</p>

      <!-- Introduction -->
      <section class="tutorial-section">
        <h2 class="section-title">Bienvenue sur (RE)Sources Relationnelles !</h2>
        <p class="section-text">Découvrez comment utiliser notre plateforme pour créer, renforcer et enrichir vos relations.</p>
      </section>

      <!-- Objectifs de la plateforme -->
      <section class="tutorial-section">
        <h2 class="section-title">Nos Objectifs</h2>
        <ul class="objectives-list">
          <li>Améliorer la qualité des relations interpersonnelles avec des ressources dédiées.</li>
          <li>Promouvoir la cohésion sociale à travers des interactions communautaires.</li>
          <li>Soutenir le développement personnel des utilisateurs pour atteindre leurs objectifs.</li>
          <li>Renforcer les liens familiaux grâce à des activités et conseils adaptés.</li>
          <li>Encourager une meilleure santé mentale et émotionnelle avec des ressources bien-être.</li>
          <li>Adapter l'application à tous les utilisateurs, indépendamment de leur âge ou situation sociale.</li>
          <li>Faciliter l'accès à des ressources de qualité pour tous les citoyens.</li>
          <li>Favoriser l'engagement communautaire en permettant aux utilisateurs de partager leurs propres ressources.</li>
        </ul>
      </section>

      <!-- Fonctionnalités principales -->
      <section class="tutorial-section">
        <h2 class="section-title">Fonctionnalités Principales</h2>

        <!-- Accès aux ressources -->
        <div class="feature">
          <h3 class="feature-title">Accès aux ressources</h3>
          <p class="feature-text">
            <strong>Accessible sans compte :</strong> Listez, filtrez et affichez les ressources publiques disponibles.
          </p>
        </div>

        <!-- Création de ressources -->
        <div class="feature">
          <h3 class="feature-title">Création de ressources</h3>
          <p class="feature-text">
            <strong>Nécessite un compte :</strong> Créez vos propres ressources, partagez-les avec la communauté ou gardez-les privées.
          </p>
        </div>

        <!-- Échanges -->
        <div class="feature">
          <h3 class="feature-title">Échanges</h3>
          <p class="feature-text">
            <strong>Nécessite un compte :</strong> Commentez les ressources, échangez avec d'autres utilisateurs et participez à des discussions modérées.
          </p>
        </div>
      </section>

      <!-- Navigation dans la plateforme -->
      <section class="tutorial-section">
        <h2 class="section-title">Naviguer dans la plateforme après la création d'un compte</h2>
        <p class="section-text">
          <strong>Consulter une ressource restreinte :</strong> Connectez-vous, puis accédez à la section "Ressources". Vous aurez alors à présent les ressources complètes comprenant les publiques et les restreintes.
        </p>

        <p class="section-text">
          <strong>Ajouter une ressource aux favoris :</strong> Sur la page d'une ressource, cliquez sur l'icône en forme de cœur pour l'ajouter à vos favoris.
        </p>

        <p class="section-text">
          <strong>Démarrer une activité :</strong> Allez dans la section "Activités" et sélectionnez celle que vous souhaitez démarrer. Cliquez sur "Commencer" pour lancer l'activité.
        </p>
      </section>

      <!-- Suivi de progression -->
      <section class="tutorial-section">
        <h2 class="section-title">Suivi de Progression</h2>
        <p class="section-text">
          <strong>Nécessite un compte :</strong> Gérez vos ressources favorites, exploitées et mises de côté. Suivez votre progression via le tableau de bord.
        </p>
      </section>

      <!-- Aide et support -->
      <section class="tutorial-section">
        <h2 class="section-title">Besoin d'aide ?</h2>
        <p class="section-text">
          Consultez notre FAQs en cliquant ci-dessous.
        </p>
        <img src="../../assets/images/faqs.png" alt="Illustration de l'aide et support" class="section-image2" @click="redirectToFaqs" />
      </section>
    </div>
    <img src="../../assets/images/favorisTuto.jpg" alt="Illustration favoris" class="image-right" />
    <img src="../../assets/images/bienvenue1.png" alt="Illustration de bienvenue" class="image-right-bienvenue" />
  </div>
</template>

<script>
export default {
  name: 'TutoPage',
  methods: {
    redirectToFaqs() {
      this.$router.push({ name: 'FaqsPage' });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.page-container {
  position: relative;
  max-width: 1200px;
  margin: auto;
}

.tutorial-container {
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #FFFFFF;
  color: #000000;
  position: relative;
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

.intro-text {
  font-size: 16px;
  margin-bottom: 20px;
}

.tutorial-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  color: #0258BD;
}

.section-text, .feature-text {
  font-size: 16px;
  margin-bottom: 10px;
}

.objectives-list {
  list-style-type: disc;
  margin-left: 20px;
}

.feature {
  margin-bottom: 20px;
}

.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: #B0A2BA;
}

.section-image {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 20px;
}

.section-image2 {
  max-width: 70%;
  border-radius: 8px;
  margin-top: 20px;
  cursor: pointer; 
}

.image-left-objectifs {
  position: absolute;
  max-width: 400px;
  border-radius: 8px;
  left: -230px;
  top: 215px;
  transform: rotate(-5deg);
}

.image-right-bienvenue {
  position: absolute;
  max-width: 550px;
  border-radius: 8px;
  right: -250px;
  top: 100px;
  transform: rotate(25deg);
}

.image-left {
  position: absolute;
  max-width: 400px;
  border-radius: 8px;
  left: -180px;
  top: 550px;
  transform: rotate(-5deg);
}

.image-right {
  position: absolute;
  max-width: 300px;
  border-radius: 8px;
  right: -160px;
  top: 850px;
  transform: rotate(5deg);
}

/* Responsive */
@media (max-width: 1200px) {
  .image-left, .image-right, .image-left-objectifs, .image-right-bienvenue {
    display: none;
  }
}
</style>
