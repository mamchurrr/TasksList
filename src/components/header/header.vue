<template>
  <header id="header">
    <div class="logo">
      <router-link to="/">{{ LOGO_TEXT }}</router-link>
    </div>    
  </header>
</template>

<script>
import { LOGO_TEXT } from '../../phrases/phrases.js';

export default {
  data() {
    return {
      LOGO_TEXT
    }
  },
}

</script>


<style scoped>
  #header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #521751;
    padding: 0 20px;
  }

  .logo {
    font-weight: bold;
    color: white;
  }

  .logo a {
    text-decoration: none;
    color: white;
  }
</style>