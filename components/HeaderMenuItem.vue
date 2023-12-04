<script setup lang="ts">
const props = defineProps(["title"]);
</script>

<template>
  <li
    class="nav-item"
    data-bs-toggle="collapse"
    data-bs-target="#navbarTogglerDemo03"
    aria-controls="navbarTogglerDemo03"
  >
    {{ title }}
  </li>
</template>

<style lang="sass">
.nav-item
  color: #173154
  cursor: pointer
  transition: transform 0.3s ease-in-outo
  text-decoration: none
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)
  width: 100%
  text-align: center
  padding-bottom: 0.5rem
  &:hover
    transform: scale(1.02)
    color: #ec952d
    border-bottom: 1px solid #ec952d
</style>
