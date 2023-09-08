<template>
  <div class="h-full flex justify-center items-center">
    <h1 class="text-red-800">Sem autenticação</h1>
    <button @click="login">Logar</button>
  </div>
</template>

<script>
export default {
  layout: 'default',
  methods: {
    login() {
      this.$store.dispatch('setUser', { name: 'Matheus', role: 1 })

      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>