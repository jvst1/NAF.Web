<template>
    <nav class="w-full flex justify-between items-center px-8 py-8">
        <h1 class="text-3xl font-bold ml-10">NAF</h1>

        <ul class="w-2/4 flex justify-evenly">
            <li :class="{ 'underline': isActive('/') }">
                <nuxt-link to="/" class="text-lg">Página Inicial</nuxt-link>
            </li>
            <li :class="{ 'underline': isActive('/servicos') }">
                <nuxt-link to="/servicos" class="text-lg">Serviços</nuxt-link>
            </li>
            <li :class="{ 'underline': isActive('/perguntas-frequentes') }">
                <nuxt-link to="/perguntas-frequentes" class="text-lg">Perguntas Frequentes</nuxt-link>
            </li>
            <li :class="{ 'underline': isActive('/sobre') }">
                <nuxt-link to="/sobre" class="text-lg">Sobre</nuxt-link>
            </li>
            <nuxt-link to="/" class="text-lg">Entrar</nuxt-link>
        </ul>
    </nav>
</template>
  
<script>
export default {
    methods: {
        isActive(route) {
            return this.$route.path === route;
        }
    }
}
</script>