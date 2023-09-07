<template>
    <div>
        <Nuxt />
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