<template>
  <div id="MainMenu">
    <Sidebar />
    <Rooms />
  </div>
</template>

<script>
import Rooms from '@/components/Rooms.vue'
import Sidebar from '@/components/Sidebar.vue'
import '@/assets/styles.css'

export default {
  name: 'App',
  components: {
    Sidebar,
    Rooms,
  }
}
</script>

<style>
</style>