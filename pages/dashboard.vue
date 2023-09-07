<template>
    <div class="h-full flex justify-center items-center">
        <h1 class="text-green-700">Autenticado</h1>
        <nuxt-link to="/">Deslogar</nuxt-link>
        <button @click="request">Request</button>
    </div>
</template>
  
<script>

export default {
    layout: 'authenticated',
    methods: {
        request() {
            this.$axios.get('/api/teste')
        }
    }
}
</script>