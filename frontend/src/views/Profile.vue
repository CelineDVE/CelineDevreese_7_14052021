<template>

  <div class="cardProfile">
    <button id="disconnect" @click="logout" class="button">
        Déconnexion
    </button>      
    <h1 class="card__title">Mon profil</h1>
    <p>{{user.username}} {{user.email}}</p>
        <img :src="user.imageUrl"/>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Profile',
    mounted: function(){
        console.log(this.$store.state.user);
        if(this.$store.state.user.Userid == -1 ){
            this.$router.push('/');
            return;
        }
        this.$store.dispatch('getUserInfos');
    },
      computed: {
    ...mapState({
      user: 'userInfos',
    })
  },
   methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

#disconnect {
    position: fixed;
    top: 1rem;
    right: 1rem;
    width: 9rem;
}

.cardProfile {
    border: solid 2px #000;
    border-radius: 16px;
}

</style>