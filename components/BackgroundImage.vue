<script setup lang="ts">
</script>


<template>
  <div>
    <div class="bg-container">
      <nuxt-img
        v-if="$isMobile()"
        src="https://imagens.grupointegrado.br/img/banners/1689879649000000.webp"
        alt="Imagem de grupo integrado"
        class="bg-mobile-img"
      />
      <nuxt-img
        v-else
        src="https://imagens.grupointegrado.br/img/banners/1689878759000000.webp"
        alt="Imagem de grupo integrado"
        class="bg-mobile-img"
      />
    </div>
  </div>
</template>


<style lang="sass">
.bg-container
    display: flex
    width: 100%
    height: 80vh

.bg-mobile-img
    display: flex
    width: 100%
    height: 100%
</style>
