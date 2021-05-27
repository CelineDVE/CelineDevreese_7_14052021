<template>
  <img alt="Groupomania logo" src="./assets/logo.svg">
  <Groupomania msg="Bienvenue sur notre tout nouveau réseau social d'entreprise !"/>
</template>

<script>
import Groupomania from './components/groupomania.vue'

export default {
  name: 'App',
  components: {
    Groupomania
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
