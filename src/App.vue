<template>
  <div id="app" >
    <TheHead/>
    <div class="container mt-3">
        <router-view></router-view>
    </div>
   </div>
</template>

<script>
import TheHead from './components/TheHead.vue'
export default {
  name: 'App',
  components: {
    TheHead
  }
}
</script>

<style>

</style>
