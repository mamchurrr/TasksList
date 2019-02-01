<template>
    <app-welcome/>
</template>

<script>
import WelcomePage from './welcome/welcome.vue'

export default {
    name: 'home',
    components: {
      'app-welcome': WelcomePage
    }
  }
</script>