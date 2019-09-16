<template>
  <div class="home">
    <headerHome v-if="$route.meta.showHeader == true"/>
    <router-view></router-view>
    <footerHome v-if="$route.meta.showFooter == true"/>
  </div>
</template>

<script>
// @ is an alias to /src
import headerHome from '@/components/header/headerHome'
import footerHome from '@/components/footer/footerHome'

export default {
  name: 'home',
  components: {
    headerHome,
    footerHome,
  },
  data(){
      return{

      }
    },

}
</script>
<style>


</style>
