<template>
  <div class="login">
    <div id="confirmLogin"></div>
    <fieldset>
      <legend>Connexion</legend>
      <form @submit.prevent="sendLogin()">

        <label for="email">
          <i class="fas fa-arrow-down"></i>
          Indiquez votre adresse mail 
          <i class="fas fa-arrow-down"></i>
          <input type="email" name="email" id="email" value="@groupomania.com" required>          
        </label>


        <label for="password">
          <i class="fas fa-arrow-down"></i>
          Indiquez votre mot de passe 
          <i class="fas fa-arrow-down"></i>
          <input type="password" name="password" id="password" autocomplete="off" required>
        </label>

        <button type="submit">Cliquer pour se connecter</button>

      </form>
    </fieldset>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    name : "Login",
    data: () => {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      sendLogin() {
        let token = "";
        const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (this.email && passwordReg.test(this.password)) {
          axios
            .post(
              "http://localhost:3000/reseau_social/login",
              {
                email: this.email,
                password: this.password,
              },
              {
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer${token}`,
                },
              }
            )
            .then((response) => {
              console.log("Connexion réussi !");
              let reponse = response.data;
              let userObject = JSON.stringify(reponse);
              this.$localStorage.set("userId", userObject);
              let user = JSON.parse(this.$localStorage.get("userId"));
              token = user.token;
              window.location.href = "http://localhost:8081/#/thewall";
            })
            .catch((error) => console.log("Echec de la connexion", error));
        }
      },
    },
  }
  
</script>

<style>

  .login h1 {
    margin: 0 auto;
    width: 500px; 
  }

  fieldset {
    margin: 3rem;
    padding: 3rem;
  }

  legend {
    font-weight: bold;
    font-size: 1.6rem;
    padding: 0 3rem;
  }

  label {
    font-size: 1.1rem;
    font-weight: bold;
  }

  input {
    margin: 1rem;
    width: 100%;
    font-size: 1.1rem;
    text-align: center;
  }

  span {
    width: 100%;
    font-size: 80%;
    color: #FD2D02;
  }

  button {
    margin: 3rem;
    padding: 1.2rem;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 2rem;
    background: #000;
    color: #FFF;
    border: none;
    cursor: pointer;
  }

</style>