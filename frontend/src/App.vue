<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/signup">Inscription</router-link> |
      <router-link to="/login">Connexion</router-link>
    </div>
    <router-view/> 
    <footer>
      <p> {{ copyright }} </p>
    </footer>  
  </div>
</template>

<script>
  import { mapGetters, mapState } from "vuex"

  export default {
    computed: {
      ...mapGetters({
        copyright : "copyright"
      }),
      ...mapState({
        ourName : "Groupomania"
      })
    }
  }
</script>

<style>

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    margin: 2rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #FD2D02;
  }

  body {
    background: url('./assets/images/logo.svg') no-repeat center;
    background-size: 500px;
    height: 100vh;
  }

  footer {
    position: fixed;
    bottom: 0;
  }

</style>
