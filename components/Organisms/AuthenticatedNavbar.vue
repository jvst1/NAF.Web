<template>
    <nav class="w-2/12 h-screen flex flex-col myDiv">
        <h1 class="text-3xl font-bold text-center py-8">NAF</h1>

        <ul class="h-3/4 flex flex-col">
            <li :class="{ 'bg-gray-200': isActive('/dashboard') }" class="py-3 px-5">
                <nuxt-link to="/dashboard" class="text-lg">Dashboard</nuxt-link>
            </li>
            <li class="py-3 px-5">
                <nuxt-link to="/dashboard" class="text-lg">Board</nuxt-link>
            </li>
            <li class="py-3 px-5">
                <nuxt-link to="/dashboard" class="text-lg">Cadastros</nuxt-link>
            </li>
        </ul>

        <h1 class="justify-self-end mx-5 text-lg">Sair</h1>
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

<style scoped>
.myDiv {
    box-shadow: 10px 0 10px -5px #bebebe;
}
</style>