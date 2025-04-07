<template>
    <div>
      <h1>Mes amis</h1>
      
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "FriendsPage",
    data() {
      return {
      };
    },
    methods: {
      getUserIdFromToken() {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decodedToken = JSON.parse(atob(token.split(".")[1]));  
            return decodedToken.id;  
          } catch (error) {
            console.error("Erreur lors du décodage du token :", error);
            return null;
          }
        }
        return null;
      },
      getAuthHeaders() {
        const token = localStorage.getItem("token");
        return {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    },
    mounted() {
    },
  };
  </script>
  
  
  <style scoped>
  .amis-container {
    padding: 20px;
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

  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    background-color: #f8f9fa;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  .friend-item {
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  </style>
  