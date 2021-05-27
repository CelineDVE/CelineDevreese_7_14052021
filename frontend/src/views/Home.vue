<template>
  <div class="home">
    <img alt="Groupomania logo" src="../assets/images/logo.svg">
    <Groupomania msg="Bienvenue sur notre nouveau réseau social !"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Groupomania from '@/components/Home.vue'

export default {
  name: 'Home',
  components: {
    Groupomania
  }
}
</script>
