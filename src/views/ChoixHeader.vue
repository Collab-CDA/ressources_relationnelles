<template>
    <div class="choix-header">
      <h1>Choisissez votre interface</h1>
      <button @click="choisirHeader('Header2')">Interface Utilisateur</button>
      <button @click="choisirHeader('HeaderAdmin')">Interface Admin</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "ChoixHeader",
    methods: {
      choisirHeader(header) {
        localStorage.setItem('headerChoisi', header);
        this.$router.push("/");
      }
    }
  };
  </script>
  
  <style scoped>
  .choix-header {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #dad8d8;
    text-align: center;
  }
  
  h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 32px;
    font-weight: bold;
    color: #0258bd;
    margin-bottom: 20px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #b0a2ba;
    border: none;
    border-radius: 4px;
    font-weight: bolder;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #d4c4e0;
  }
  
  /* Media queries pour les écrans mobiles */
  @media (max-width: 768px) {
    .choix-header {
      width: 90%;
      margin-left: 5%;
      margin-right: 5%;
    }
  }
  
  @media (max-width: 390px) {
    .choix-header {
      width: 85%;
      margin-left: 7.5%;
      margin-right: 7.5%;
    }
    h1 {
      font-size: 18px;
    }
    button {
      padding: 8px;
      font-size: 14px;
    }
  }
  </style>
  