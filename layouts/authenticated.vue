<template>
    <div class="flex flex-col min-h-screen">
        <div class="relative">
            <div class="w-full flex flex-col justify-start md:flex-row md:justify-end flex-1">
                <Nuxt />
            </div>
        </div>

        <custom-modal ref="testeref" name="teste" variant="centered">
            <div>
                <h1>teste</h1>
            </div>
        </custom-modal>
    </div>
</template>
  
<script>

export default {
    errorCaptured(err, vm, info) {
        console.error('Logged in Vue global error handler', err, vm, info)
        return false
    },
}
</script>