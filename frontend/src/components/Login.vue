<template>
  <div class="login">
    <div id="confirmSignup"></div>
    <fieldset>
      <legend>Connexion</legend>
      <form id="formSignup" name="formSignup">

        <label for="email">
          <i class="fas fa-arrow-down"></i>
          Indiquez votre adresse mail 
          <i class="fas fa-arrow-down"></i>
        </label>
        <input type="email" name="email" id="email" required>

        <label for="password">
          <i class="fas fa-arrow-down"></i>
          Indiquez votre mot de passe 
          <i class="fas fa-arrow-down"></i>  
        </label>
        <input type="password" name="password" id="password" autocomplete="off" >

        <button>Cliquer pour se connecter</button>
      </form>
    </fieldset>
  </div>
</template>

<script>
  
</script>