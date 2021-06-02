<template>

  <fieldset>
    <legend class="card__title" v-if="mode == 'login'">Connexion</legend>
    <legend class="card__title" v-else>Créer un compte</legend>      
    <div class="card">
        <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
        <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="email" pattern=".+@groupomania.com" placeholder="Adresse mail" required/>
    </div>
    <div class="form-row" v-if="mode == 'create'">
      <input v-model="username" class="form-row__input" type="text" placeholder="Pseudo" required/>
    </div>
    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe" autocomplete="off" required/>
    </div>
    <div class="form-row" v-if="mode == 'login' && status == 'error_connect'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div>
    <div class="form-row">
      <button @click="connect" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button @click="createAccount" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div>
      </div>
  </fieldset>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Login',
    data: function () {
        return {
        mode: 'login',
        email: '',
        username: '',
        password: '',
        }
    },
    computed: { 
        validatedFields: function() {
            if (this.mode == 'create') {
                if (this.email !== "" && this.username !== "" && this.password !== "") {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (this.email !== "" && this.password !== "") {
                    return true;
                } else {
                    return false; 
                }
            }
        },
        ...mapState(['status'])
    },
    methods: {
//Permet de switcher entre l'inscription et la connexion d'un membre
        switchToCreateAccount: function () {
            this.mode = 'create';
        },
        switchToLogin: function () {
            this.mode = 'login'
        },
//Connexion d'un membre
        connect: function () {
            const self = this;
            this.$store
                .dispatch('connect', {
                    email: this.email,
                    password: this.password
                })
                .then(function () {
                    self.$router.push('/profile')
                }, function (error) {
                    console.log(error);
                })             
        },
//Création d'un nouveau membre
        createAccount: function () {
            const self = this;
            this.$store
                .dispatch('createAccount', {
                    email: this.email,
                    username: this.username,
                    password: this.password
                })
                .then(function () {
                    self.connect();
                }, function (error) {
                    console.log(error);
                })
        },

    }      
}

</script>

<style scoped>

  .form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
  }
  .form-row__input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:#f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: black;
  }
  .form-row__input::placeholder {
    color:#aaaaaa;
  }

</style>