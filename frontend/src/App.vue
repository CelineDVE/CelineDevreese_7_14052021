<template>
  <div id="app">
    <h1></h1>
    <router-view/> 
    <footer>
      <p> {{ copyright }} </p>
    </footer>  
  </div>
</template>

<script>

import { mapGetters, mapState } from "vuex"

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapGetters({
      copyright : "copyright"
    }),
    ...mapState({
      ourName : "Groupomania"
    })
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;800&display=swap');
  * {
    font-family: 'Poppins', sans-serif;
    margin:0;
    padding: 0;
    box-sizing: border-box;
  }
  #app {
    max-width: 100%;
  }
  body {
    background: url('./assets/logo.svg') no-repeat; 
    background-size: 300px;   
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding:32px;
  }
  fieldset {
    max-width: 100%;
    width: 540px;
    border-radius: 16px;
    padding:32px;
  }
  .card__title {
    text-align:center;
    font-weight: 800;
    padding: 0 2rem;
    font-size: 1.5rem;
  }
  .card__subtitle {
    text-align: center;
    color:#666;
    font-weight: 500;
  }
  .button {
    background: #000;
    color:white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }
  .card__action {
    color:#FD2D02;
    text-decoration: underline;
  }
  .card__action:hover {
    cursor:pointer;
  }
  .button:hover {
    cursor:pointer;
    background: #FD2D02;
  }
  .button--disabled {
    background:#cecece;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#cecece;
  }
  footer {
    margin: 3rem 0;
    text-align: right;
  }
</style>
