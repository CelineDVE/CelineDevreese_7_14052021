<template>
  <div class="home">
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

<style scoped>

.home {
  margin-top: 12rem;
}

</style>
