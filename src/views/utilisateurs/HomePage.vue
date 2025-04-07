<template>
  <div>
    <h1>La plateforme d’amélioration de vos relations</h1>

    <div class="container-standard">
      <p>
        Cette plateforme a pour but de vous aider à améliorer vos relations avec
        les autres, que ce soit dans la famille, entre amis ou au travail.
      </p>
      <p>
        Ces relations jouent un rôle important dans le bien-être et la qualité
        de vie.
      </p>
      <p>
        Vous pourrez discuter, partager des informations, des outils et des
        ressources créer dans l'optique d'aider les citoyens à mieux
        communiquer, se soutenir et créer des liens plus forts entre eux.
      </p>
      <p>
        Pour découvrir (RE)Sources Relationnelles, rien de mieux que visitez le
        site web.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
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

.container-standard {
  max-width: 600px;
  margin: 2rem auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #dad8d8;
  font-size: 16px;
}
</style>
