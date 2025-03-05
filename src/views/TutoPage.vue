<template>
  <div class="tutorial-container">
    <h1 class="main-title">Tutoriel de la plateforme</h1>
    <p class="intro-text">On vous explique tout !</p>

    <!-- Introduction -->
    <section class="tutorial-section">
      <h2 class="section-title">Bienvenue sur (RE)Sources Relationnelles !</h2>
      <p class="section-text">Découvrez comment utiliser notre plateforme pour créer, renforcer et enrichir vos relations.</p>
      <img src="../assets/images/bienvenue1.png" alt="Illustration de bienvenue" class="section-image" />
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
      <img src="../assets/images/objectifs.png" alt="Illustration des objectifs" class="section-image" />
    </section>

    <!-- Fonctionnalités principales -->
    <section class="tutorial-section">
      <h2 class="section-title">Fonctionnalités Principales</h2>

      <!-- Accès sans compte -->
      <div class="feature">
        <h3 class="feature-title">Accès aux ressources</h3>
        <p class="feature-text">
          <strong>Accessible sans compte :</strong> Listez, filtrez et affichez les ressources publiques disponibles.
        </p>
      </div>

      <!-- Accès avec compte -->
      <div class="feature">
        <h3 class="feature-title">Création de ressources</h3>
        <p class="feature-text">
          <strong>Nécessite un compte :</strong> Créez vos propres ressources, les partager.
        </p>
      </div>

      <div class="feature">
        <h3 class="feature-title">Échanges</h3>
        <p class="feature-text">
          <strong>Nécessite un compte :</strong> Commentez les ressources, échanger avec d'autres utilisateurs.
        </p>
      </div>
    </section>

    <!-- Suivi de progression -->
    <section class="tutorial-section">
      <h2 class="section-title">Suivi de Progression</h2>
      <p class="section-text">
        <strong>Nécessite un compte :</strong> Gérez vos ressources favorites, exploitées et mises de côté.
      </p>
    </section>

    <!-- Aide et support -->
    <section class="tutorial-section">
      <h2 class="section-title">Besoin d'aide ?</h2>
      <p class="section-text">
        Consultez notre FAQs.
      </p>
      <img src="../assets/images/faqs.png" alt="Illustration de l'aide et support" class="section-image2" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'TutoPage',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

.tutorial-container {
  font-family: 'Roboto', sans-serif;
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #FFFFFF;
  color: #000000;
}

.main-title {
  font-size: 28px;
  font-weight: bold;
  color: #0258BD;
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
}

@media (max-width: 768px) {
  .main-title {
    font-size: 24px;
  }

  .section-title {
    font-size: 20px;
  }

  .section-text, .feature-text {
    font-size: 14px;
  }
}
</style>
