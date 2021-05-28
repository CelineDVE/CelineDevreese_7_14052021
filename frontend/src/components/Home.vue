<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Nous vous invitons à vous inscrire, si ce n'est pas encore le cas.
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
    margin: 38px 0 70px 0;
  }

</style>
