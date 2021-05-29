<template>
  <div class="signup">
    <fieldset>
      <legend>Créer un compte</legend>
      <form method="POST" @submit.prevent="sendForm()" id="formSignup" name="formSignup">
        <label for="username">
          <i class="fas fa-arrow-down"></i>
          Choisissez un pseudo
          <i class="fas fa-arrow-down"></i>
          <input v-model="username" type="text" name="username" id="username" placeholder="Limite de 3 à 30 caractères" required>
          <span class="errorUsername" aria-live="polite"></span>
        </label>
        

        <label for="email">
          <i class="fas fa-arrow-down"></i>
          Indiquez votre adresse mail 
          <i class="fas fa-arrow-down"></i>
          <input v-model="email" type="email" name="email" id="email" pattern=".+@groupomania.com" placeholder="Adresse mail @groupomania.com obligatoire" required>
          <span class="errorEmail" aria-live="polite"></span>
        </label>


        <label for="password">
          <i class="fas fa-arrow-down"></i>
          Choisissez votre mot de passe 
          <i class="fas fa-arrow-down"></i>
          <input v-model="password" type="password" name="password" id="password" autocomplete="off" placeholder="Doit contenir huit caractères au minimum, au moins une lettre et un chiffre" required>     
        </label>

        <button  type="submit">Valider votre inscription</button>
      </form>
    </fieldset>
  </div>
</template>

<script>

  export default {
    name:"Signup",
    data: () =>  {
      return {
        username: "",
        email: "",
        password:""
      }
    },
    methods: {
      sendForm() {
        const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (this.username && this.email && passwordReg.test(this.password)) {
          let data = {
            username : this.username,
            email : this.email,
            password : this.password
          };
          const urlSignup = "http://localhost:3000/reseau_social/signup";
          const myInit = {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(data),
          };
          fetch(urlSignup, myInit)
            .then((response) => response.json)
            .then((user) => {
              localStorage.removeItem('data');
              localStorage.setItem('userId', user.userId);
              window.location.href = "http://localhost:8081/#/login"
            })
        }
      },
    }
  }

</script>

<style>

  .signup h1 {
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
