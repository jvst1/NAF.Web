<template>
  <div class="h-screen">
    <Navbar />

    <Nuxt />
  </div>
</template>

<script>
import Navbar from '@/components/Organisms/Navbar.vue'

export default {
  components: { Navbar }
}
</script>