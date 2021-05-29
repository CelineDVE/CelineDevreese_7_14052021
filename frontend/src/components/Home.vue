<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Nous vous rappelons qu'il s'agit d'un réseau social professionnel, nous vous demandons donc d'être respectueux dans vos propos. 
    </p>
    <p>N'hésitez pas à contacter le service informatique en cas de soucis concernant l'utilisation du site.</p>
    <p>
      Vous devez être inscrit pour utiliser les services de ce site, cela se passe dans Inscription, ci dessus.
    </p>    
  </div>
</template>

<script>
export default {
  name: 'Groupomania',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .hello p {
    font-size: 1.3rem;
    margin: 5rem;
    text-align: justify;
  }

</style>
