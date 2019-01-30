<template>
    <keep-alive>
        <app-welcome></app-welcome>
    </keep-alive>
</template>
<script>
import WelcomePage from './welcome/welcome.vue'

export default {
    name: 'app',
    components: {
      'app-welcome': WelcomePage
    }
    
}
</script>