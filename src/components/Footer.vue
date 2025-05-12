<template>
    <footer>
      <ul class="nav justify-content-center border-bottom pb-2 mb-2">
        <li class="nav-item"><a href="/" class="nav-link px-2 text-light">Accueil</a></li>
        <li class="nav-item"><a href="/cgu" class="nav-link px-2 text-light">Mentions légales et CGU</a></li>
        <li class="nav-item"><a href="/personaldata" class="nav-link px-2 text-light">Données personnelles</a></li>
        <li class="nav-item"><a href="/faqs" class="nav-link px-2 text-light">FAQs</a></li>
        <li class="nav-item"><a href="/contactus" class="nav-link px-2 text-light">Nous contacter</a></li>
      </ul>
      <p class="text-center text-light">© 2025 Hélène Poirier-Halley - Enzo Radici</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
    data() {
      return {};
    },
  };
  </script>
  
  <style scoped>
  footer {
    background-color: #0258bd;
    width: 100%;
  }
  </style>
  