<template>
  <div class="h-5/6 flex justify-evenly items-center">
    <img :src="logo_naf" alt="logo_naf">

    <div class="w-3/12">
      <h1 class="text-lg">
        O Núcleo de Apoio Contábil e Fiscal (NAF) é um projeto desenvolvido pela Receita Federal em parceria com
        instituições de ensino, com objetivo de oferecer serviços contábeis e fiscais gratuitos para cidadãos e pequenas
        empresas. Os serviços são de apoio e orientação, e não substituem um escritório de contabilidade.
      </h1>
      <h1 class="mt-4">
        <nuxt-link to="/sobre" class="text-blue-600 text-lg">Saiba mais sobre.</nuxt-link>
      </h1>
    </div>
  </div>
</template>

<script>
import logo_naf from '@/assets/images/logo_naf.png'

export default {
  layout: 'default',
  data () {
    return {
      logo_naf
    }
  }
}
</script>