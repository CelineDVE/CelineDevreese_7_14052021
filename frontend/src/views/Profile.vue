<template>
  <div class="card">
    <h1 class="card__title">Espace Perso</h1>
    <p class="card__subtitle">Voilà donc qui je suis...</p>
    <div class="form-row">
      <button class="button">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Profile',
    mounted: function(){
        console.log(this.$store.state.user);
        if(this.$store.state.user.Userid == -1 ){
            this.$router.push('/');
            return;
        }
        this.$store.dispatch('getUserInfos');
    }
}
</script>