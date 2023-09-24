<template>
    <div class="w-full flex">
        <div>
            <h1 class="text-green-700">Autenticado</h1>
            <nuxt-link to="/">Deslogar</nuxt-link>
            <button @click="request">Request</button>
        </div>
    </div>
</template>
  
<script>
export default {
    layout: 'authenticated',
    methods: {
        request() {
            this.$modal.show('teste')
        }
    }
}
</script>