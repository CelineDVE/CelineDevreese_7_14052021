<template>
  <div class="cardProfile">
    <button id="disconnect" @click="logout" class="button">
        Déconnexion
    </button>
    <fieldset>
        <legend>Votre profil</legend>
        <h1 class="card__title">{{ user.username }}</h1>
        <img :src="user.imageUrl" alt="photo de profil"> 

        <div>
            <button>Modifier le compte</button>
            <button>Supprimer le compte</button>
        </div>

        <p class="message"> {{ user.message }} </p>

        <p class="createdAt"> Compte créé le {{dateTime(user.createdAt)}} </p>          
    </fieldset>      

  </div>
</template>

<script>

import { mapState } from 'vuex'
import moment from 'moment'

export default {
    name: 'Profile',
    mounted: function(){
        console.log(this.$store.state.user);
        if(this.$store.state.user.Userid == -1 ){
            this.$router.push('/');
            return;
        }
        this.$store
            .dispatch('getUserInfos')
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
    },
    dateTime(value) {
        moment.locale('fr')
        return moment(value).format('LL');
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

    img {
        width: 300px;
    }

    fieldset {
        text-align: center;
    }

    legend {
        text-align: center;
        font-weight: bold;
        font-size: 1.3rem;
        padding: 0 3rem;
    }

    .createdAt {
        margin-top: 2rem;
        font-style: italic;
        font-size: .9rem;
        text-align: right;
    }

    button {
        background: #000;
        color:white;
        border-radius: 8px;
        font-size: .9rem;
        border: none;
        padding: .5rem;
        margin: .4rem;
        transition: .4s background-color;
    }

    button:hover {
        cursor:pointer;
        background: #FD2D02;
    }

    button--disabled {
        background:#cecece;
        color:#ececec
    }

    button--disabled:hover {
        cursor:not-allowed;
        background:#cecece;
    }

    .message {
        margin: 2rem;
        text-align: justify;
    }

</style>