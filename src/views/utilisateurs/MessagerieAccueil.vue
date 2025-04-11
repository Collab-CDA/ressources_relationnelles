<template>
    <div class="messagerie-page">
      <h1>Accueil messagerie</h1>

    </div>
  </template>
  
  <script>
  
  export default {
    name: 'MessagerieAccueil',
    data() {
      return {
       
      };
    },
    computed: {
      
      },
    methods: {
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
  
  .messagerie-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .messagerie-container {
    width: 100%;
    max-width: 600px;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .messages {
    flex-grow: 1;
    padding: 20px;
    overflow-y: auto;
    max-height: 400px;
  }
  
  .message {
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    max-width: 70%;
    word-wrap: break-word;
    position: relative;
  }
  
  .message-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .message.sent {
    background-color: #d1fae5;
    align-self: flex-end;
  }
  
  .message.received {
    background-color: #f1f0f0;
    align-self: flex-start;
  }
  
  .message small {
    font-size: 0.75rem;
    color: #777;
  }
  
  .message-form {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
  }
  
  .message-form input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }
  
  .send-btn {
    padding: 10px 20px;
    background-color: #0258bd;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .send-btn:hover {
    background-color: #014c8c;
  }
  </style>
  