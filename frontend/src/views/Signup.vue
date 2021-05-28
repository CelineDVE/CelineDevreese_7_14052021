<template>
  <div class="signup">
    <fieldset>
      <legend>Créer un compte</legend>
      <form id="formSignup" name="formSignup">
        <label for="username">
          <i class="fas fa-arrow-down"></i>
          Choisissez un pseudo
          <i class="fas fa-arrow-down"></i> 
        </label>
        <input type="text" name="username" id="username" required>

        <label for="email">
          <i class="fas fa-arrow-down"></i>
          Indiquez votre adresse mail 
          <i class="fas fa-arrow-down"></i>
        </label>
        <input type="email" name="email" id="email" required>

        <label for="password">
          <i class="fas fa-arrow-down"></i>
          Choisissez votre mot de passe 
          <i class="fas fa-arrow-down"></i>  
        </label>
        <input type="password" name="password" id="password">

        <button>Valider votre inscription</button>
      </form>
    </fieldset>
  </div>
</template>

<script>


</script>

<style>

  .signup h1 {
    margin: 0 auto;
    width: 500px; 
  }

  fieldset {
    margin: 8rem 3rem;
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

  button {
    margin: 3rem;
    padding: 1.2rem;
    font-size: 1.1rem;
    font-weight: bold;
    border-radius: 2rem;
    background: #000;
    color: #FFF;
    border: none;
  }

</style>
