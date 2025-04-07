<template>
  <div>
    <h1>Votre messagerie</h1>
    <p v-if="friendId">Vous pouvez envoyer un message à l'utilisateur {{ friendId }}.</p>
  </div>
</template>

<script>
export default {
  name: 'MessageriePage',
  computed: {
    friendId() {
      return this.$route.params.friendId;
    }
  }
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
</style>
